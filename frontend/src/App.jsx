import Router from "./router/Router"
import { useQuery } from "@tanstack/react-query"
import { fetchAllGuestHouses } from "./api/guesthouses"
import { fetchAllOccupancies } from "./api/occupancies"
import { fetchAllUsers } from "./api/users"
import Loader from "./components/Loader/Loader"
import Error from "./components/Error/Error"

function App() {
  const { isLoading: isLoadingGuestHouses, error: errorGuestHouses } = useQuery(
    {
      queryKey: ["guestHouses"],
      queryFn: fetchAllGuestHouses,
    }
  )

  const { isLoading: isLoadingOccupancies, error: errorOccupancies } = useQuery(
    {
      queryKey: ["occupancies"],
      queryFn: fetchAllOccupancies,
    }
  )

  const { isLoading: isLoadingUsers, error: errorUsers } = useQuery({
    queryKey: ["users"],
    queryFn: fetchAllUsers,
  })

  if (isLoadingGuestHouses || isLoadingOccupancies || isLoadingUsers) {
    return <Loader />
  }

  if (errorGuestHouses || errorOccupancies || errorUsers) {
    return (
      <Error
        message={[
          "An error occurred while loading data.",
          "Please check your network connection.",
          "If the problem persists, contact support.",
          "We apologize for the inconvenience.",
        ]}
      />
    )
  }

  return <Router />
}

export default App
