import "./Calendar.scss"

const Calendar = ({ guestHouse }) => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  const rooms = guestHouse.rooms
  
  return (
    <div className="calendar">
      <div className="calendar__rooms">
        {rooms.map((room) => (
          <div key={room.id} className="calendar__rooms__room">
            <p className="calendar__room-name">{room.name}</p>
          </div>
        ))}
      </div>
      {days.map((day) => (
        <div key={day} className="calendar__days">
          <p className="calendar__days__day">{day}</p>
          <p className="calendar__days__date">21/07</p>
        </div>
      ))}
    </div>
  )
}

export default Calendar
