import { useMutation } from "@tanstack/react-query"
import { updatePassword } from "../api/auth"

/**
 * Custom hook to update the current user's password.
 *
 * @param {object} options Optional callbacks for onSuccess/onError
 * @returns {object} Mutation object from useMutation
 */
export const useUpdatePassword = (options = {}) => {
  return useMutation({
    mutationFn: updatePassword,
    onSuccess: (data, variables, context) => {
      console.log("Password updated successfully:", data.message)
      if (options.onSuccess) {
        options.onSuccess(data, variables, context)
      }
    },
    onError: (error, variables, context) => {
      console.error("Error updating password:", error.message)
      if (options.onError) {
        options.onError(error, variables, context)
      }
    },
  })
}
