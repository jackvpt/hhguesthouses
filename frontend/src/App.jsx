import Router from "./router/Router"
import { useQuery } from "@tanstack/react-query"
import { fetchAllGuestHouses } from "./api/guesthouses"
import { fetchAllOccupancies } from "./api/occupancies"
import { fetchAllUsers } from "./api/users"

function App() {
  // ✅ Charge tes données
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
    select: (data) => [...data].sort((a, b) => a.code.localeCompare(b.code)),
  })

  return <Router />
}

export default App
