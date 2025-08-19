import { useQuery } from "@tanstack/react-query"
import { fetchAllOccupancies } from "../api/occupancies"

/**
 * Custom React hook to fetch all occupancies.
 *
 * Uses React Query to fetch and cache occupancy data from the API.
 *
 * @returns {object} React Query object containing data, status, error, and methods
 */
export const useFetchOccupancies = () =>
  useQuery({
    queryKey: ["occupancies"], // Unique cache key for occupancies
    queryFn: fetchAllOccupancies, // API call to fetch occupancies
    refetchInterval: 15000, // Refetch every 15 seconds
    refetchOnWindowFocus: false, // Do not refetch on window focus})
  })
