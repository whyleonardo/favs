import { env } from "@grek/env/web"

import { createAuthClient } from "better-auth/react"

export const { signIn, signUp, signOut, getSession, useSession } =
  createAuthClient({
    baseURL: env.NEXT_PUBLIC_API_BASE_URL,
    fetchOptions: {
      credentials: "include",
    },
  })
