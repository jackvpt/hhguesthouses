// 👉 MUI Core
import IconButton from "@mui/material/IconButton"

// 👉 FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faSquarePlus,
  faSquareCaretUp,
} from "@fortawesome/free-solid-svg-icons"

// 👉 Redux hooks
import { useDispatch, useSelector } from "react-redux"

// 👉 Internal components
import RoomEdit from "../RoomEdit/RoomEdit"
import Calendar from "../Calendar/Calendar"

// 👉 Styles
import "./GuestHouseCard.scss"

/**
 * GuestHouseCard component.
 * Displays a guest house with its name, a toggle button to open the RoomEdit form,
 * and a calendar showing current occupancies.
 *
 * @param {Object} props
 * @param {Object} props.guestHouse - The guest house details including name and rooms.
 * @returns {JSX.Element}
 */
const GuestHouseCard = ({ guestHouse }) => {
  const dispatch = useDispatch()
  const roomEdit = useSelector((state) => state.parameters.roomEdit)
  const isEditMode = roomEdit === guestHouse

  const handleToggleEdit = () => {
    dispatch({
      type: "parameters/setRoomEdit",
      payload: isEditMode ? null : guestHouse,
    })
    dispatch({
      type: "parameters/setSelectedOccupancy",
      payload: isEditMode && null,
    })
  }

  return (
    <section className="guest-house-card">
      <div className="guest-house-card__header">
        <h2>{guestHouse.name}</h2>
        <IconButton
          className="guest-house-card__header-icon"
          aria-label={isEditMode ? "close edit" : "open edit"}
          onClick={handleToggleEdit}
        >
          <FontAwesomeIcon
            icon={isEditMode ? faSquareCaretUp : faSquarePlus}
            size="xl"
          />
        </IconButton>
      </div>

      <div className={`guest-house-card__edit ${isEditMode ? "is-open" : ""}`}>
        <RoomEdit guestHouse={guestHouse} />
      </div>

      <div className="guest-house-card__calendar">
        <Calendar guestHouse={guestHouse} />
      </div>
    </section>
  )
}

export default GuestHouseCard
