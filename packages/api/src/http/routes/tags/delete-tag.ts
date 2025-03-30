import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi"

import { db } from "@grek/db"
import { tags as tagsTable } from "@grek/db/schemas"

import { eq } from "drizzle-orm"

import { sessionMiddleware } from "../../middlewares/session"

const route = createRoute({
  summary: "Delete Tag",
  tags: ["Tags"],
  method: "delete",
  path: "/:tagId",
  middleware: [sessionMiddleware] as const,
  request: {
    params: z.object({
      tagId: z.string().cuid2(),
    }),
  },
  responses: {
    204: {
      description: "Tag deleted successfully",
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

export const deleteTag = new OpenAPIHono().openapi(route, async (c) => {
  const sessionUser = c.get("user")
  const userId = sessionUser?.id as string

  const { tagId } = c.req.valid("param")

  if (!userId) {
    return c.json(
      {
        message: "Unauthorized",
      },
      401
    )
  }

  try {
    await db.delete(tagsTable).where(eq(tagsTable.id, tagId))

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
