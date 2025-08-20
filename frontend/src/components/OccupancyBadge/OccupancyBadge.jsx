// 👉 Material UI Tooltip component
import { Tooltip } from "@mui/material"

// 👉 Component-specific styles
import "./OccupancyBadge.scss"

// 👉 Redux hooks for state management
import { useDispatch, useSelector } from "react-redux"

// 👉 Custom hook to fetch users data
import { useFetchUsers } from "../../hooks/useFetchUsers"
import { numberOfDaysBetweenTwoDates } from "../../utils/dateTools"

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
const OccupancyBadge = ({ occupancy, guestHouse, date }) => {
  const dispatch = useDispatch()

  const isSunday = date.getDay() === 0
  const isToday = date.toDateString() === new Date().toDateString()
  const isOccupancyFirstDay =
    date.toDateString() === new Date(occupancy?.arrivalDate).toDateString()
  const occupancyDuration = numberOfDaysBetweenTwoDates(
    occupancy?.arrivalDate,
    occupancy?.departureDate
  )

  // 👉 React Query: Fetch all users
  const { data: users, isLoadingUsers, errorUsers } = useFetchUsers()

  // 👉 Current user from Redux store
  const user = useSelector((state) => state.user)

  // 👉 Check if the occupancy belongs to the current user
  const ownOccupancy = user.codeName === occupancy?.occupantCode

  // 👉 Determine if the badge is editable
  const isEditable =
    ownOccupancy || user.role === "admin" || user.role === "super-admin"

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

  const BadgeStandard = ({ occupancy }) => {
    return (
      <>
        <div className="occupancy-badge__morning"></div>
        <div className="occupancy-badge__day">{occupancy?.occupantCode}</div>
        <div className="occupancy-badge__night"></div>
      </>
    )
  }

  return (
    <Tooltip
      disableHoverListener={!occupancy}
      title={
        occupancy ? `${occupantName?.firstName} ${occupantName?.lastName}` : ""
      }
      slotProps={{
        tooltip: {
          sx: { fontSize: "1rem" },
        },
      }}
      className="occupancy-badge"
    >
      <div
        className={`occupancy-badge ${
          occupancy?.occupantCode?.toLowerCase() || ""
        } ${isEditable && occupancy ? "clickable" : ""} ${
          ownOccupancy ? "own-occupancy" : ""
        } ${occupancy ? "occupied" : ""} ${isToday ? "istoday" : ""}`}
        onClick={handleClick}
      >
        {BadgeStandard({ occupancy })}
      </div>
    </Tooltip>
  )
}

export default OccupancyBadge
