import "./WeekSelection.scss"
// 👉 FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { formatDateToDDMM } from "../../utils/dateTools"
import { IconButton } from "@mui/material"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"

const WeekSelection = () => {
  const dispatch = useDispatch()
  const weekNumber = useSelector((state) => state.parameters.weekNumber)
  const weekRange = useSelector((state) => state.parameters.weekRange)

  return (
    <div className="week-selection">
      <IconButton
        className="week-selection__button"
        onClick={() => dispatch({ type: "parameters/previousWeek" })}
        aria-label="Previous"
      >
        <FontAwesomeIcon icon={faChevronLeft} size="lg" className="week-selection__button" />
      </IconButton>
      <div className="week-selection__date">
        <p className="week-selection__date-weekNumber">Week {weekNumber}</p>
        <p className="week-selection__date-range">
          {formatDateToDDMM(weekRange.monday)} -{" "}
          {formatDateToDDMM(weekRange.sunday)}
        </p>
      </div>

      <IconButton
        onClick={() => dispatch({ type: "parameters/nextWeek" })}
        aria-label="Next"
      >
        <FontAwesomeIcon icon={faChevronRight} size="lg" className="week-selection__button" />
      </IconButton>
    </div>
  )
}

export default WeekSelection
