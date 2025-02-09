import { init } from "@sentry/nextjs"
import { env as envClient } from "@solistack/env/web/client"
import { env } from "@solistack/env/web/server"

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
