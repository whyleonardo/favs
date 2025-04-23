import { db } from "@grek/db"
import { authEnv } from "@grek/env/auth"
import { env } from "@grek/env/web"

import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"

import { openAPIPlugin, stripePlugin } from "./plugins"

export const auth = betterAuth({
  trustedOrigins: [env.NEXT_PUBLIC_APP_BASE_URL],
  secret: authEnv.BETTER_AUTH_SECRET,
  plugins: [openAPIPlugin, stripePlugin],
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
  advanced: {
    cookiePrefix: "favs-app",
  },
})

export type AuthType = typeof auth
