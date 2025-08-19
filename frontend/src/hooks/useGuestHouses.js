import { useQuery } from "@tanstack/react-query"
import { fetchAllGuestHouses } from "../api/guesthouses"

/**
 * Custom React hook to fetch all guest houses.
 *
 * Uses React Query to fetch and cache the list of guest houses from the API.
 *
 * @returns {object} React Query object containing data, status, and methods
 */
export const useGuestHouses = () =>
  useQuery({
    queryKey: ["guestHouses"], // Unique cache key for guest houses
    queryFn: fetchAllGuestHouses, // API call to fetch all guest houses
    // Optional: You can add staleTime, cacheTime, onError, onSuccess here
  })
