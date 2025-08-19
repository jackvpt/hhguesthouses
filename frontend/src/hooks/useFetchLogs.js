import { useQuery } from "@tanstack/react-query"
import { fetchAllLogs } from "../api/logs"

/**
 * Custom React hook to fetch all logs.
 *
 * Uses React Query to fetch and cache the logs from the API.
 * The data will automatically refetch every 30 seconds.
 *
 * @returns {object} React Query object containing data, status, error, and methods
 */
export const useFetchLogs = () =>
  useQuery({
    queryKey: ["logs"], // Unique cache key for logs
    queryFn: fetchAllLogs, // API call to fetch logs
    refetchInterval: 30000, // Automatically refetch every 30 seconds
    // Optional: add staleTime, cacheTime, onSuccess, onError if needed
  })
