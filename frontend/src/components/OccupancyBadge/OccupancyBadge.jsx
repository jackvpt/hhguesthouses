import "./OccupancyBadge.scss"
import { useDispatch } from "react-redux"

const OccupancyBadge = ({ occupancy, guestHouse,isToday }) => {
  const dispatch = useDispatch()

  const handleClick = () => {
    if (!occupancy) return
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
      className={`occupancy-badge ${occupancy ? "occupied" : ""} ${isToday ? "istoday":""}`}
      onClick={handleClick}
    >
      {occupancy?.occupantCode}
    </div>
  )
}

export default OccupancyBadge
