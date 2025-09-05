import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateUser } from "../api/users"

/**
 * Custom React hook to update a user.
 *
 * Uses React Query's useMutation to perform an update and automatically
 * invalidate the "users" query to refetch updated data.
 *
 * @returns {object} Mutation object containing mutate function, status, error, etc.
 */
export const useUpdateUser = (options = {}) => {
  const queryClient = useQueryClient() // Access React Query client

  return useMutation({
    mutationFn: updateUser, // API call to update a user
    onSuccess: (data, variables, context) => {
      // Invalidate "users" cache to refetch fresh data
      queryClient.invalidateQueries({ queryKey: ["users"] })
      if (options.onSuccess) {
        options.onSuccess(data, variables, context)
      }
    },
    onError: (error, variables, context) => {
      // Log mutation errors for debugging
      console.error("Error updating user:", error.message)
      if (options.onError) {
        options.onError(error, variables, context)
      }
    },
  })
}
