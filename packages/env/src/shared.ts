import { createEnv } from "@t3-oss/env-nextjs"
import { vercel } from "@t3-oss/env-nextjs/presets"

export const sharedEnv = createEnv({
  extends: [vercel()],
  shared: {},
  experimental__runtimeEnv: {},
})
