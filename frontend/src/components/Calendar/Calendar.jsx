import { useSelector } from "react-redux"
import "./Calendar.scss"
import OccupancyBadge from "../OccupancyBadge/OccupancyBadge"
import { formatDateToDDMM } from "../../utils/dateTools"
import { useQuery } from "@tanstack/react-query"
import { fetchAllOccupancies } from "../../api/occupancies"

const addDays = (date, days) => {
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}

const Calendar = ({ guestHouse }) => {
  const {
    data: occupancies = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["occupancies"],
    queryFn: fetchAllOccupancies,
  })

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  const rooms = guestHouse.rooms

  const firstDayOfWeek = new Date(
    useSelector((state) => state.parameters.weekRange.monday)
  )
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  const checkOccupancy = (guestHouse, roomName, date) => {
    const dateSearched = new Date(date)
    const occupancy = occupancies.find(
      (occ) =>
        occ.house === guestHouse &&
        occ.room === roomName &&
        dateSearched >= new Date(occ.startDate) &&
        dateSearched <= new Date(occ.endDate)
    )
    return occupancy || null
  }

  return (
    <div className="calendar">
      <div className="calendar__rooms">
        {rooms.map((room) => (
          <div key={room.name} title={room.description} className="calendar__rooms__room">
            <p className="calendar__room-name">{room.name}</p>
          </div>
        ))}
      </div>

      {days.map((day, dayIndex) => {
        const date = addDays(firstDayOfWeek, dayIndex)

        return (
          <div key={dayIndex} className="calendar__days">
            <p className="calendar__days__day">{day}</p>
            <p className="calendar__days__date">{formatDateToDDMM(date)}</p>
            <div className="calendar__days__occupancy">
              {rooms.map((room) => (
                <OccupancyBadge
                  key={room.name}
                  occupancy={checkOccupancy(
                    guestHouse.name,
                    room.name,
                    date
                  )}
                />
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Calendar
