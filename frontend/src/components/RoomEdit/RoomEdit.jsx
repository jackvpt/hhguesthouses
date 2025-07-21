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
import { fetchAllOccupancies, postOccupancy } from "../../api/occupancies"
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

  const selectedOccupancy = useSelector(
    (state) => state.parameters.selectedOccupancy
  )

  const [toastOpen, setToastOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState("")
  const [name, setName] = useState("")
  const [room, setRoom] = useState(guestHouse.rooms[0]?.name || "")
  const [arrivalDate, setArrivalDate] = useState("today")
  const [departureDate, setDepartureDate] = useState(addDays(new Date(), 2))

  useEffect(() => {
    setName(selectedOccupancy?.occupantCode || "")
    setRoom(selectedOccupancy?.room || "")
    setDepartureDate(
      selectedOccupancy ? new Date(selectedOccupancy.endDate) : null
    )
  }, [selectedOccupancy])

  /**
   * Check if the given date overlaps with an existing occupancy.
   * @param {Date} date - The date to check.
   * @returns {boolean} True if the date conflicts, false otherwise.
   */
  const isDateInOccupancies = (date) => {
    return occupancies.some((occ) => {
      const start = new Date(occ.startDate)
      const end = new Date(occ.endDate)
      return (
        date >= start &&
        date <= end &&
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
      arrivalDate === "today"
        ? new Date()
        : arrivalDate === "tomorrow"
        ? addDays(new Date(), 1)
        : arrivalDate
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
    if (selectedOccupancy) {
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
    if (selectedOccupancy) {
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
      setArrivalDate(newValue)
      if (selectedOccupancy) {
        dispatch({
          type: "parameters/setSelectedOccupancy",
          payload: {
            ...selectedOccupancy,
            startDate: newValue,
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
    if (selectedOccupancy) {
      dispatch({
        type: "parameters/setSelectedOccupancy",
        payload: {
          ...selectedOccupancy,
          endDate: newValue,
        },
      })
    }
  }

  /**
   * Reset and close the room edit form.
   */
  const handleCancelClick = () => {
    dispatch({
      type: "parameters/setRoomEdit",
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
  const convertArrivalDate = () => {
    if (selectedOccupancy) return new Date(selectedOccupancy.startDate)
    if (arrivalDate === "today") return new Date()
    if (arrivalDate === "tomorrow") return addDays(new Date(), 1)
  }

  /**
   * Trigger the add occupancy mutation.
   */
  const handleAddClick = () => {
    const occupancyData = {
      house: guestHouse.name,
      occupantCode: name,
      room,
      startDate: convertArrivalDate(),
      endDate: departureDate,
    }

    addMutation.mutate(occupancyData)
  }

  const handleModifyClick = () => {}

  const handleDeleteClick=()=>{}

  /**
   * Close the success toast notification.
   * @param {Event} event
   * @param {string} reason
   */
  const handleToastClose = (event, reason) => {
    if (reason === "clickaway") return
    setToastOpen(false)
  }

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

  if (isLoadingUsers || isLoadingOccupancies) return <div>Loading...</div>
  if (errorUsers || errorOccupancies)
    return <div>Error: {errorUsers?.message || errorOccupancies?.message}</div>

  return (
    <section className="room-edit is-open">
      <div className="room-edit__row">
        {/** OCCUPANT NAME */}
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="demo-select-small-label">Name</InputLabel>
          <Select
            className="room-edit__select"
            labelId="demo-select-small-label"
            id="demo-select-small"
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
            value={arrivalDate}
            exclusive
            onChange={handleArrivalDateChange}
            aria-label="arrival date"
            size="small"
          >
            <ToggleButton value="today" aria-label="today arrival">
              Today
            </ToggleButton>
            <ToggleButton value="tomorrow" aria-label="tomorrow arrival">
              Tomorrow
            </ToggleButton>
          </ToggleButtonGroup>
          <TextField
            id="outlined-basic"
            value={formatDateToDDMM(convertArrivalDate())}
            variant="outlined"
            size="small"
            slotProps={{
              readOnly: true,
            }}
            sx={{ width: 80 }}
          />
        </div>

        {/** ROOM NAME */}
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="demo-select-small-label">Room</InputLabel>
          <Select
            className="room-edit__select"
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
            sx={{ width: "auto", minWidth: 150, maxWidth: 180 }}
            slotProps={{
              textField: {
                size: "small",
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
              arrivalDate === "today"
                ? "today"
                : arrivalDate === "tomorrow"
                ? "tomorrow"
                : arrivalDate
            } to ${formatDateToDDMM(departureDate)}.`}
      </Alert>

      <div className="room-edit__buttons">
        <Button
          className="btn_cancel"
          sx={{ m: 1, minWidth: 120 }}
          variant="contained"
          onClick={handleCancelClick}
        >
          Cancel
        </Button>
        {selectedOccupancy && (
          <Button
            className="btn_modify"
            sx={{ m: 1, minWidth: 120 }}
            variant="contained"
            onClick={handleModifyClick}
          >
            Modify
          </Button>
        )}
        {selectedOccupancy && (
          <Button
            className="btn_delete"
            sx={{ m: 1, minWidth: 120 }}
            variant="contained"
            onClick={handleDeleteClick}
          >
            Delete
          </Button>
        )}
        {!selectedOccupancy && (
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
