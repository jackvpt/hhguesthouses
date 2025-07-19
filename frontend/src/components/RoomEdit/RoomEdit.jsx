import "./RoomEdit.scss"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"
import { useState } from "react"
import { Button, ToggleButton, ToggleButtonGroup } from "@mui/material"
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { addDays } from "../../utils/dateTools"

const RoomEdit = () => {
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
            <MenuItem value={"A"}>A</MenuItem>
            <MenuItem value={"B"}>B</MenuItem>
            <MenuItem value={"C"}>C</MenuItem>
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
        <Button className="btn_cancel" sx={{ m: 1, minWidth: 120 }} variant="contained">Cancel</Button>
        <Button className="btn_add" sx={{ m: 1, minWidth: 120 }} variant="contained">Add</Button>
      </div>
    </section>
  )
}

export default RoomEdit
