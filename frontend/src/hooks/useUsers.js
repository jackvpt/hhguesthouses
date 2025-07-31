import { useQuery } from "@tanstack/react-query"
import { fetchAllUsers } from "../api/users"

export const useUsers = ({ enabled = true } = {}) =>
  useQuery({
    queryKey: ["users"],
    queryFn: fetchAllUsers,
    select: (data) =>
      [...data].sort((a, b) => a.codeName.localeCompare(b.codeName)),
    enabled, // <-- Active or inactive based on the parameter
  })
