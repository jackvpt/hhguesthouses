import { Tooltip } from "@mui/material"
import "./OccupancyBadge.scss"
import { useDispatch, useSelector } from "react-redux"
import { useUsers } from "../../hooks/useUsers"

const OccupancyBadge = ({ occupancy, guestHouse, isToday }) => {
  const dispatch = useDispatch()

  // React Query: Fetch users
  const { data: users, isLoadingUsers, errorUsers } = useUsers()

  const user = useSelector((state) => state.user)

  const ownOccupancy = user.codeName === occupancy?.occupantCode

  const isEditable =
    ownOccupancy || user.role === "admin" || user.role === "super-admin"

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

  if (isLoadingUsers) {
    return null
  }

  if (errorUsers) {
    return null
  }

  const occupantName = users.find(
    (user) => user.codeName === occupancy?.occupantCode
  )

  return (
    <Tooltip
      disableHoverListener={!occupancy}
      title={
        occupancy ? `${occupantName?.firstName} ${occupantName?.lastName}` : ""
      }
      componentsProps={{
        tooltip: {
          sx: { fontSize: "1rem" },
        },
      }}
      className="occupancy-badge"
    >
      <div
        className={`occupancy-badge ${
          isEditable && occupancy ? "clickable" : ""
        } ${ownOccupancy ? "own-occupancy" : ""} ${
          occupancy ? "occupied" : ""
        } ${isToday ? "istoday" : ""}`}
        onClick={handleClick}
      >
        {occupancy?.occupantCode}
      </div>
    </Tooltip>
  )
}

export default OccupancyBadge
