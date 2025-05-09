import { createEnv } from "@t3-oss/env-nextjs"

import { z } from "zod"

import { dbEnv } from "../db"
import { sharedEnv } from "../shared"

export const apiEnv = createEnv({
  extends: [sharedEnv, dbEnv],
  server: {
    BETTER_AUTH_SECRET: z.string().min(1),
    GITHUB_OAUTH_REDIRECT_URI: z.string().url(),
    GITHUB_OAUTH_CLIENT_SECRET: z.string().min(1),
    GITHUB_OAUTH_CLIENT_ID: z.string().min(1),
    WEB_APP_URL: z.string().url(),
  },
  experimental__runtimeEnv: {},
})
