import { createEnv } from "@t3-oss/env-nextjs"

import { z } from "zod"

import { sharedEnv } from "../shared"

export const env = createEnv({
  extends: [sharedEnv],
  server: {
    FLAGS_SECRET: z.string(),
    UPSTASH_REDIS_REST_URL: z.string().url(),
    UPSTASH_REDIS_REST_TOKEN: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_APP_BASE_URL: z.string().url(),
    NEXT_PUBLIC_API_BASE_URL: z.string().url(),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_APP_BASE_URL: process.env.NEXT_PUBLIC_APP_BASE_URL,
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  },
})
