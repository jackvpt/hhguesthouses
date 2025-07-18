import "./WeekSelection.scss"
import previous from "../../assets/images/previous.png"
import next from "../../assets/images/next.png"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { getWeekRangeFromWeekNumber } from "../../utils/dateTools"

const WeekSelection = () => {
  const dispatch = useDispatch()
  const weekNumber = useSelector((state) => state.settings.weekNumber)

  const weekRange = getWeekRangeFromWeekNumber(weekNumber, new Date().getFullYear())

  return (
    <div className="week-selection">
      <img
        src={previous}
        className="week-selection__button"
        alt="previous"
        width={15}
        onClick={() => dispatch({ type: "settings/setWeekNumber", payload: weekNumber - 1 })}
      />
      <div className="week-selection__date">
        <p className="week-selection__date-weekNumber">Week {weekNumber}</p>
        <p className="week-selection__date-range">
          {weekRange.monday.toLocaleDateString("fr-FR", {
            day: "2-digit",
            month: "2-digit",
          })}{" "}
          -{" "}
          {weekRange.sunday.toLocaleDateString("fr-FR", {
            day: "2-digit",
            month: "2-digit",
          })}
        </p>
      </div>
      <img
        src={next}
        className="week-selection__button"
        alt="next"
        width={15}
        onClick={() => dispatch({ type: "settings/setWeekNumber", payload: weekNumber + 1 })}
      />
    </div>
  )
}

export default WeekSelection
