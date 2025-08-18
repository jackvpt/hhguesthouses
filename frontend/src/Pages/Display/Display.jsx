import "./Display.scss"
import GuestHouseCard from "../../components/GuestHouseCard/GuestHouseCard"
import WeekSelection from "../../components/WeekSelection/WeekSelection"
import { useGuestHouses } from "../../hooks/useGuestHouses"
import { useTranslation } from "react-i18next"

const Display = () => {
  const { data: guestHouses, isLoading, error } = useGuestHouses()
const {t} = useTranslation()
  if (isLoading) return <div>{t("actions.loading")}...</div>
  if (error) return <div>{t("actions.error")}: {error.message}</div>


  return (
    <div className="display">
      <WeekSelection />
      <div className="display__guestHouses">
        {guestHouses.map((guestHouse, index) => (
          <GuestHouseCard key={index} guestHouse={guestHouse} />
        ))}
      </div>
    </div>
  )
}

export default Display
