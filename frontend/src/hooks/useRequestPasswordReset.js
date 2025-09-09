// 🌐 React Query
import { useMutation } from "@tanstack/react-query"

// 🧰 API functions
import { requestPasswordReset } from "../api/auth"

/**
 * Custom hook to request a password reset.
 *
 * @param {object} options - Options for handling success/error from the calling component
 * @returns {object} Mutation object (mutate, status, etc.)
 */
export const useRequestPasswordReset = ({ onSuccess, onError } = {}) => {
  return useMutation({
    mutationFn: requestPasswordReset,
    onSuccess: (...args) => {
      // If the component wants to handle a toast, callback, etc.
      if (onSuccess) onSuccess(...args)
    },
    onError: (error, ...rest) => {
      console.error("Error while requesting password reset:", error)
      if (onError) onError(error, ...rest)
    },
  })
}
