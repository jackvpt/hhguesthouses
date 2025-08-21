// 📁 CSS imports
import "./RoomEdit.scss"

// 📦 React imports
import { useEffect, useState } from "react"

// 🧩 MUI Core imports
import {
  Alert,
  Button,
  Snackbar,
  ToggleButton,
  ToggleButtonGroup,
  MenuItem,
  FormControl,
  Select,
  TextField,
  FormLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material"
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"

// 🧰 Local utilities
import { addDays, formatDateToDDMM } from "../../utils/dateTools"

// 🗃️ State & Data fetching
import { useDispatch, useSelector } from "react-redux"

// 🌐 React Query hooks
import { useFetchUsers } from "../../hooks/useFetchUsers.js"
import { useFetchOccupancies } from "../../hooks/useFetchOccupancies.js"
import { enGB } from "date-fns/locale"
import { useTranslation } from "react-i18next"
import { useAddOccupancy } from "../../hooks/useAddOccupancy.js"
import { useUpdateOccupancy } from "../../hooks/useUpdateOccupancy.js"
import { useDeleteOccupancy } from "../../hooks/useDeleteOccupancy.js"

/**
 * RoomEdit component.
 *
 * Displays a form to add, update, or delete room occupancy records for a guest house.
 * Handles user selection, room selection, arrival/departure dates, and validation
 * of room availability. Supports both admin and regular users with different UI modes.
 *
 * @component
 * @param {Object} props - Component props
 * @param {Object} props.guestHouse - Guest house data including rooms
 * @param {string} props.guestHouse.name - Guest house name
 * @param {Array<{name: string}>} props.guestHouse.rooms - Rooms available in the guest house
 * @returns {JSX.Element} The rendered RoomEdit form
 */
const RoomEdit = ({ guestHouse }) => {
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const user = useSelector((state) => state.user)
  const role = useSelector((state) => state.user.role)
  const isAdmin = role === "admin" || role === "super-admin"

  // React Query: Fetch occupancies
  const {
    data: occupancies,
    isLoading: isLoadingOccupancies,
    error: errorOccupancies,
  } = useFetchOccupancies()

  // React Query: Fetch users (enabled only for admins)
  const {
    data: users,
    isLoading: isLoadingUsers,
    error: errorUsers,
  } = useFetchUsers({
    enabled: user.role === "admin" || user.role === "superadmin",
  })

  /**
   * React Query: Add occupancy mutation
   */
  const addOccupancyMutation = useAddOccupancy({
    onSuccess: () => {
      setToastMessage(t("room-edit.occupancy-added"))
      setToastOpen(true)
      setTimeout(() => {
        handleCancelClick()
      }, 2000)
    },
    onError: (error) => {
      console.error("Error adding occupancy:", error)
    },
  })

  /**
   * React Query: Delete occupancy mutation
   */
  const deleteOccupancyMutation = useDeleteOccupancy({
    onSuccess: () => {
      setToastMessage(t("room-edit.occupancy-deleted"))
      setToastOpen(true)
      setTimeout(() => {
        handleCancelClick()
      }, 2000)
    },
    onError: (error) => {
      console.error("Error deleting occupancy:", error)
    },
  })

  /**
   * React Query: Update occupancy mutation
   */
  const updateOccupancyMutation = useUpdateOccupancy({
    onSuccess: () => {
      setToastMessage(t("room-edit.occupancy-updated"))
      setToastOpen(true)
      setTimeout(() => {
        handleCancelClick()
      }, 2000)
    },
    onError: (error) => {
      console.error("Error updating occupancy:", error)
    },
  })

  const houseEditMode = useSelector((state) => state.parameters.houseEditMode)
  const selectedOccupancy = useSelector(
    (state) => state.parameters.selectedOccupancy
  )

  // Local state
  const [toastOpen, setToastOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState("")
  const [codeName, setCodeName] = useState(user.codeName)
  const [room, setRoom] = useState(
    selectedOccupancy?.room || guestHouse.rooms[0]?.name || ""
  )
  const [toggleArrivalDate, setToggleArrivalDate] = useState("today")
  const [arrivalDate, setArrivalDate] = useState(new Date())
  const [departureDate, setDepartureDate] = useState(addDays(new Date(), 2))
  const [confirmOpen, setConfirmOpen] = useState(false)

  /**
   * Initialize form fields when selected occupancy or guest house changes.
   */
  useEffect(() => {
    setCodeName(selectedOccupancy?.occupantCode || user.codeName)
    setRoom(selectedOccupancy?.room || guestHouse.rooms[0]?.name || "")

    const date = selectedOccupancy?.arrivalDate
      ? new Date(selectedOccupancy.arrivalDate)
      : new Date()
    setArrivalDate(date)

    setDepartureDate(
      new Date(selectedOccupancy?.departureDate || addDays(new Date(), 2))
    )
  }, [selectedOccupancy, users, guestHouse.rooms, user.codeName])

  /**
   * Check if the selected room is available for the requested dates.
   * @returns {boolean} True if available, false if overlap found
   */
  const isRoomAvailable = () => {
    const normalizeDate = (d) => {
      const newDate = new Date(d)
      newDate.setHours(0, 0, 0, 0) // Normalize to midnight
      return newDate
    }

    const reqArrivalDate = normalizeDate(arrivalDate)
    const reqDepartureDate = normalizeDate(departureDate)

    const sameRoomOccupancies = occupancies.filter(
      (occ) => occ.house === guestHouse.name && occ.room === room
    )

    const overlap = sameRoomOccupancies.some((occ) => {
      if (occ.occupantCode === codeName) {
        return false
      }
      const occArrival = normalizeDate(occ.arrivalDate)
      const occDeparture = normalizeDate(occ.departureDate)

      return reqArrivalDate < occDeparture && reqDepartureDate > occArrival
    })

    return !overlap
  }

  /**
   * Handle occupant code name change.
   * @param {React.ChangeEvent<HTMLInputElement>} event
   */
  const handleNameChange = (event) => {
    setCodeName(event.target.value)
    if (houseEditMode === "modify") {
      dispatch({
        type: "parameters/setSelectedOccupancy",
        payload: {
          ...selectedOccupancy,
          occupantCode: event.target.value,
        },
      })
    }
  }

  /**
   * Handle room selection change.
   * @param {React.ChangeEvent<HTMLInputElement>} event
   */
  const handleRoomChange = (event) => {
    setRoom(event.target.value)
    if (houseEditMode === "modify") {
      dispatch({
        type: "parameters/setSelectedOccupancy",
        payload: {
          ...selectedOccupancy,
          room: event.target.value,
        },
      })
    }
  }

  /**
   * Handle arrival date change via date picker.
   * @param {Date | null} newValue
   */
  const handleArrivalSelectDateChange = (newValue) => {
    if (newValue === null) return
    setArrivalDate(newValue)
    if (houseEditMode === "modify") {
      dispatch({
        type: "parameters/setSelectedOccupancy",
        payload: {
          ...selectedOccupancy,
          arrivalDate: newValue,
        },
      })
    }
  }

  /**
   * Handle arrival date toggle (today / tomorrow).
   * @param {React.MouseEvent<HTMLElement>} event
   * @param {string} newValue
   */
  const handleToggleArrivalDate = (event, newValue) => {
    if (newValue !== null) {
      setToggleArrivalDate(newValue)
      const newArrivalDate = convertArrivalDate(newValue)
      setArrivalDate(newArrivalDate)
      if (houseEditMode === "modify") {
        dispatch({
          type: "parameters/setSelectedOccupancy",
          payload: {
            ...selectedOccupancy,
            arrivalDate: newArrivalDate,
          },
        })
      }
    }
  }

  /**
   * Handle departure date change.
   * @param {Date | null} newValue
   */
  const handleDepartureDateChange = (newValue) => {
    setDepartureDate(newValue)
    if (houseEditMode === "modify") {
      dispatch({
        type: "parameters/setSelectedOccupancy",
        payload: {
          ...selectedOccupancy,
          departureDate: newValue,
        },
      })
    }
  }

  /**
   * Reset and close the edit form.
   */
  const handleCancelClick = () => {
    dispatch({ type: "parameters/setEditMode", payload: null })
    dispatch({ type: "parameters/setHouseEditName", payload: null })
    dispatch({ type: "parameters/setSelectedOccupancy", payload: null })
  }

  /**
   * Convert string toggle values into Date objects.
   * @param {string} dateText - "today" or "tomorrow"
   * @returns {Date} Corresponding Date object
   */
  const convertArrivalDate = (dateText) => {
    if (dateText === "today") return new Date()
    if (dateText === "tomorrow") return addDays(new Date(), 1)
  }

  /**
   * Submit add occupancy mutation.
   */
  const handleAddClick = () => {
    const occupancyData = {
      house: guestHouse.name,
      occupantCode: codeName,
      room,
      arrivalDate,
      departureDate,
    }

    addOccupancyMutation.mutate(occupancyData)
  }

  /**
   * Submit update occupancy mutation.
   */
  const handleModifyClick = () => {
    updateOccupancyMutation.mutate({
      id: selectedOccupancy._id,
      updatedData: {
        house: guestHouse.name,
        occupantCode: codeName,
        room,
        arrivalDate,
        departureDate,
      },
    })
  }

  /**
   * Open delete confirmation dialog.
   */
  const handleDeleteClick = () => {
    setConfirmOpen(true)
  }

  /**
   * Close the toast notification.
   * @param {Event} event
   * @param {string} reason
   */
  const handleToastClose = (event, reason) => {
    if (reason === "clickaway") return
    setToastOpen(false)
  }

  /**
   * Confirm deletion and trigger mutation.
   */
  const handleConfirmDelete = () => {
    deleteOccupancyMutation.mutate(selectedOccupancy._id)
    setConfirmOpen(false)
  }

  if (isLoadingUsers || isLoadingOccupancies) return <div>Loading...</div>
  if (errorUsers || errorOccupancies)
    return <div>Error: {errorUsers?.message || errorOccupancies?.message}</div>

  return (
    <section className="room-edit">
      {/* Admin view (select user + date picker) */}
      {isAdmin && (
        <>
          {/* Occupant code name select */}
          <FormControl
            sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
          >
            <FormLabel className="form-label">{t("room-edit.guest")}</FormLabel>
            <Select
              className="room-edit__select"
              labelId="select-name"
              id="select-name"
              value={codeName}
              onChange={handleNameChange}
              size="small"
              fullWidth
            >
              {users.map((user) => (
                <MenuItem key={user.codeName} value={user.codeName}>
                  {user.codeName} - {user.firstName} {user.lastName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Arrival date (date picker) */}
          <FormControl
            sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
          >
            <FormLabel htmlFor="arrival-select-date" className="form-label">
              {t("room-edit.arrival")}
            </FormLabel>
            <LocalizationProvider
              dateAdapter={AdapterDateFns}
              adapterLocale={enGB}
            >
              <DatePicker
                className="room-edit__departure-date"
                value={arrivalDate}
                onChange={handleArrivalSelectDateChange}
                format="dd/MM/yyyy"
                size="small"
                slotProps={{
                  textField: {
                    size: "small",
                    className: "room-edit__departure-date-textfield",
                  },
                }}
              />
            </LocalizationProvider>
          </FormControl>
        </>
      )}

      {/* Regular user view (arrival date toggle) */}
      {!isAdmin && (
        <div className="room-edit__arrival-date">
          <FormControl
            sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
          >
            <FormLabel className="form-label">{t("room-edit.guest")}</FormLabel>
            <ToggleButtonGroup
              className="room-edit__arrival-date-toggle-group"
              value={toggleArrivalDate}
              exclusive
              onChange={handleToggleArrivalDate}
              aria-label="arrival date"
              size="small"
            >
              <ToggleButton
                value="today"
                aria-label="today arrival"
                size="small"
              >
                {t("dates.today")}
              </ToggleButton>
              <ToggleButton
                value="tomorrow"
                aria-label="tomorrow arrival"
                size="small"
              >
                {t("dates.tomorrow")}
              </ToggleButton>
            </ToggleButtonGroup>
            <TextField
              id="outlined-basic"
              value={formatDateToDDMM(arrivalDate)}
              variant="outlined"
              size="small"
              disabled
              slotProps={{
                readOnly: true,
                textAlign: "center",
                padding: 0,
              }}
              sx={{ width: 70, marginLeft: 2 }}
            />
          </FormControl>
        </div>
      )}

      {/* Departure date */}
      <FormControl
        sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <FormLabel htmlFor="departure-date" className="form-label">
          {t("room-edit.departure")}
        </FormLabel>
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enGB}>
          <DatePicker
            className="room-edit__departure-date"
            value={departureDate}
            onChange={handleDepartureDateChange}
            format="dd/MM/yyyy"
            minDate={addDays(arrivalDate, 1)}
            size="small"
            slotProps={{
              textField: {
                size: "small",
                className: "room-edit__departure-date-textfield",
              },
            }}
          />
        </LocalizationProvider>
      </FormControl>

      {/* Room select */}
      <FormControl
        className="room-edit__roomName"
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <FormLabel htmlFor="select-room" className="form-label">
          {t("room-edit.room")}
        </FormLabel>
        <Select
          labelId="select-room-label"
          id="select-room"
          value={room}
          onChange={handleRoomChange}
          size="small"
          sx={{ flexGrow: 1 }}
        >
          {guestHouse.rooms.map((room) => (
            <MenuItem key={room.name} value={room.name}>
              {room.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Availability alert */}
      <Alert
        severity={isRoomAvailable() ? "success" : "error"}
        sx={{
          p: 0.5,
          py: 0,
          fontSize: "1rem",
          alignItems: "center",
          lineHeight: 1,
        }}
      >
        {isRoomAvailable()
          ? `${t("room-edit.room")} ${room} ${t(
              "common-words.is-available"
            )} ${t("common-words.from")} ${formatDateToDDMM(arrivalDate)} ${t(
              "common-words.to"
            )} ${formatDateToDDMM(departureDate)}.`
          : t("room-edit.room-not-available")}
      </Alert>

      {/* Action buttons */}
      <div className="room-edit__buttons">
        <Button
          className="btn_cancel"
          sx={{ m: 1, minWidth: 120 }}
          variant="contained"
          onClick={handleCancelClick}
        >
          {t("actions.cancel")}
        </Button>
        {houseEditMode === "modify" && (
          <Button
            className="btn_modify"
            sx={{ m: 1, minWidth: 120 }}
            variant="contained"
            onClick={handleModifyClick}
          >
            {t("actions.modify")}
          </Button>
        )}
        {houseEditMode === "modify" && (
          <Button
            className="btn_delete"
            sx={{ m: 1, minWidth: 120 }}
            variant="contained"
            onClick={handleDeleteClick}
          >
            {t("actions.delete")}
          </Button>
        )}
        {houseEditMode === "add" && (
          <Button
            className="btn_add"
            sx={{ m: 1, minWidth: 120 }}
            variant="contained"
            disabled={!isRoomAvailable()}
            onClick={handleAddClick}
          >
            {t("actions.add")}
          </Button>
        )}
      </div>

      {/* Success toast */}
      <Snackbar
        open={toastOpen}
        autoHideDuration={3000}
        onClose={handleToastClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleToastClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          {toastMessage}
        </Alert>
      </Snackbar>

      {/* Delete confirmation dialog */}
      <Dialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        aria-labelledby="confirm-dialog-title"
      >
        <DialogTitle id="confirm-dialog-title">
          {t("delete-action.title")}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {t("delete-action.confirm-message")}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)} color="primary">
            {t("actions.cancel")}
          </Button>
          <Button
            onClick={handleConfirmDelete}
            color="error"
            variant="contained"
          >
            {t("actions.delete")}
          </Button>
        </DialogActions>
      </Dialog>
    </section>
  )
}

export default RoomEdit
