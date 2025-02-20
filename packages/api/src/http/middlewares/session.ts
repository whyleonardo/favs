import { auth } from "@grek/auth"

import { createMiddleware } from "hono/factory"

interface AdditionalSessionMiddlewareContext {
  Variables: {
    user: typeof auth.$Infer.Session.user | null
    session: typeof auth.$Infer.Session.session | null
  }
}

export const sessionMiddleware =
  createMiddleware<AdditionalSessionMiddlewareContext>(async (c, next) => {
    const session = await auth.api.getSession({ headers: c.req.raw.headers })

    if (!session) {
      c.set("user", null)
      c.set("session", null)
      return next()
    }
    c.set("user", session.user)
    c.set("session", session.session)

    return next()
  })
