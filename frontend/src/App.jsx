import Router from "./router/Router"
import Loader from "./components/Loader/Loader"
import Error from "./components/Error/Error"
import { useDispatch, useSelector } from "react-redux"
import { clearUser } from "./features/userSlice"
import { useAuthToken } from "./hooks/useAuthToken"
import { useEffect } from "react"
import i18n from "./i18n"
import { useFetchGuestHouses } from "./hooks/useFetchGuestHouses"
import { useFetchOccupancies } from "./hooks/useFetchOccupancies"
import { useFetchUsers } from "./hooks/useFetchUsers"
import { useFetchLogs } from "./hooks/useFetchLogs"
import { setLanguage } from "./features/parametersSlice"

/**
 * Main application component.
 *
 * Handles:
 * - User authentication token validation
 * - Language selection via Redux
 * - Fetching all necessary data with React Query:
 *   - Guest houses
 *   - Occupancies
 *   - Users
 *   - Logs
 * - Displaying loading or error screens while fetching
 * - Rendering the main router once data is ready
 *
 * @component
 * @returns {JSX.Element} The rendered app component
 */
function App() {
  const dispatch = useDispatch()

  // Get the selected language from Redux parameters
  const userLanguage = useSelector(
    (state) => state.user.settings?.preferredLanguage
  )

  if (userLanguage) {
    dispatch(setLanguage(userLanguage))
  }

  const language = useSelector((state) => state.parameters.language)

  // Change i18n language whenever Redux language state changes
  useEffect(() => {
    i18n.changeLanguage(language)
  }, [language])

  // Retrieve token from localStorage or sessionStorage
  const token = localStorage.getItem("token") || sessionStorage.getItem("token")
  if (!token) {
    // Clear user state if no valid token found
    dispatch(clearUser())
  }

  // Custom hook to verify auth token validity
  const { isAuthLoading } = useAuthToken()

  // Fetch guest houses
  const { isLoading: isLoadingGuestHouses, error: errorGuestHouses } =
    useFetchGuestHouses()

  // Fetch occupancies and refresh every 15 seconds
  const { isLoading: isLoadingOccupancies, error: errorOccupancies } =
    useFetchOccupancies()

  // Fetch all users
  const { isLoading: isLoadingUsers, error: errorUsers } = useFetchUsers()

  // Fetch logs
  const { isLoading: isLoadingLogs, error: errorLogs } = useFetchLogs()

  // Show loader if any query or auth check is still loading
  if (
    isAuthLoading ||
    isLoadingGuestHouses ||
    isLoadingOccupancies ||
    isLoadingUsers ||
    isLoadingLogs
  ) {
    return <Loader />
  }

  // Show error page if any query failed
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

  // All data loaded successfully, render main router
  return <Router />
}

export default App
