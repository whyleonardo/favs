import { useRouter } from "next/navigation"

import { useMutation, useQueryClient } from "@tanstack/react-query"

import { signOut } from "@grek/auth/client"

export const useSignOut = () => {
  const router = useRouter()
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async () => {
      await signOut()
    },
    onSuccess: () => {
      router.refresh()
      queryClient.invalidateQueries({ queryKey: ["current-user"] })
    },
  })

  return mutation
}
