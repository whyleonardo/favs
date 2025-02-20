import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi"

import { db } from "@grek/db"
import {
  links as linksTable,
  selectLinksSchema,
  selectTagsSchema,
} from "@grek/db/schemas"

import { eq } from "drizzle-orm"

import { sessionMiddleware } from "../../middlewares/session"

const route = createRoute({
  summary: "Get All Links",
  tags: ["Links"],
  method: "get",
  path: "/",
  middleware: [sessionMiddleware] as const,
  responses: {
    200: {
      content: {
        "application/json": {
          schema: z.array(
            selectLinksSchema
              .omit({
                userId: true,
              })
              .merge(
                z.object({
                  tags: z.array(
                    selectTagsSchema.omit({
                      userId: true,
                    })
                  ),
                })
              )
          ),
        },
      },
      description: "Links retrieved successfully",
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

export const fetchLinks = new OpenAPIHono().openapi(route, async (c) => {
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
    const links = await db.query.links
      .findMany({
        columns: {
          id: true,
          title: true,
          url: true,
          description: true,
          createdAt: true,
        },
        where: eq(linksTable.userId, userId),
        with: {
          tags: {
            columns: {
              linkId: false,
              tagId: false,
            },
            with: {
              tag: {
                columns: {
                  name: true,
                  icon: true,
                  id: true,
                },
              },
            },
          },
        },
      })
      .then((links) =>
        links.map((link) => ({
          ...link,
          tags: link.tags.map(({ tag }) => ({
            ...tag,
          })),
        }))
      )

    return c.json(links, 200)
  } catch {
    return c.json(
      {
        message: "Unexpected Error",
      },
      500
    )
  }
})
