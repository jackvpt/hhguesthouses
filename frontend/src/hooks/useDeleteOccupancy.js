import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteOccupancy } from "../api/occupancies"

/**
 * Custom hook to delete an existing occupancy.
 *
 * Wraps React Query's useMutation to handle deleting an occupancy
 * and invalidates the "occupancies" query on success.
 *
 * @param {object} options - Optional callbacks for handling success and error
 * @param {function} options.onSuccess - Called after a successful delete
 * @param {function} options.onError - Called when an error occurs
 *
 * @returns {object} Mutation object containing mutate function, status, etc.
 */
export const useDeleteOccupancy = ({ onSuccess, onError } = {}) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteOccupancy,
    onSuccess: (...args) => {
      // Invalidate occupancies query to refresh cached data
      queryClient.invalidateQueries({ queryKey: ["occupancies"] })

      // Run component-level onSuccess callback if provided
      if (onSuccess) onSuccess(...args)
    },
    onError: (error, ...rest) => {
      console.error("Error deleting occupancy:", error)

      // Run component-level onError callback if provided
      if (onError) onError(error, ...rest)
    },
  })
}
