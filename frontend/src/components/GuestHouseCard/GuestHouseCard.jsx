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
  const houseEditName = useSelector((state) => state.parameters.houseEditName)
  const isEditMode = houseEditName === guestHouse.name

  const role = useSelector((state) => state.user.role)
  const editAllowed =
    role === "guest" || role === "admin" || role === "super-admin"

  const handleToggleEdit = () => {
    dispatch({
      type: "parameters/setHouseEditMode",
      payload: isEditMode ? null : "add",
    })
    dispatch({
      type: "parameters/setHouseEditName",
      payload: isEditMode ? null : guestHouse.name,
    })
    dispatch({
      type: "parameters/setSelectedOccupancy",
      payload: null,
    })
  }

  return (
    <section className="guest-house-card">
      <div className="guest-house-card__header">
        <h2>{guestHouse.name}</h2>

        {editAllowed && (
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
        )}
      </div>

      {isEditMode && (
        <div className="guest-house-card__edit is-open">
          <RoomEdit guestHouse={guestHouse} />
        </div>
      )}

      <div className="guest-house-card__calendar">
        <Calendar guestHouse={guestHouse} />
      </div>
    </section>
  )
}

export default GuestHouseCard
