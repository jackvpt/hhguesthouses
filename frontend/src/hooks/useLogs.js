import { useQuery } from "@tanstack/react-query"
import { fetchAllLogs } from "../api/logs"

export const useLogs = () =>
  useQuery({
    queryKey: ["logs"],
    queryFn: fetchAllLogs,
  })
