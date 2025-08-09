import "./WeekSelection.scss"
// 👉 FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faChevronRight,
  faChevronLeft,
  faCalendarDay,
} from "@fortawesome/free-solid-svg-icons"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { formatDateToDDMM } from "../../utils/dateTools"
import { IconButton } from "@mui/material"

const WeekSelection = () => {
  const dispatch = useDispatch()
  const weekNumber = useSelector((state) => state.parameters.weekNumber)
  const weekRange = useSelector((state) => state.parameters.weekRange)

  return (
    <div className="week-selection">
      <div className="week-selection__center">
        <IconButton
          className="week-selection__button"
          onClick={() => dispatch({ type: "parameters/previousWeek" })}
          aria-label="Previous"
        >
          <FontAwesomeIcon
            icon={faChevronLeft}
            size="lg"
            className="week-selection__button"
          />
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
          <FontAwesomeIcon
            icon={faChevronRight}
            size="lg"
            className="week-selection__button"
          />
        </IconButton>
      </div>
      <div className="week-selection__right">
        <IconButton
          aria-label="Today"
          onClick={() => dispatch({ type: "parameters/currentWeek" })}
        >
          <FontAwesomeIcon
            icon={faCalendarDay}
            size="lg"
            className="week-selection__today"
          />
        </IconButton>
      </div>
    </div>
  )
}

export default WeekSelection
