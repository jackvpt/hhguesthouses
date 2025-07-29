import "./Display.scss"
import GuestHouseCard from "../../components/GuestHouseCard/GuestHouseCard"
import WeekSelection from "../../components/WeekSelection/WeekSelection"
import { useGuestHouses } from "../../hooks/useGuestHouses"

const Display = () => {
  // const {
  //   data: guestHouses = [],
  //   isLoading,
  //   error,
  // } = useQuery({
  //   queryKey: ["guestHouses"],
  //   queryFn: fetchAllGuestHouses,
  // })
  const { data: guestHouses, isLoading, error } = useGuestHouses()

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

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
