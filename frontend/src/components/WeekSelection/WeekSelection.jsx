import "./WeekSelection.scss"
import previous from "../../assets/images/previous.png"
import next from "../../assets/images/next.png"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { formatDateToDDMM } from "../../utils/dateTools"

const WeekSelection = () => {
  const dispatch = useDispatch()
  const weekNumber = useSelector((state) => state.parameters.weekNumber)
  const weekRange = useSelector((state) => state.parameters.weekRange)

  return (
    <div className="week-selection">
      <img
        src={previous}
        className="week-selection__button"
        alt="previous"
        width={12}
        onClick={() => dispatch({ type: "parameters/previousWeek" })}
      />
      <div className="week-selection__date">
        <p className="week-selection__date-weekNumber">Week {weekNumber}</p>
        <p className="week-selection__date-range">
          {formatDateToDDMM(weekRange.monday)} -{" "}
          {formatDateToDDMM(weekRange.sunday)}
        </p>
      </div>
      <img
        src={next}
        className="week-selection__button"
        alt="next"
        width={12}
        onClick={() => dispatch({ type: "parameters/nextWeek" })}
      />
    </div>
  )
}

export default WeekSelection
