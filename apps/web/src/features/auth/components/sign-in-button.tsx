"use client"

import { Button } from "@/components/ui/button"
import { useOAuthSignIn } from "@/features/auth/queries/use-oauth-sign-in"

export const SignInButton = () => {
  const { mutate: mutateGithub, isPending: isPendingGithub } = useOAuthSignIn()

  async function handleGithubLogin() {
    mutateGithub({ provider: "github" })
  }

  return (
    <div className="flex flex-col gap-2">
      <Button size="lg" onClick={handleGithubLogin} disabled={isPendingGithub}>
        Login with GitHub
      </Button>
    </div>
  )
}
