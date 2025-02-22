import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi"

import { db } from "@grek/db"
import { links as linksTable } from "@grek/db/schemas"
import { linksToTags as linksToTagsTable } from "@grek/db/schemas"

import { sessionMiddleware } from "../../middlewares/session"

const route = createRoute({
  summary: "Create New Link",
  tags: ["Links"],
  method: "post",
  path: "/",
  middleware: [sessionMiddleware] as const,
  request: {
    body: {
      content: {
        "application/json": {
          schema: z.object({
            title: z
              .string()
              .min(3, { message: "Title must be at least 3 characters" }),
            url: z.string().url(),
            description: z.string().optional(),
            tags: z.array(z.string().cuid2()).optional(),
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
            message: z.string(),
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

export const createLink = new OpenAPIHono().openapi(route, async (c) => {
  const sessionUser = c.get("user")
  const userId = sessionUser?.id as string

  const { title, description, url, tags } = c.req.valid("json")

  if (!userId) {
    return c.json(
      {
        message: "Unauthorized",
      },
      401
    )
  }

  try {
    const link = await db
      .insert(linksTable)
      .values({
        title,
        url,
        description,
        userId,
      })
      .returning({ id: linksTable.id })

    if (!link.at(0)) {
      return c.json(
        {
          message: "Unxexpected error on creating link",
        },
        500
      )
    }

    if (tags && tags.length > 0) {
      const tagsToAssociate = tags.map((tag) => ({
        linkId: link?.at(0)?.id as string,
        tagId: tag,
      }))

      try {
        await db.insert(linksToTagsTable).values(tagsToAssociate)
      } catch {
        return c.json(
          {
            message: "Unexpected error to associate tags to the link",
          },
          500
        )
      }
    }
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

  return c.json(
    {
      message: "Link created successfully",
    },
    201
  )
})
