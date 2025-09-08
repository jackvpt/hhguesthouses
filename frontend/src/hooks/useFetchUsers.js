// 🌐 React Query
import { useQuery } from "@tanstack/react-query"

// 🧰 API functions
import { fetchAllUsers } from "../api/users"

/**
 * Custom React hook to fetch all users.
 *
 * Fetches users using React Query's useQuery and sorts them by codeName.
 * Allows conditional enabling/disabling of the query.
 *
 * @param {object} options - Optional settings for the hook.
 * @param {boolean} options.enabled - Whether the query should be active (default: true).
 * @returns {object} Query object containing data, status, error, etc.
 */
export const useFetchUsers = ({ enabled = true } = {}) =>
  useQuery({
    queryKey: ["users"], // Unique query key for caching
    queryFn: fetchAllUsers, // API call to fetch users
    select: (data) =>
      [...data].sort((a, b) => a.codeName.localeCompare(b.codeName)), // Sort users by codeName
    enabled, // Enable or disable the query dynamically
  })
