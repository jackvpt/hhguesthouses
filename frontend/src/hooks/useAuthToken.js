// hooks/useAuthToken.js
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser, clearUser } from "../features/userSlice";
import { validateToken } from "../api/auth";

export function useAuthToken({ checkInterval = 300000 } = {}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = localStorage.getItem("token") || sessionStorage.getItem("token");

  return useQuery({
    queryKey: ["token", token],
    queryFn: () => validateToken(token),
    enabled: !!token,
    retry: false,
    refetchInterval: checkInterval,
    onSuccess: (data) => {
      if (data.valid) {
        dispatch(setUser(data.user));
      } else {
        dispatch(clearUser());
        navigate("/login", { replace: true });
      }
    },
    onError: () => {
      dispatch(clearUser());
      navigate("/login", { replace: true });
    },
  });
}
