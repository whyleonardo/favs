import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi"

import { db } from "@grek/db"
import {
  insertLinksSchema,
  links as linksTable,
  linksToTags as linksToTagsTable,
} from "@grek/db/schemas"

import { and, eq } from "drizzle-orm"

import { sessionMiddleware } from "../../middlewares/session"

const route = createRoute({
  summary: "Update Link",
  tags: ["Links"],
  method: "put",
  path: "/:linkId",
  middleware: [sessionMiddleware] as const,
  request: {
    params: z.object({
      linkId: z.string().cuid2(),
    }),
    body: {
      content: {
        "application/json": {
          schema: insertLinksSchema
            .pick({
              title: true,
              url: true,
              description: true,
            })
            .partial()
            .merge(z.object({ tags: z.array(z.string().cuid2()).optional() })),
        },
      },
    },
  },
  responses: {
    204: {
      description: "Link updated successfully",
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

export const updateLink = new OpenAPIHono().openapi(route, async (c) => {
  const sessionUser = c.get("user")
  const userId = sessionUser?.id as string

  const { linkId } = c.req.valid("param")
  const { title, url, description, tags } = c.req.valid("json")

  if (!userId) {
    return c.json(
      {
        message: "Unauthorized",
      },
      401
    )
  }

  const tagsToAssociate = tags
    ? tags.map((tag) => ({
        linkId: linkId,
        tagId: tag,
      }))
    : []

  if (!title && !url && !description && tags) {
    try {
      const link = await db.query.links.findFirst({
        where: and(eq(linksTable.id, linkId), eq(linksTable.userId, userId)),
      })

      if (!link) {
        return c.json(
          {
            message: "Link was not found",
          },
          404
        )
      }

      await db.insert(linksToTagsTable).values(tagsToAssociate)

      return c.body(null, 204)
    } catch {
      return c.json(
        {
          message: "Unexpected Error",
        },
        500
      )
    }
  }

  try {
    const link = await db
      .update(linksTable)
      .set({
        title,
        url,
        description,
      })
      .where(eq(linksTable.id, linkId))
      .returning({ id: linksTable.id })

    if (!link.at(0)) {
      return c.json(
        {
          message: "Link not found",
        },
        404
      )
    }

    if (tags && tags.length > 0) {
      try {
        await db.insert(linksToTagsTable).values(tagsToAssociate)
      } catch (error) {
        console.log(error)
        return c.json(
          {
            message: "Failed to associate tags to the link",
          },
          500
        )
      }
    }

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
