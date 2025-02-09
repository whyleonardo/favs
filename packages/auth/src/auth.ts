import { db } from "@solistack/db"
import { authEnv } from "@solistack/env/auth"

import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"

export const auth = betterAuth({
  trustedOrigins: ["http://localhost:3000"],
  secret: authEnv.BETTER_AUTH_SECRET,
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  emailAndPassword: {
    enabled: false,
  },
  socialProviders: {
    github: {
      clientId: authEnv.GITHUB_OAUTH_CLIENT_ID,
      clientSecret: authEnv.GITHUB_OAUTH_CLIENT_SECRET,
    },
  },
})

export type AuthType = typeof auth
