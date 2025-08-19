import { useQuery } from "@tanstack/react-query"
import { fetchAllOccupancies } from "../api/occupancies"

/**
 * Custom React hook to fetch all occupancies.
 *
 * Uses React Query to fetch and cache occupancy data from the API.
 *
 * @returns {object} React Query object containing data, status, error, and methods
 */
export const useOccupancies = () =>
  useQuery({
    queryKey: ["occupancies"], // Unique cache key for occupancies
    queryFn: fetchAllOccupancies, // API call to fetch occupancies
    // Optional: add staleTime, refetchInterval, cacheTime, onSuccess, onError if needed
  })
