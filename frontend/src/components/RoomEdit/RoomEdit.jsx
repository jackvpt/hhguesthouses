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
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  TextField,
} from "@mui/material"
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"

// 🧰 Local tools
import { addDays, formatDateToDDMM } from "../../utils/dateTools"

// 🗃️ React-Redux & React-Query
import { useDispatch, useSelector } from "react-redux"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

// 🌐 API calls
import {
  deleteOccupancy,
  fetchAllOccupancies,
  postOccupancy,
  updateOccupancy,
} from "../../api/occupancies"
import { fetchAllUsers } from "../../api/users"

/**
 * Component for editing room occupancy details.
 * Displays a form to add or edit occupancy details for a room in a guest house.
 *
 * @component
 * @param {Object} props
 * @param {Object} props.guestHouse - The guest house data containing rooms.
 * @param {string} props.guestHouse.name - Name of the guest house.
 * @param {Array<{name: string}>} props.guestHouse.rooms - List of rooms in the guest house.
 * @returns {JSX.Element}
 */
const RoomEdit = ({ guestHouse }) => {
  const queryClient = useQueryClient()
  const dispatch = useDispatch()

  // React Query: Fetch occupancies
  const {
    data: occupancies = [],
    isLoadingOccupancies,
    errorOccupancies,
  } = useQuery({
    queryKey: ["occupancies"],
    queryFn: fetchAllOccupancies,
  })

  // React Query: Fetch users
  const {
    data: users = [],
    isLoadingUsers,
    errorUsers,
  } = useQuery({
    queryKey: ["users"],
    queryFn: fetchAllUsers,
  })

  /**
   * Mutation to add a new occupancy.
   */
  const addMutation = useMutation({
    mutationFn: postOccupancy,
    onSuccess: () => {
      queryClient.invalidateQueries("occupancies")
      setToastMessage("Occupancy added successfully")
      setToastOpen(true)
      handleCancelClick()
    },
    onError: (error) => {
      console.error("Error while submitting occupancy:", error)
    },
  })

  /**
   * Mutation to delete an existing occupancy.
   */
  const deleteMutation = useMutation({
    mutationFn: deleteOccupancy,
    onSuccess: () => {
      queryClient.invalidateQueries("occupancies")
      setToastMessage("Occupancy deleted successfully")
      setToastOpen(true)
      handleCancelClick()
    },
    onError: (error) => {
      console.error("Error deleting occupancy:", error)
    },
  })

  /**
   * Mutation to update an existing occupancy.
   */
  const updateMutation = useMutation({
    mutationFn: updateOccupancy,
    onSuccess: () => {
      queryClient.invalidateQueries("occupancies")
      setToastMessage("Occupancy updated successfully")
      setToastOpen(true)
      handleCancelClick()
    },
    onError: (error) => {
      console.error("Error updating occupancy:", error)
    },
  })

  const houseEditMode = useSelector((state) => state.parameters.houseEditMode)
  const selectedOccupancy = useSelector(
    (state) => state.parameters.selectedOccupancy
  )

  const [toastOpen, setToastOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState("")
  const [name, setName] = useState(users[0].code || "")
  const [room, setRoom] = useState(
    selectedOccupancy?.room || guestHouse.rooms[0]?.name || ""
  )
  const [arrivalToggle, setArrivalToggle] = useState("today")
  const [arrivalDate, setArrivalDate] = useState(new Date())
  const [departureDate, setDepartureDate] = useState(addDays(new Date(), 2))

  /**
   * Initialize form fields based on selected occupancy or default values.
   */
  useEffect(() => {
    setName(selectedOccupancy?.occupantCode || users[0]?.code || "")
    setRoom(selectedOccupancy?.room || guestHouse.rooms[0]?.name || "")
    setArrivalDate(selectedOccupancy?.arrivalDate || new Date())
    setDepartureDate(
      new Date(selectedOccupancy?.departureDate || addDays(new Date(), 2))
    )
  }, [selectedOccupancy, users, guestHouse.rooms])

  /**
   * Check if the given date overlaps with an existing occupancy.
   * @param {Date} date - The date to check.
   * @returns {boolean} True if the date conflicts, false otherwise.
   */
  const isDateInOccupancies = (date) => {
    return occupancies.some((occ) => {
      const arrival = new Date(occ.arrivalDate)
      const departure = new Date(occ.departureDate)
      return (
        date >= arrival &&
        date <= departure &&
        occ.house === guestHouse.name &&
        occ.room === room
      )
    })
  }

  /**
   * Check if form data contains any errors.
   * @returns {boolean} True if there are errors, false otherwise.
   */
  const dataHasErrors = () => {
    if (!name || !room) return true

    const arrivalConflict = isDateInOccupancies(
      arrivalToggle === "today"
        ? new Date()
        : arrivalToggle === "tomorrow"
        ? addDays(new Date(), 1)
        : arrivalToggle
    )
    const departureConflict = isDateInOccupancies(departureDate)

    return arrivalConflict || departureConflict
  }

  /**
   * Handle occupant name change.
   * @param {React.ChangeEvent<HTMLInputElement>} event
   */
  const handleNameChange = (event) => {
    setName(event.target.value)
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
   * Handle arrival date selection (Today/Tomorrow).
   * @param {React.MouseEvent<HTMLElement>} event
   * @param {string} newValue
   */
  const handleArrivalDateChange = (event, newValue) => {
    if (newValue !== null) {
      setArrivalToggle(newValue)
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
   * Reset and close the room edit form.
   */
  const handleCancelClick = () => {
    dispatch({
      type: "parameters/setEditMode",
      payload: null,
    })
    dispatch({
      type: "parameters/setHouseEditName",
      payload: null,
    })
    dispatch({
      type: "parameters/setSelectedOccupancy",
      payload: null,
    })
  }

  /**
   * Convert the arrival date to a Date object.
   */
  const convertArrivalDate = (dateText) => {
    if (dateText === "today") return new Date()
    if (dateText === "tomorrow") return addDays(new Date(), 1)
  }

  /**
   * Trigger the add occupancy mutation.
   */
  const handleAddClick = () => {
    const occupancyData = {
      house: guestHouse.name,
      occupantCode: name,
      room,
      arrivalDate: arrivalDate,
      departureDate,
    }

    addMutation.mutate(occupancyData)
  }

  const handleModifyClick = () => {
    updateMutation.mutate({
      id: selectedOccupancy._id,
      updatedData: {
        house: guestHouse.name,
        occupantCode: name,
        room,
        arrivalDate: arrivalDate,
        departureDate,
      },
    })
  }

  const handleDeleteClick = () => {
    deleteMutation.mutate(selectedOccupancy._id)
  }

  /**
   * Close the success toast notification.
   * @param {Event} event
   * @param {string} reason
   */
  const handleToastClose = (event, reason) => {
    if (reason === "clickaway") return
    setToastOpen(false)
  }

  if (isLoadingUsers || isLoadingOccupancies) return <div>Loading...</div>
  if (errorUsers || errorOccupancies)
    return <div>Error: {errorUsers?.message || errorOccupancies?.message}</div>

  return (
    <section className="room-edit is-open">
      <div className="room-edit__row">
        {/** OCCUPANT NAME */}
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small" className="room-edit__occupantName">
          <InputLabel id="select-name">Name</InputLabel>
          <Select
            className="room-edit__select"
            labelId="select-name"
            id="select-name"
            value={name}
            label="Name"
            onChange={handleNameChange}
          >
            {users.map((user) => (
              <MenuItem key={user.code} value={user.code}>
                {user.code}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/** ARRIVAL DATE */}
        <div className="room-edit__arrival-date">
          <div className="room-edit__arrival-date-label">Arrival</div>
          <ToggleButtonGroup
            className="room-edit__arrival-date-toggle-group"
            value={arrivalToggle}
            exclusive
            onChange={handleArrivalDateChange}
            aria-label="arrival date"
            size="small"
          >
            <ToggleButton
              value="today"
              aria-label="today arrival"
              size="small"
              sx={{
                py: 0,
                fontSize: "0.75rem",
              }}
            >
              Today
            </ToggleButton>
            <ToggleButton
              value="tomorrow"
              aria-label="tomorrow arrival"
              size="small"
              sx={{
                py: 0,
                fontSize: "0.75rem",
              }}
            >
              Tomorrow
            </ToggleButton>
          </ToggleButtonGroup>
          <TextField
            id="outlined-basic"
            value={formatDateToDDMM(arrivalDate)}
            variant="outlined"
            size="small"
            disabled
            inputProps={{ style: { textAlign: "center" } }}
            slotProps={{
              readOnly: true,
            }}
            sx={{ width: 70 }}
          />
        </div>
      </div>

      <div className="room-edit__row">
        {/** ROOM NAME */}
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small" className="room-edit__roomName">
          <InputLabel id="demo-select-small-label">Room</InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={room}
            label="Room"
            onChange={handleRoomChange}
          >
            {guestHouse.rooms.map((room) => (
              <MenuItem key={room.name} value={room.name}>
                {room.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/** DEPARTURE DATE */}
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            className="room-edit__departure-date"
            label="Departure date"
            value={departureDate}
            onChange={handleDepartureDateChange}
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
      </div>
      <Alert
        severity={dataHasErrors() ? "error" : "success"}
        sx={{
          p: 0.5,
          py: 0,
          fontSize: "0.75rem",
          alignItems: "center",
          lineHeight: 1,
        }}
      >
        {dataHasErrors()
          ? "Room not available at these dates."
          : `Room ${room} is available from ${
              arrivalToggle === "today"
                ? "today"
                : arrivalToggle === "tomorrow"
                ? "tomorrow"
                : arrivalToggle
            } to ${formatDateToDDMM(departureDate)}.`}
      </Alert>

      {/** BUTTONS */}
      <div className="room-edit__buttons">
        <Button
          className="btn_cancel"
          sx={{ m: 1, minWidth: 120 }}
          variant="contained"
          onClick={handleCancelClick}
        >
          Cancel
        </Button>
        {houseEditMode === "modify" && (
          <Button
            className="btn_modify"
            sx={{ m: 1, minWidth: 120 }}
            variant="contained"
            onClick={handleModifyClick}
          >
            Modify
          </Button>
        )}
        {houseEditMode === "modify" && (
          <Button
            className="btn_delete"
            sx={{ m: 1, minWidth: 120 }}
            variant="contained"
            onClick={handleDeleteClick}
          >
            Delete
          </Button>
        )}
        {houseEditMode === "add" && (
          <Button
            className="btn_add"
            sx={{ m: 1, minWidth: 120 }}
            variant="contained"
            disabled={dataHasErrors()}
            onClick={handleAddClick}
          >
            Add
          </Button>
        )}
      </div>
      {/* Toast notification for success messages */}
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
    </section>
  )
}

export default RoomEdit
