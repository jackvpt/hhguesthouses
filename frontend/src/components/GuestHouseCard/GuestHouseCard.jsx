import "./GuestHouseCard.scss"
import addIcon from "../../assets/images/add.png"
import Calendar from "../Calendar/Calendar"

const GuestHouseCard = ({ guestHouse }) => {
  return (
    <section className="guest-house-card">
      <div className="guest-house-card__header">
        <h2>{guestHouse.name}</h2>
        <img
          src={addIcon}
          alt="Add"
          className="guest-house-card__header-icon"
          width={24}
        />
      </div>
      <div className="guest-house-card__calendar">
        <Calendar guestHouse={guestHouse} />
      </div>
    </section>
  )
}

export default GuestHouseCard
