import { useRouter } from "next/navigation"

import { useMutation, useQueryClient } from "@tanstack/react-query"

import { signIn } from "@grek/auth/client"

import type { z } from "better-auth"
import { SocialProviderListEnum } from "better-auth/social-providers"

SocialProviderListEnum

type Provider = z.infer<typeof SocialProviderListEnum>

export const useOAuthSignIn = () => {
  const router = useRouter()
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async ({ provider }: { provider: Provider }) => {
      await signIn.social({ provider, callbackURL: "/" })
    },
    onSuccess: () => {
      router.refresh()
      queryClient.invalidateQueries({ queryKey: ["current-user"] })
    },
  })

  return mutation
}
