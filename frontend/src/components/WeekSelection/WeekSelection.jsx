// WeekSelection.jsx
import "./WeekSelection.scss"

// 👉 FontAwesome icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faChevronRight,
  faChevronLeft,
  faCalendarDay,
} from "@fortawesome/free-solid-svg-icons"

// 👉 Redux
import { useDispatch, useSelector } from "react-redux"

// 👉 Utilities
import { formatDateToDDMM } from "../../utils/dateTools"
import { capitalize} from "../../utils/stringTools"

// 👉 Material UI
import { IconButton } from "@mui/material"

// 👉 Internationalization
import { useTranslation } from "react-i18next"

/**
 * WeekSelection component
 *
 * Displays the current week number, date range, and allows navigation:
 * - Previous week
 * - Next week
 * - Current week (Today)
 *
 * Uses Redux for state management and MUI IconButton for interactions.
 *
 * @component
 * @example
 * return <WeekSelection />
 */
const WeekSelection = () => {
  const { t } = useTranslation() // i18n translation hook
  const dispatch = useDispatch() // Redux dispatch function

  // Get current week number and range from Redux store
  const weekNumber = useSelector((state) => state.parameters.weekNumber)
  const weekRange = useSelector((state) => state.parameters.weekRange)

  return (
    <div className="week-selection">
      <div className="week-selection__center">
        {/* Button to go to the previous week */}
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

        {/* Display current week number and date range */}
        <div className="week-selection__date">
          <p className="week-selection__date-weekNumber">
            {capitalize(t("dates.week"))} {weekNumber}
          </p>
          <p className="week-selection__date-range">
            {formatDateToDDMM(weekRange.monday)} - {formatDateToDDMM(weekRange.sunday)}
          </p>
        </div>

        {/* Button to go to the next week */}
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

      {/* Button to go to the current week */}
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
