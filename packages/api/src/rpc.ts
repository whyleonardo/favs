import { env } from "@grek/env/web"

import { hc } from "hono/client"

import type { AppType } from "."

export const client = hc<AppType>(env.NEXT_PUBLIC_API_BASE_URL)
