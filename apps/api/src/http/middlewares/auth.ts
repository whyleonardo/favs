import { auth } from "@solistack/auth"

import type { Session, User } from "better-auth/types"
import type { Context } from "elysia"

export const userMiddleware = async (ctx: Context) => {
  const session = await auth.api.getSession({ headers: ctx.request.headers })

  if (!session) {
    ctx.set.status = 401
    return {
      success: "error",
      message: "Unauthorized Access: Token is missing",
    }
  }

  return {
    user: session.user,
    session: session.session,
  }
}

export const userInfo = (user: User | null, session: Session | null) => {
  return {
    user: user,
    session: session,
  }
}
