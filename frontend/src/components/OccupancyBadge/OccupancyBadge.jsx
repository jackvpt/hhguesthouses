import "./OccupancyBadge.scss"
import { useDispatch, useSelector } from "react-redux"

const OccupancyBadge = ({ occupancy, guestHouse,isToday }) => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)  
  const isEditable = user.codeName === occupancy?.occupantCode || user.role === "admin" || user.role === "super-admin"

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

  return (
    <div
      className={`occupancy-badge ${isEditable && occupancy ? "clickable" : ""} ${occupancy ? "occupied" : ""} ${isToday ? "istoday" : ""}`}
      onClick={handleClick}
    >
      {occupancy?.occupantCode}
    </div>
  )
}

export default OccupancyBadge
