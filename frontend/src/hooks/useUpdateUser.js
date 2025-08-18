import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateUser } from "../api/users"

export const useUpdateUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] })
    },
    onError: (error) => {
      console.error("Error updating user:", error.message)
    },
  })
}
