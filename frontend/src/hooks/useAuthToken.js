// hooks/useAuthToken.js
import { useQuery } from "@tanstack/react-query"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setUser, clearUser } from "../features/userSlice"
import { validateToken } from "../api/auth"
import { setLanguage } from "../features/parametersSlice"

export function useAuthToken() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const token = localStorage.getItem("token") || sessionStorage.getItem("token")

  return useQuery({
    queryKey: ["token", token],
    queryFn: () => validateToken(token),
    enabled: !!token,
    retry: false,
    refetchInterval: 30000,
    onSuccess: (data) => {
      if (data.valid) {
        dispatch(setUser(data.user))
        dispatch(setLanguage(data.user.settings.preferredLanguage))
      } else {
        dispatch(clearUser())
        navigate("/login", { replace: true })
      }
    },
    onError: () => {
      dispatch(clearUser())
      navigate("/login", { replace: true })
    },
  })
}
