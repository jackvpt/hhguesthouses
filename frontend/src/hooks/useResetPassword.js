// 🌐 React Query
import { useMutation } from "@tanstack/react-query"

// 🧰 API functions
import { resetPassword } from "../api/auth"

/**
 * Custom hook to reset a user's password using a token.
 *
 * @param {object} options - Options for handling success/error from the calling component
 * @returns {object} Mutation object (mutate, status, etc.)
 */
export const useResetPassword = ({ onSuccess, onError } = {}) => {
  return useMutation({
    mutationFn: resetPassword,
    onSuccess: (...args) => {
      // Allow component to show toast, redirect, etc.
      if (onSuccess) onSuccess(...args)
    },
    onError: (error, ...rest) => {
      console.error("Error while resetting password:", error)
      if (onError) onError(error, ...rest)
    },
  })
}
