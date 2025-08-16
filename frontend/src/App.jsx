import Router from "./router/Router"
import { useQuery } from "@tanstack/react-query"
import { fetchAllGuestHouses } from "./api/guesthouses"
import { fetchAllOccupancies } from "./api/occupancies"
import { fetchAllUsers } from "./api/users"
import Loader from "./components/Loader/Loader"
import Error from "./components/Error/Error"
import { useDispatch, useSelector } from "react-redux"
import { clearUser } from "./features/userSlice"
import { useAuthToken } from "./hooks/useAuthToken"
import { fetchAllLogs } from "./api/logs"
import { useEffect } from "react"
import i18n from "./i18n"

function App() {
  const dispatch = useDispatch()

    const language = useSelector((state) => state.parameters.language);

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  const token = localStorage.getItem("token") || sessionStorage.getItem("token")
  if (!token) {
    dispatch(clearUser())
  }
  const { isAuthLoading } = useAuthToken()

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
      refetchInterval: 15000, // Refetch every 15 seconds
    }
  )

  const { isLoading: isLoadingUsers, error: errorUsers } = useQuery({
    queryKey: ["users"],
    queryFn: fetchAllUsers,
  })

  const { isLoading: isLoadingLogs, error: errorLogs } = useQuery({
    queryKey: ["logs"],
    queryFn: fetchAllLogs,
  })

  if (
    isAuthLoading ||
    isLoadingGuestHouses ||
    isLoadingOccupancies ||
    isLoadingUsers ||
    isLoadingLogs
  ) {
    return <Loader />
  }

  if (errorGuestHouses || errorOccupancies || errorUsers || errorLogs) {
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
