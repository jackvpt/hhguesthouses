import "./OccupancyBadge.scss"
import { useDispatch } from "react-redux"

const OccupancyBadge = ({ occupancy }) => {
  const dispatch = useDispatch()
  const handleClick = () => {
    dispatch({
      type: "parameters/setRoomEdit",
      payload: occupancy.house,
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
