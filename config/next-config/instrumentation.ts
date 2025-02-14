import { env as envClient } from "@grek/env/web/client"
import { env } from "@grek/env/web/server"
import { init } from "@sentry/nextjs"

const opts = {
  dsn: envClient.NEXT_PUBLIC_SENTRY_DSN,
}

export const initializeSentry = () => {
  if (env.NEXT_RUNTIME === "nodejs") {
    init(opts)
  }

  if (env.NEXT_RUNTIME === "edge") {
    init(opts)
  }
}
