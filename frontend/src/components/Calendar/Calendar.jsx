// 📁 CSS imports
import "./Calendar.scss"

// 🌍 Library imports
import { useTranslation } from "react-i18next"

// 🗃️ State & Data fetching
import { useSelector } from "react-redux"

// 👉 Internal components
import OccupancyBadge from "../OccupancyBadge/OccupancyBadge"

// 🧩 MUI Core imports
import { IconButton, Tooltip } from "@mui/material"

// 🧩 FontAwesome imports
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

// 🌐 React Query hooks
import { useFetchOccupancies } from "../../hooks/useFetchOccupancies"

// 🧰 Local utilities
import { addDays, formatDateToDDMM } from "../../utils/dateTools"

/**
 * Calendar component displaying occupancy of rooms in a guest house.
 * @param {Object} props
 * @param {Object} props.guestHouse - Guest house object containing rooms and name.
 * @returns {JSX.Element} Rendered calendar table.
 */
const Calendar = ({ guestHouse }) => {
  // Fetch all occupancies using React Query
  const { data: occupancies = [], isLoading, error } = useFetchOccupancies()

  // Translation module
  const { t } = useTranslation()

  // Application language from Redux store
  const lang = useSelector((state) => state.parameters.language)

  // Days abbreviations according to selected language
  const days = t("dates.days_abbreviated", { returnObjects: true })
  const rooms = guestHouse.rooms

  const firstDayOfWeek = new Date(
    useSelector((state) => state.parameters.weekRange.monday)
  )

  /** Loading and error states */
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
  const findOccupancies = (guestHouseName, roomName, date) => {
    const target = new Date(date)
    target.setHours(0, 0, 0, 0)

    const occupancy = occupancies.filter((occ) => {
      const arrival = new Date(occ.arrivalDate)
      const departure = new Date(occ.departureDate)
      arrival.setHours(0, 0, 0, 0)
      departure.setHours(0, 0, 0, 0)

      return (
        occ.house === guestHouseName &&
        occ.room === roomName &&
        target >= arrival &&
        target <= departure
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
            {/* Render day headers */}

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
                  {/* Day name */}
                  <p className="calendar__days-name">{day}</p>
                  {/* Formatted date */}
                  <p className="calendar__days-date">
                    {formatDateToDDMM(date)}
                  </p>
                </th>
              )
            })}
          </tr>
        </thead>

        <tbody>
          {/* Render each room row */}

          {rooms.map((room) => {
            // Get room description in the selected language
            const description =
              room.description.find((desc) => desc.language === lang)?.text ||
              ""
            return (
              <tr key={room.name}>
                {/* Room name and info tooltip */}
                <th>
                  <div className="calendar__room">
                    <div className="calendar__room-name">{room.name}</div>
                    <div className="calendar__room-info">
                      <Tooltip
                        title={description}
                        slotProps={{
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

                {/* Render occupancy badges for each day */}
                {days.map((day, dayIndex) => {
                  const date = addDays(firstDayOfWeek, dayIndex)

                  // Find occupancy records for the current room and date
                  const occupancies = findOccupancies(
                    guestHouse.name,
                    room.name,
                    date
                  )
                  return (
                    <td key={dayIndex}>
                      <OccupancyBadge
                        guestHouse={guestHouse}
                        occupancies={occupancies}
                        date={date}
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
