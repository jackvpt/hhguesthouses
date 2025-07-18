import Router from "./router/Router"
import { useQuery } from "@tanstack/react-query"
import { fetchAllGuestHouses } from "./api/guesthouses"
import { fetchAllOccupancies } from "./api/occupancies"

function App() {
  useQuery({
    queryKey: ["guestHouses"],
    queryFn: fetchAllGuestHouses,
  })

  useQuery({
    queryKey: ["occupancies"],
    queryFn: fetchAllOccupancies,
  })

  return (
    <>
      {/* Main router handling all application routes */}
      <Router />
    </>
  )
}

export default App
