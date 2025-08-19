import { useSelector } from "react-redux"
import "./Calendar.scss"
import OccupancyBadge from "../OccupancyBadge/OccupancyBadge"
import { formatDateToDDMM } from "../../utils/dateTools"
import { IconButton, Tooltip } from "@mui/material"
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useTranslation } from "react-i18next"
import { useFetchOccupancies } from "../../hooks/useFetchOccupancies"

/**
 * Adds a number of days to a given date.
 * @param {Date} date - The starting date.
 * @param {number} days - Number of days to add.
 * @returns {Date} New date after adding the days.
 */
const addDays = (date, days) => {
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}

/**
 * Calendar component displaying occupancy of rooms in a guest house.
 * @param {Object} props
 * @param {Object} props.guestHouse - Guest house object containing rooms and name.
 * @returns {JSX.Element} Rendered calendar table.
 */
const Calendar = ({ guestHouse }) => {
  // Fetch all occupancies using React Query
  const {
    data: occupancies = [],
    isLoading,
    error,
  } = useFetchOccupancies()

  const { t } = useTranslation()
  const lang = useSelector((state) => state.parameters.language)

  // Days abbreviations according to selected language
  const days = t("dates.days_abbreviated", { returnObjects: true })
  const rooms = guestHouse.rooms

  const firstDayOfWeek = new Date(
    useSelector((state) => state.parameters.weekRange.monday)
  )

  if (isLoading) return <div>{t("actions.loading")}</div>
  if (error)
    return (
      <div>
        {t("actions.error")} {error.message}
      </div>
    )

  /**
   * Checks if a room is occupied on a specific date.
   * @param {string} guestHouseName - Name of the guest house.
   * @param {string} roomName - Name of the room.
   * @param {Date} date - Date to check occupancy for.
   * @returns {Object|null} Occupancy object if found, otherwise null.
   */
  const checkOccupancy = (guestHouseName, roomName, date) => {
    const target = new Date(date)
    target.setHours(0, 0, 0, 0)

    const occupancy = occupancies.find((occ) => {
      const arrival = new Date(occ.arrivalDate)
      const departure = new Date(occ.departureDate)
      arrival.setHours(0, 0, 0, 0)
      departure.setHours(0, 0, 0, 0)

      return (
        occ.house === guestHouseName &&
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
          {rooms.map((room) => {
            // Get room description in the selected language
            const description =
              room.description.find((desc) => desc.language === lang)?.text ||
              ""
            return (
              <tr key={room.name}>
                <th>
                  <div className="calendar__room">
                    <div className="calendar__room-name">{room.name}</div>
                    <div className="calendar__room-info">
                      <Tooltip
                        title={description}
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
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Calendar
