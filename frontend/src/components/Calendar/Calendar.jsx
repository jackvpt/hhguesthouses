import { useSelector } from "react-redux"
import "./Calendar.scss"
import OccupancyBadge from "../OccupancyBadge/OccupancyBadge"
import { formatDateToDDMM } from "../../utils/dateTools"
import { useQuery } from "@tanstack/react-query"
import { fetchAllOccupancies } from "../../api/occupancies"
import { IconButton, Tooltip } from "@mui/material"
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

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
    const target = new Date(date)
    target.setHours(0, 0, 0, 0)

    const occupancy = occupancies.find((occ) => {
      const arrival = new Date(occ.arrivalDate)
      const departure = new Date(occ.departureDate)
      arrival.setHours(0, 0, 0, 0)
      departure.setHours(0, 0, 0, 0)

      return (
        occ.house === guestHouse &&
        occ.room === roomName &&
        target >= arrival &&
        target < departure
      )
    })

    return occupancy || null
  }

  return (
    <div className="calendar">
      <table>
        <thead>
          <tr>
            <th></th>
            {days.map((day, dayIndex) => {
              const date = addDays(firstDayOfWeek, dayIndex)
              const isToday = date.toDateString() === new Date().toDateString()
              return (
                <th
                  className={
                    isToday ? "calendar__days today" : "calendar__days"
                  }
                  key={day}
                >
                  <p className="calendar__days-name">{day}</p>
                  <p className="calendar__days-date">
                    {formatDateToDDMM(date)}
                  </p>
                </th>
              )
            })}
          </tr>
        </thead>

        <tbody>
          {rooms.map((room) => (
            <tr key={room.name}>
              <th>
                <div className="calendar__room">
                  <div className="calendar__room-name">{room.name}</div>
                  <div className="calendar__room-info">
                    <Tooltip
                      title={room.description}
                      componentsProps={{
                        tooltip: {
                          sx: { fontSize: "1rem" },
                        },
                      }}
                    >
                      <IconButton>
                        <FontAwesomeIcon
                          icon={faCircleInfo}
                          size="xs"
                          className="calendar__room-info-icon"
                        />
                      </IconButton>
                    </Tooltip>
                  </div>
                </div>
              </th>
              {days.map((day, dayIndex) => {
                const date = addDays(firstDayOfWeek, dayIndex)
                const isToday =
                  date.toDateString() === new Date().toDateString()
                const occupancy = checkOccupancy(
                  guestHouse.name,
                  room.name,
                  date
                )
                return (
                  <td key={dayIndex}>
                    <OccupancyBadge
                      guestHouse={guestHouse}
                      occupancy={occupancy}
                      isToday={isToday}
                    />
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Calendar
