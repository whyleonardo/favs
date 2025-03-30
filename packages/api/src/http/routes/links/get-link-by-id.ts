import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi"

import { db } from "@grek/db"
import {
  links as linksTable,
  selectLinksSchema,
  selectTagsSchema,
} from "@grek/db/schemas"

import { and, eq } from "drizzle-orm"

import { sessionMiddleware } from "../../middlewares/session"

const route = createRoute({
  summary: "Get Link by ID",
  tags: ["Links"],
  method: "get",
  path: "/:linkId",
  middleware: [sessionMiddleware] as const,
  request: {
    params: z.object({
      linkId: z.string().cuid2(),
    }),
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: selectLinksSchema.merge(
            z.object({
              tags: z.array(
                selectTagsSchema.omit({
                  userId: true,
                })
              ),
            })
          ),
        },
      },
      description: "Link retrieved successfully",
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
    404: {
      content: {
        "application/json": {
          schema: z.object({
            message: z.string(),
          }),
        },
      },
      description: "Link not found",
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

export const getLinkById = new OpenAPIHono().openapi(route, async (c) => {
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
    const link = await db.query.links.findFirst({
      where: and(eq(linksTable.id, linkId), eq(linksTable.userId, userId)),
      with: {
        tags: {
          columns: {
            linkId: false,
            tagId: false,
          },
          with: {
            tag: {
              columns: {
                id: true,
                name: true,
                icon: true,
                color: true,
              },
            },
          },
        },
      },
    })

    if (!link) {
      return c.json(
        {
          message: "Link not found",
        },
        404
      )
    }

    return c.json(
      {
        ...link,
        tags: link?.tags ? link.tags.map(({ tag }) => tag) : [],
      },
      200
    )
  } catch {
    return c.json(
      {
        message: "Unexpected Error",
      },
      500
    )
  }
})
