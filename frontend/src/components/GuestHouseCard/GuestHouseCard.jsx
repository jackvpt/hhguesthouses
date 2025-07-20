import "./GuestHouseCard.scss"
import Calendar from "../Calendar/Calendar"
import RoomEdit from "../RoomEdit/RoomEdit"
import IconButton from "@mui/material/IconButton"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useDispatch, useSelector } from "react-redux"
import {
  faSquarePlus,
  faSquareCaretUp,
} from "@fortawesome/free-solid-svg-icons"

const GuestHouseCard = ({ guestHouse }) => {
  const dispatch = useDispatch()

  const roomEdit = useSelector((state) => state.parameters.roomEdit)
  const isEditMode = roomEdit && roomEdit === guestHouse

  const handleAddClick = () => {
    const payload = isEditMode ? null : guestHouse
    dispatch({
      type: "parameters/setRoomEdit",
      payload: payload,
    })
  }
  return (
    <section className="guest-house-card">
      <div className="guest-house-card__header">
        <h2>{guestHouse.name}</h2>

        <IconButton
          className="guest-house-card__header-icon"
          aria-label="add"
          onClick={handleAddClick}
        >
          {isEditMode ? (
            <FontAwesomeIcon icon={faSquareCaretUp} size="xl" />
          ) : (
            <FontAwesomeIcon icon={faSquarePlus} size="xl" />
          )}
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
