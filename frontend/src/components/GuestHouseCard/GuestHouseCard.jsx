import "./GuestHouseCard.scss"
import addIcon from "../../assets/images/add.png"
import Calendar from "../Calendar/Calendar"
import RoomEdit from "../RoomEdit/RoomEdit"
import { useDispatch, useSelector } from "react-redux"

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
        <img
          src={addIcon}
          alt="Add"
          className="guest-house-card__header-icon"
          width={24}
          onClick={handleAddClick}
        />
      </div>

      <div className={`guest-house-card__edit ${isEditMode ? "is-open" : ""}`}>
        <RoomEdit />
      </div>

      <div className="guest-house-card__calendar">
        <Calendar guestHouse={guestHouse} />
      </div>
    </section>
  )
}

export default GuestHouseCard
