import { db } from "@solistack/db"
import { authEnv } from "@solistack/env/auth"
import { env } from "@solistack/env/web"

import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"

export const auth = betterAuth({
  trustedOrigins: [env.NEXT_PUBLIC_APP_BASE_URL],
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
      redirectURI: authEnv.GITHUB_OAUTH_REDIRECT_URI,
    },
  },
  advanced: {
    cookiePrefix: "favs-app",
  },
})

export type AuthType = typeof auth
