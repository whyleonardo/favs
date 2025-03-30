import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi"

import { db } from "@grek/db"
import { selectTagsSchema } from "@grek/db/schemas"
import { tags as tagsTable } from "@grek/db/schemas"

import { eq } from "drizzle-orm"

import { sessionMiddleware } from "../../middlewares/session"

const route = createRoute({
  summary: "Get All Tags",
  tags: ["Tags"],
  method: "get",
  path: "/",
  middleware: [sessionMiddleware] as const,
  responses: {
    200: {
      content: {
        "application/json": {
          schema: z.array(
            selectTagsSchema.omit({
              userId: true,
            })
          ),
        },
      },
      description: "Tags retrieved successfully",
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
    409: {
      content: {
        "application/json": {
          schema: z.object({
            message: z.string(),
          }),
        },
      },
      description: "Link already exists",
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

export const fetchTags = new OpenAPIHono().openapi(route, async (c) => {
  const sessionUser = c.get("user")
  const userId = sessionUser?.id as string

  if (!userId) {
    return c.json(
      {
        message: "Unauthorized",
      },
      401
    )
  }

  try {
    const tags = await db.query.tags.findMany({
      columns: {
        id: true,
        name: true,
        icon: true,
        color: true,
      },
      where: eq(tagsTable.userId, userId),
    })

    return c.json(tags, 200)
  } catch {
    return c.json(
      {
        message: "Unexpected Error",
      },
      500
    )
  }
})
