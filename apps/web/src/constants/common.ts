import { env } from "@grek/env/web"

export const VERCEL_ENV_PROD = env.VERCEL_ENV === "production"

export const ENABLE_REACT_SCAN = false
