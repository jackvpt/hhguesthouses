import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateOccupancy } from "../api/occupancies"

/**
 * Custom hook to update an existing occupancy.
 *
 * Wraps React Query's useMutation to handle updating an occupancy
 * and invalidates the "occupancies" query on success.
 *
 * @param {object} options - Optional callbacks for handling success and error
 * @param {function} options.onSuccess - Called after a successful update
 * @param {function} options.onError - Called when an error occurs
 *
 * @returns {object} Mutation object containing mutate function, status, etc.
 */
export const useUpdateOccupancy = ({ onSuccess, onError } = {}) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateOccupancy,
    onSuccess: (...args) => {
      // Invalidate occupancies query to refresh cached data
      queryClient.invalidateQueries({ queryKey: ["occupancies"] })

      // Run component-level onSuccess callback if provided
      if (onSuccess) onSuccess(...args)
    },
    onError: (error, ...rest) => {
      console.error("Error updating occupancy:", error)

      // Run component-level onError callback if provided
      if (onError) onError(error, ...rest)
    },
  })
}
