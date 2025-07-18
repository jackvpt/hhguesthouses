import { useQuery } from "@tanstack/react-query"
import "./Display.scss"
import { fetchAllGuestHouses } from "../../api/guesthouses"
import GuestHouseCard from "../../components/GuestHouseCard/GuestHouseCard"
import WeekSelection from "../../components/WeekSelection/WeekSelection"

const Display = () => {
  const {
    data: guestHouses = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["guestHouses"],
    queryFn: fetchAllGuestHouses,
  })

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <div className="display">
      <WeekSelection />

      {guestHouses.map((guestHouse) => (
        <GuestHouseCard key={guestHouse.id} guestHouse={guestHouse} />
      ))}
    </div>
  )
}

export default Display
