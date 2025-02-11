"use client"

import { signIn } from "@solistack/auth/client"
import { env } from "@solistack/env/web"

export const Login = () => {
  return (
    <button
      type="button"
      onClick={async () => {
        await signIn.social({
          provider: "github",
          callbackURL: env.NEXT_PUBLIC_APP_BASE_URL,
        })
      }}
    >
      Login
    </button>
  )
}
