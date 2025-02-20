import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi"

import { db } from "@grek/db"
import { links as linksTable } from "@grek/db/schemas"

import { eq } from "drizzle-orm"

import { sessionMiddleware } from "../../middlewares/session"

const route = createRoute({
  summary: "Delete Link",
  tags: ["Links"],
  method: "delete",
  path: "/:linkId",
  middleware: [sessionMiddleware] as const,
  request: {
    params: z.object({
      linkId: z.string().cuid2(),
    }),
  },
  responses: {
    204: {
      description: "Link deleted successfully",
    },
    401: {
      content: {
        "application/json": {
          schema: z.object({
            message: z.string(),
          }),
        },
      },
      description: "Unauthorized",
    },
    500: {
      content: {
        "application/json": {
          schema: z.object({
            message: z.string(),
          }),
        },
      },
      description: "Unexpected Error",
    },
  },
})

export const deleteLink = new OpenAPIHono().openapi(route, async (c) => {
  const sessionUser = c.get("user")
  const userId = sessionUser?.id as string

  const { linkId } = c.req.valid("param")

  if (!userId) {
    return c.json(
      {
        message: "Unauthorized",
      },
      401
    )
  }

  try {
    await db.delete(linksTable).where(eq(linksTable.id, linkId))

    return c.body(null, 204)
  } catch {
    return c.json(
      {
        message: "Unexpected Error",
      },
      500
    )
  }
})
