import { useQuery } from "@tanstack/react-query"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setUser, clearUser } from "../features/userSlice"
import { setLanguage } from "../features/parametersSlice"
import { validateToken } from "../api/auth"

/**
 * Custom React hook to validate and manage authentication token.
 *
 * This hook checks if a token exists in localStorage or sessionStorage,
 * validates it via the API, updates the Redux user state, and redirects
 * to the login page if the token is invalid.
 *
 * @returns {object} React Query object with token validation status and data
 */
export function useAuthToken() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // Retrieve token from localStorage or sessionStorage
  const token = localStorage.getItem("token") || sessionStorage.getItem("token")

  return useQuery({
    queryKey: ["token", token], // Cache query per token
    queryFn: () => validateToken(token), // API call to validate token
    enabled: !!token, // Only run if token exists
    retry: false, // Disable automatic retry on failure
    refetchInterval: 30000, // Refetch every 30 seconds to keep session active

    /**
     * Handle successful token validation
     * @param {object} data - API response containing validity and user info
     */
    onSuccess: (data) => {
      if (data.valid) {
        // Set user in Redux
        dispatch(setUser(data.user))
        // Apply user's preferred language
        dispatch(setLanguage(data.user.settings.preferredLanguage))
      } else {
        // Clear user state and redirect to login
        dispatch(clearUser())
        navigate("/login", { replace: true })
      }
    },

    /**
     * Handle errors in token validation (network errors, etc.)
     */
    onError: () => {
      dispatch(clearUser())
      navigate("/login", { replace: true })
    },
  })
}
