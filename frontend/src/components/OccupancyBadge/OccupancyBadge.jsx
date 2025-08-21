// 👉 Material UI Tooltip component
import { Tooltip } from "@mui/material"

// 👉 Component-specific styles
import "./OccupancyBadge.scss"

// 👉 Redux hooks for state management
import { useDispatch, useSelector } from "react-redux"

// 👉 Custom hook to fetch users data
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
  const occupancy = occupancies ? occupancies[0] : null

  const isToday = date.toDateString() === new Date().toDateString()

  // 👉 React Query: Fetch all users
  const { data: users, isLoadingUsers, errorUsers } = useFetchUsers()

  // 👉 Current user from Redux store
  const user = useSelector((state) => state.user)

  // 👉 Check if the occupancy belongs to the current user
  const ownOccupancy = user.codeName === occupancy?.occupantCode

  // 👉 Determine if the badge is editable
  const isAdmin = user.role === "admin" || user.role === "super-admin"
  const isEditable = isAdmin || ownOccupancy

  /**
   * Handle click on the badge.
   * Only allows edit mode if the user has permissions.
   */
  const handleClick = () => {
    if (!isEditable) return

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

  // 👉 Find occupant's full name
  const occupantName = users.find(
    (user) => user.codeName === occupancy?.occupantCode
  )

  const Badge = (occupancies) => {
    if (occupancies.length === 0) {
      return BadgeStandard(null, null)
    }

    if (occupancies.length === 1) {
      const occupancy = occupancies[0]
      const codeName = occupancy?.occupantCode || ""
      if (equalDates(date, new Date(occupancy?.departureDate))) {
        return BadgeLastDay(occupancy, codeName)
      }

      if (equalDates(date, new Date(occupancy?.arrivalDate))) {
        return BadgeFirstDay(occupancy, codeName)
      }
      return BadgeStandard(occupancy, codeName)
    }

    if (occupancies.length === 2) {
      return (
        <div className="">
          {/* {BadgeLastDay(occupancies[0], occupancies[0].occupantCode)} */}
          {BadgeFirstDay(occupancies[1], occupancies[1].occupantCode)}
        </div>
      )
    }
  }

  const BadgeStandard = (occupancy, codeName) => {
    if (!occupancy) {
      return (
        <div
          className={`occupancy-badge__standard ${isToday ? "istoday" : ""}`}
        ></div>
      )
    }

    return (
      <Tooltip
        title={`${occupantName?.firstName} ${occupantName?.lastName}`}
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
          } ${isEditable && occupancy ? "clickable" : ""} ${
            ownOccupancy ? "own-occupancy" : ""
          }  occupied ${isToday ? "istoday" : ""}`}
          onClick={handleClick}
        >
          <div>{codeName}</div>
        </div>
      </Tooltip>
    )
  }

  const BadgeFirstDay = (occupancy, codeName) => {
    return (
      <div className={`occupancy-badge__firstDay ${isToday ? "istoday" : ""}`}>
        <div className="occupancy-badge__firstDay-badge">
          <Tooltip
            title={`${occupantName?.firstName} ${occupantName?.lastName}`}
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
              } ${isEditable && occupancy ? "clickable" : ""} ${
                ownOccupancy ? "own-occupancy" : ""
              } occupied `}
              onClick={handleClick}
            >
              <div>{codeName}</div>
            </div>
          </Tooltip>
        </div>
      </div>
    )
  }

  const BadgeLastDay = (occupancy, codeName) => {
    return (
      <div className={`occupancy-badge__lastDay ${isToday ? "istoday" : ""}`}>
        <div className="occupancy-badge__lastDay-badge">
          <Tooltip
            title={`${occupantName?.firstName} ${occupantName?.lastName}`}
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
              } ${isEditable && occupancy ? "clickable" : ""} ${
                ownOccupancy ? "own-occupancy" : ""
              } occupied `}
              onClick={handleClick}
            ></div>
          </Tooltip>
        </div>
      </div>
    )
  }

  return Badge(occupancies)
}

export default OccupancyBadge
