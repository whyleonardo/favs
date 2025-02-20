import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi"

import { db } from "@grek/db"
import { insertTagsSchema } from "@grek/db/schemas"
import { tags as tagsTable } from "@grek/db/schemas"

import { sessionMiddleware } from "../../middlewares/session"

const route = createRoute({
  summary: "Create New Tag",
  tags: ["Tags"],
  method: "post",
  path: "/",
  middleware: [sessionMiddleware] as const,
  request: {
    body: {
      content: {
        "application/json": {
          schema: insertTagsSchema.pick({
            icon: true,
            name: true,
          }),
        },
      },
    },
  },
  responses: {
    201: {
      content: {
        "application/json": {
          schema: z.object({
            tagId: z.string(),
          }),
        },
      },
      description: "Link created successfully",
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

export const createTag = new OpenAPIHono().openapi(route, async (c) => {
  const sessionUser = c.get("user")
  const userId = sessionUser?.id as string

  const { icon, name } = c.req.valid("json")

  if (!userId) {
    return c.json(
      {
        message: "Unauthorized",
      },
      401
    )
  }

  try {
    const tag = await db
      .insert(tagsTable)
      .values({
        name,
        icon,
        userId,
      })
      .returning({
        id: tagsTable.id,
      })

    if (!tag) {
      return c.json(
        {
          message: "Unexpected error on creating tag",
        },
        500
      )
    }
    return c.json(
      {
        tagId: tag.at(0)?.id as string,
      },
      201
    )
  } catch (error) {
    // @ts-ignore - No NeonDbError instance
    if ("code" in error && error.code === "23505") {
      return c.json(
        {
          message: "A link with this title already exists",
        },
        409
      )
    }

    return c.json(
      {
        message: "Unexpected Error",
      },
      500
    )
  }
})
