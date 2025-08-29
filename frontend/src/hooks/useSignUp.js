import { useMutation, useQueryClient } from "@tanstack/react-query"
import { signup } from "../api/auth"

/**
 * Custom hook to add a new occupancy.
 *
 * @param {object} options - Options pour gérer le succès/erreur depuis le composant appelant
 * @returns {object} Mutation object (mutate, status, etc.)
 */
export const useSignUp = ({ onSuccess, onError } = {}) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: signup,
    onSuccess: (...args) => {
      // Invalider le cache
      queryClient.invalidateQueries({ queryKey: ["occupancies"] })

      // Si le composant veut gérer un toast, callback, etc.
      if (onSuccess) onSuccess(...args)
    },
    onError: (error, ...rest) => {
      console.error("Error while submitting occupancy:", error)
      if (onError) onError(error, ...rest)
    },
  })
}
