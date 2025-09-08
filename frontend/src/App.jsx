// 🌍 Library imports
import i18n from "./i18n"

// 👉 Internal components
import Router from "./router/Router"
import Loader from "./components/Loader/Loader"
import Error from "./components/Error/Error"

// 📦 React imports
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"

// 🗃️ State & Data fetching
import { clearUser } from "./features/userSlice"
import { setLanguage } from "./features/parametersSlice"

// 🌐 React Query hooks
import { useAuthToken } from "./hooks/useAuthToken"
import { useFetchGuestHouses } from "./hooks/useFetchGuestHouses"
import { useFetchOccupancies } from "./hooks/useFetchOccupancies"
import { useFetchUsers } from "./hooks/useFetchUsers"
import { useFetchLogs } from "./hooks/useFetchLogs"


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

  const userLanguage = useSelector(
    (state) => state.user.settings?.preferredLanguage
  )

  const language = useSelector((state) => state.parameters.language)

  // Update Redux language when user language changes
  useEffect(() => {
    if (userLanguage) {
      dispatch(setLanguage(userLanguage))
    }
  }, [userLanguage, dispatch])

  // Update i18n language when language in Redux changes
  useEffect(() => {
    i18n.changeLanguage(language)
  }, [language])

  // Check token validity on app load
  const token = localStorage.getItem("token") || sessionStorage.getItem("token")

  useEffect(() => {
    if (!token) {
      dispatch(clearUser())
    }
  }, [token, dispatch])

  const { isAuthLoading } = useAuthToken()
  const { isLoading: isLoadingGuestHouses, error: errorGuestHouses } =
    useFetchGuestHouses()
  const { isLoading: isLoadingOccupancies, error: errorOccupancies } =
    useFetchOccupancies()
  const { isLoading: isLoadingUsers, error: errorUsers } = useFetchUsers()
  const { isLoading: isLoadingLogs, error: errorLogs } = useFetchLogs()

  // Show loader while fetching data
  if (
    isAuthLoading ||
    isLoadingGuestHouses ||
    isLoadingOccupancies ||
    isLoadingUsers ||
    isLoadingLogs
  ) {
    return <Loader />
  }

  // Show error if any data fetching failed
  if (errorGuestHouses || errorOccupancies || errorUsers || errorLogs) {
    return <Error />
  }

  return <Router />
}
export default App