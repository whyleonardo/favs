import { createEnv } from "@t3-oss/env-nextjs"

import { z } from "zod"

export const dbEnv = createEnv({
  extends: [],
  server: {
    DATABASE_URL: z.string().url().startsWith("postgres"),
  },
  experimental__runtimeEnv: {},
})
