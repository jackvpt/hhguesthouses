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

  const userLanguage = useSelector(
    (state) => state.user.settings?.preferredLanguage
  )

  const language = useSelector((state) => state.parameters.language)

  // Met à jour la langue Redux quand userLanguage change
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
    return <Error />
  }

  return <Router />
}
export default App