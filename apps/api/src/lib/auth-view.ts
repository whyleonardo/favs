import { auth } from "@solistack/auth"

import type { Context } from "elysia"

export const betterAuthView = (ctx: Context) => {
  const BETTER_AUTH_ACCEPT_METHODS = ["POST", "GET"]

  if (BETTER_AUTH_ACCEPT_METHODS.includes(ctx.request.method)) {
    return auth.handler(ctx.request)
  }

  return ctx.error(405)
}
