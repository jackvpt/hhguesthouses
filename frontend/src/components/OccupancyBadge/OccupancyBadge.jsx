// 📁 CSS imports
import "./OccupancyBadge.scss"

// 🧩 MUI Core imports
import { Tooltip } from "@mui/material"

// 🗃️ State & Data fetching
import { useDispatch, useSelector } from "react-redux"

// 🌐 React Query hooks
import { useFetchUsers } from "../../hooks/useFetchUsers"
import { equalDates } from "../../utils/dateTools"

/**
 * OccupancyBadge component displays occupancy status for a guest house.
 * Shows occupant code, morning/day/night segments, and tooltip with occupant name.
 * Allows editing if the current user owns the occupancy or has admin privileges.
 *
 * @component
 * @param {Object} props - Component props
 * @param {Object} props.occupancy - Occupancy object containing occupantCode
 * @param {Object} props.guestHouse - Guest house object with name
 * @param {boolean} props.isToday - Whether the badge represents today's occupancy
 * @returns {JSX.Element|null} Rendered badge or null if users are loading or an error occurs
 */
const OccupancyBadge = ({ occupancies, guestHouse, date }) => {
  const dispatch = useDispatch()

  // 👉 React Query: Fetch all users
  const { data: users, isLoadingUsers, errorUsers } = useFetchUsers()

  // 👉 Current user from Redux store
  const user = useSelector((state) => state.user)

  // 👉 Determine if the badge represents today's occupancy
  const isToday = date.toDateString() === new Date().toDateString()

  // 👉 Determine if the badge is editable
  const isAdmin = user.role === "admin" || user.role === "super-admin"

  // 👉 Find occupant's full name
  const occupantName = (codeName) => {
    const user = users.find((u) => u.codeName === codeName)
    return user ? `${user.firstName} ${user.lastName}` : null
  }

  // 👉 Check if the occupancy belongs to the current user
  const isOwnOccupancy = (occupancyCodeName) => {
    return user.codeName === occupancyCodeName
  }

  /**
   * Handle click on the badge.
   * Only allows edit mode if the user has permissions.
   */
  const handleClick = (occupancy) => {
    if (!isAdmin && !isOwnOccupancy(occupancy.occupantCode)) return

    dispatch({
      type: "parameters/setHouseEditMode",
      payload: "modify",
    })
    dispatch({
      type: "parameters/setHouseEditName",
      payload: guestHouse.name,
    })
    dispatch({
      type: "parameters/setSelectedOccupancy",
      payload: occupancy,
    })
  }

  // 👉 Return nothing if users are loading or there is an error
  if (isLoadingUsers || errorUsers) {
    return null
  }

  /**
   * Renders the occupancy badge(s) based on the provided occupancies.
   * @param {Array} occupancies - Array of occupancy objects
   * @returns {JSX.Element} Rendered badge(s)
   */
  const Badge = (occupancies) => {
    if (occupancies.length === 0) {
      return BadgeStandard(null, null)
    }

    if (occupancies.length === 1) {
      const occupancy = occupancies[0]

      if (equalDates(date, new Date(occupancy?.departureDate))) {
        return BadgeLastDay(occupancy)
      }

      if (equalDates(date, new Date(occupancy?.arrivalDate))) {
        return BadgeFirstDay(occupancy)
      }
      return BadgeStandard(occupancy)
    }

    if (occupancies.length === 2) {
      return BadgeMix(occupancies)
    }
  }

  /**
   * Renders the standard occupancy badge.
   * @param {Object} occupancy - Occupancy object
   * @returns {JSX.Element} Rendered badge
   */
  const BadgeStandard = (occupancy) => {
    if (!occupancy) {
      return (
        <div
          className={`occupancy-badge__standard ${isToday ? "istoday" : ""}`}
        ></div>
      )
    }

    const codeName = occupancy?.occupantCode || ""

    return (
      <Tooltip
        title={occupantName(codeName)}
        slotProps={{
          tooltip: {
            sx: { fontSize: "1rem" },
          },
        }}
        className="occupancy-badge__standard"
      >
        <div
          className={`occupancy-badge__standard ${
            codeName.toLowerCase() || ""
          } ${isAdmin || isOwnOccupancy(codeName) ? "clickable" : ""} ${
            isOwnOccupancy(codeName) ? "own-occupancy" : ""
          }  occupied ${isToday ? "istoday" : ""}`}
          onClick={() => handleClick(occupancy)}
        >
          <div>{codeName}</div>
        </div>
      </Tooltip>
    )
  }

  /**
   * Renders the first day occupancy badge.
   * @param {Object} occupancy - Occupancy object
   * @returns {JSX.Element} Rendered badge
   */
  const BadgeFirstDay = (occupancy) => {
    const codeName = occupancy?.occupantCode || ""
    return (
      <div className={`occupancy-badge__firstDay ${isToday ? "istoday" : ""}`}>
        <div className="occupancy-badge__firstDay-badge">
          <Tooltip
            title={occupantName(codeName)}
            slotProps={{
              tooltip: {
                sx: { fontSize: "1rem" },
              },
            }}
            className=""
          >
            <div
              className={`occupancy-badge__standard ${
                codeName.toLowerCase() || ""
              } ${isAdmin || isOwnOccupancy(codeName) ? "clickable" : ""} ${
                isOwnOccupancy(codeName) ? "own-occupancy" : ""
              } occupied `}
              onClick={() => handleClick(occupancy)}
            >
              <div>{codeName}</div>
            </div>
          </Tooltip>
        </div>
      </div>
    )
  }

  /**
   * Renders the last day occupancy badge.
   * @param {Object} occupancy - Occupancy object
   * @returns {JSX.Element} Rendered badge
   */
  const BadgeLastDay = (occupancy) => {
    const codeName = occupancy?.occupantCode || ""
    return (
      <div className={`occupancy-badge__lastDay ${isToday ? "istoday" : ""}`}>
        <div className="occupancy-badge__lastDay-badge">
          <Tooltip
            title={occupantName(codeName)}
            slotProps={{
              tooltip: {
                sx: { fontSize: "1rem" },
              },
            }}
          >
            <div
              className={`occupancy-badge__lastDay ${
                codeName.toLowerCase() || ""
              } ${isAdmin || isOwnOccupancy(codeName) ? "clickable" : ""} ${
                isOwnOccupancy(codeName) ? "own-occupancy" : ""
              } occupied `}
              onClick={() => handleClick(occupancy)}
            ></div>
          </Tooltip>
        </div>
      </div>
    )
  }

  /**
   * Renders the mixed occupancy badge.
   * @param {Array} occupancies - Array of occupancy objects
   * @returns {JSX.Element} Rendered badge
   */
  const BadgeMix = (occupancies) => {
    const firstOccupancy = occupancies[0]
    const firstCodeName = firstOccupancy?.occupantCode || ""
    const secondOccupancy = occupancies[1]
    const secondCodeName = secondOccupancy?.occupantCode || ""

    return (
      <div className={`occupancy-badge__mix ${isToday ? "istoday" : ""}`}>
        {/** Badge for the last day */}
        <div className="occupancy-badge__mix-badgeLastDay">
          <Tooltip
            title={occupantName(firstCodeName)}
            slotProps={{
              tooltip: {
                sx: { fontSize: "1rem" },
              },
            }}
          >
            <div
              className={`occupancy-badge__mix ${
                firstOccupancy.occupantCode.toLowerCase() || ""
              } ${
                isAdmin || isOwnOccupancy(firstCodeName) ? "clickable" : ""
              } ${
                isOwnOccupancy(firstCodeName) ? "own-occupancy" : ""
              } occupied `}
              onClick={() => handleClick(firstOccupancy)}
            ></div>
          </Tooltip>
        </div>

        {/** Badge for the first day */}
        <div className="occupancy-badge__mix-badgeFirstDay">
          <Tooltip
            title={occupantName(secondCodeName)}
            slotProps={{
              tooltip: {
                sx: { fontSize: "1rem" },
              },
            }}
          >
            <div
              className={`occupancy-badge__mix-badgeFirstDay-text ${
                secondOccupancy.occupantCode.toLowerCase() || ""
              } ${
                isAdmin || isOwnOccupancy(secondCodeName) ? "clickable" : ""
              } ${
                isOwnOccupancy(secondCodeName) ? "own-occupancy" : ""
              } occupied `}
              onClick={() => handleClick(secondOccupancy)}
            >
              {secondCodeName}
            </div>
          </Tooltip>
        </div>
      </div>
    )
  }

  return Badge(occupancies)
}

export default OccupancyBadge
