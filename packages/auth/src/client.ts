import { env } from "@solistack/env/web"

import { createAuthClient } from "better-auth/react"

export const { signIn, signUp, signOut, getSession } = createAuthClient({
  baseURL: env.NEXT_PUBLIC_API_BASE_URL,
  fetchOptions: {
    credentials: "include",
  },
})
