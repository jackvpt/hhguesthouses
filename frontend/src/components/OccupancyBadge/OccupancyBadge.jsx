import "./OccupancyBadge.scss"
import { useDispatch } from "react-redux"

const OccupancyBadge = ({ occupancy,guestHouse }) => {
  const dispatch = useDispatch()

  const handleClick = () => {
    if (!occupancy) return
    dispatch({
      type: "parameters/setRoomEdit",
      payload: guestHouse,
    })
    dispatch({
      type: "parameters/setSelectedOccupancy",
      payload: occupancy,
    })
  }

  return (
    <div
      className={`occupancy-badge ${occupancy ? "occupied" : ""}`}
      onClick={handleClick}
    >
      {occupancy?.occupantCode}
    </div>
  )
}

export default OccupancyBadge
