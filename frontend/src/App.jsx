import Router from "./router/Router"
import { useQuery } from "@tanstack/react-query"
import { fetchAllGuestHouses } from "./api/guesthouses"
import { fetchAllOccupancies } from "./api/occupancies"
import { fetchAllUsers } from "./api/users"

function App() {
  useQuery({
    queryKey: ["guestHouses"],
    queryFn: fetchAllGuestHouses,
  })

  useQuery({
    queryKey: ["occupancies"],
    queryFn: fetchAllOccupancies,
  })

  useQuery({
    queryKey: ["users"],
    queryFn: fetchAllUsers,
  })

  return (
    <>
      {/* Main router handling all application routes */}
      <Router />
    </>
  )
}

export default App
