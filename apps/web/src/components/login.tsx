"use client"

import { signIn } from "@solistack/auth/client"

export const Login = () => {
  return (
    <button
      type="button"
      onClick={async () => {
        await signIn.social({
          provider: "github",
          callbackURL: "http://localhost:3000/",
        })
      }}
    >
      Login
    </button>
  )
}
