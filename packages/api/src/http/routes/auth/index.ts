import { OpenAPIHono } from "@hono/zod-openapi"

import { auth } from "@grek/auth"

export const authRoute = new OpenAPIHono().on(
  ["GET", "POST", "OPTIONS"],
  "*",
  (c) => {
    return auth.handler(c.req.raw)
  }
)
