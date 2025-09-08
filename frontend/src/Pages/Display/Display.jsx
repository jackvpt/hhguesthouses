// 📁 CSS imports
import "./Display.scss"

// 🌍 Library imports
import { useTranslation } from "react-i18next"

// 👉 Internal components
import GuestHouseCard from "../../components/GuestHouseCard/GuestHouseCard"
import WeekSelection from "../../components/WeekSelection/WeekSelection"

// 🌐 React Query hooks
import { useFetchGuestHouses } from "../../hooks/useFetchGuestHouses"

/**
 * Display component showing guest houses and a week selection.
 *
 * Fetches guest houses via a custom React Query hook, displays loading and error states,
 * and renders each guest house as a GuestHouseCard.
 *
 * @component
 * @returns {JSX.Element} Rendered Display component
 */
const Display = () => {
  const { data: guestHouses, isLoading, error } = useFetchGuestHouses() // Fetch guest houses
  const { t } = useTranslation() // i18n translation function

  // Show loading message while fetching data
  if (isLoading) return <div>{t("actions.loading")}...</div>

  // Show error message if fetching fails
  if (error)
    return (
      <div>
        {t("actions.error")}: {error.message}
      </div>
    )

  return (
    <div className="display">
      {/* Week selection component */}
      <WeekSelection />

      {/* Render all guest houses */}
      <div className="display__guestHouses">
        {guestHouses.map((guestHouse, index) => (
          <GuestHouseCard key={index} guestHouse={guestHouse} />
        ))}
      </div>
    </div>
  )
}

export default Display
