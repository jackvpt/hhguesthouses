import "./RoomEdit.scss"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"
import { useState } from "react"
import {
  Alert,
  Button,
  Snackbar,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material"
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { addDays } from "../../utils/dateTools"
import { useDispatch } from "react-redux"
import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query"
import { postOccupancy } from "../../api/occupancies"

const RoomEdit = ({ guestHouse }) => {
  const queryClient = useQueryClient()
  const dispatch = useDispatch()

  const addMutation = useMutation({
    mutationFn: postOccupancy,
    onSuccess: () => {
      queryClient.invalidateQueries("occupancies")
      setToastMessage("Occupancy added successfully")
      setToastOpen(true)
      handleCancelClick()
    },
    onError: (error) => {
      console.error("Erreur lors de la soumission :", error)
    },
  })

  const [toastOpen, setToastOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState("")

  const [name, setName] = useState("")
  const [room, setRoom] = useState("")
  const [arrivalDate, setArrivalDate] = useState("today")
  const [departureDate, setDepartureDate] = useState(addDays(new Date(), 2))

  const handleNameChange = (event) => {
    setName(event.target.value)
  }

  const handleRoomChange = (event) => {
    setRoom(event.target.value)
  }

  const handleArrivalDateChange = (event, newValue) => {
    if (newValue !== null) {
      setArrivalDate(newValue)
    }
  }

  const handleDepartureDateChange = (newValue) => {
    setDepartureDate(newValue)
  }

  const handleCancelClick = () => {
    dispatch({
      type: "parameters/setRoomEdit",
      payload: null,
    })
  }

  const handleAddClick = () => {
    const arrivalDateValue =
      arrivalDate === "today"
        ? new Date()
        : arrivalDate === "tomorrow"
        ? addDays(new Date(), 1)
        : null
    const occupancyData = {
      house: guestHouse.name,
      occupantCode: name,
      room,
      startDate: arrivalDateValue,
      endDate: departureDate,
    }
    addMutation.mutate(occupancyData)
  }

  const handleToastClose = (event, reason) => {
    if (reason === "clickaway") return
    setToastOpen(false)
  }

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
            <MenuItem value={"FPO"}>FPO</MenuItem>
            <MenuItem value={"VPT"}>VPT</MenuItem>
            <MenuItem value={"JPG"}>JPG</MenuItem>
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
      <div className="room-edit__buttons">
        <Button
          className="btn_cancel"
          sx={{ m: 1, minWidth: 120 }}
          variant="contained"
          onClick={handleCancelClick}
        >
          Cancel
        </Button>
        <Button
          className="btn_add"
          sx={{ m: 1, minWidth: 120 }}
          variant="contained"
          onClick={handleAddClick}
        >
          Add
        </Button>
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
