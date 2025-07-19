import {  } from "@tanstack/react-query"
import "./OccupancyBadge.scss"

const OccupancyBadge = ({ occupancy }) => {


  return <div className={`occupancy-badge ${occupancy ? "occupied" : ""}`}>
  {occupancy}
</div>
}

export default OccupancyBadge
