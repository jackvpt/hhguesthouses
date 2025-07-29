import { useQuery } from "@tanstack/react-query"
import { fetchAllUsers } from "../api/users"

export const useUsers = () =>
  useQuery({
    queryKey: ["users"],
    queryFn: fetchAllUsers,
    select: (data) => [...data].sort((a, b) => a.code.localeCompare(b.code)),
  })
