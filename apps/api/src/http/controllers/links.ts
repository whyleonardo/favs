import { db } from "@solistack/db"
import { user as userTable } from "@solistack/db/schemas"
import { links as linksTable } from "@solistack/db/schemas"
import { linksToTags as linksToTagsTable } from "@solistack/db/schemas"

import { UnexpectedError } from "@/http/_errors/unexpected-error"
import { userMiddleware } from "@/http/middlewares/auth"

import { and, eq } from "drizzle-orm"
import { Elysia, t } from "elysia"

export const linksController = new Elysia({
  prefix: "/links",
  detail: {
    tags: ["Links"],
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
})
  .derive((ctx) => userMiddleware(ctx))
  .post(
    "/",
    async (app) => {
      const userId = app.user?.id

      const { title, url, description, tags } = app.body

      if (!userId) {
        app.set.status = 401

        return {
          status: 401,
          message: "Unauthorized Access: User is not authenticated",
        }
      }

      const user = await db.query.user.findFirst({
        where: eq(userTable.id, userId),
      })

      if (!user) {
        app.set.status = 404

        return {
          status: 404,
          message: "User not found",
        }
      }

      try {
        const link = await db
          .insert(linksTable)
          .values({
            title,
            url,
            description,
            userId: user.id,
          })
          .returning({ id: linksTable.id })

        if (!link.at(0)) {
          app.set.status = 404

          return {
            status: 404,
            message: "Link was not found",
          }
        }

        if (tags && tags.length > 0) {
          const tagsToAssociate = tags.map((tag) => ({
            linkId: link?.at(0)?.id as string,
            tagId: tag,
          }))

          try {
            await db.insert(linksToTagsTable).values(tagsToAssociate)
          } catch {
            app.set.status = 400

            return {
              status: 400,
              message: "Failed to associate tags to the link",
            }
          }
        }

        app.set.status = 204

        return null
      } catch (err) {
        // @ts-ignore - No NeonDbError instance
        if ("code" in err && err.code === "23505") {
          app.set.status = 409

          return {
            status: 409,
            message: "A link with this title already exists",
          }
        }

        throw new UnexpectedError()
      }
    },
    {
      body: t.Object({
        title: t.String({
          minLength: 3,
        }),
        url: t.String({
          pattern: "^(https?:\\/\\/)?",
          error: "Invalid URL",
        }),
        description: t.Optional(t.String()),
        tags: t.Optional(t.Array(t.String())),
      }),
      response: {
        204: t.Null(),
        400: t.Object({
          status: t.Literal(400, {
            examples: [400],
          }),
          message: t.String(),
        }),
        401: t.Object({
          status: t.Literal(401, {
            examples: [401],
          }),
          message: t.String(),
        }),
        404: t.Object({
          status: t.Literal(404, {
            examples: [404],
          }),
          message: t.String(),
        }),
        409: t.Object({
          status: t.Literal(409, {
            examples: [409],
          }),
          message: t.String(),
        }),
      },
      detail: {
        summary: "Create New Link",
      },
    }
  )
  .get(
    "/",
    async (app) => {
      const userId = app.user?.id

      if (!userId) {
        app.set.status = 401

        return {
          status: 401,
          message: "Unauthorized Access: User is not authenticated",
        }
      }

      const user = await db.query.user.findFirst({
        where: eq(userTable.id, userId),
      })

      if (!user) {
        app.set.status = 404

        return {
          status: 404,
          message: "User not found",
        }
      }

      try {
        const links = await db.query.links.findMany({
          where: eq(linksTable.userId, user.id),
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

        const linksWithTags = links.map((link) => ({
          ...link,
          tags: link.tags.map(({ tag }) => ({
            ...tag,
          })),
        }))

        app.set.status = 200

        return linksWithTags
      } catch {
        app.set.status = 400

        return {
          status: 400,
          message: "Bad Request",
        }
      }
    },
    {
      response: {
        200: t.Array(
          t.Object({
            id: t.String(),
            description: t.Nullable(t.String()),
            createdAt: t.Nullable(t.Date(t.String())),
            userId: t.String(),
            title: t.String(),
            url: t.String(),
            tags: t.Array(
              t.Object({
                name: t.String(),
                icon: t.String(),
                id: t.String(),
              })
            ),
          })
        ),
        400: t.Object({
          status: t.Literal(400, {
            examples: [400],
          }),
          message: t.String(),
        }),
        401: t.Object({
          status: t.Literal(401, {
            examples: [401],
          }),
          message: t.String(),
        }),
        404: t.Object({
          status: t.Literal(404, {
            examples: [404],
          }),
          message: t.String(),
        }),
      },
      detail: {
        summary: "Get All Links",
      },
    }
  )
  .delete(
    "/:linkId",
    async (app) => {
      const userId = app.user?.id

      const { linkId } = app.params

      if (!userId) {
        app.set.status = 401

        return {
          status: 401,
          message: "Unauthorized Access: User is not authenticated",
        }
      }

      const user = await db.query.user.findFirst({
        where: eq(userTable.id, userId),
      })

      if (!user) {
        app.set.status = 404

        return {
          status: 404,
          message: "User not found",
        }
      }

      try {
        await db.delete(linksTable).where(eq(linksTable.id, linkId))

        app.set.status = 204

        return null
      } catch {
        return {
          status: 400,
          message: "Bad Request",
        }
      }
    },
    {
      params: t.Object({
        linkId: t.String({ minLength: 1 }),
      }),
      response: {
        204: t.Null(),
        400: t.Object({
          status: t.Literal(400, {
            examples: [400],
          }),
          message: t.String(),
        }),
        401: t.Object({
          status: t.Literal(401, {
            examples: [401],
          }),
          message: t.String(),
        }),
        404: t.Object({
          status: t.Literal(404, {
            examples: [404],
          }),
          message: t.String(),
        }),
      },
      detail: {
        summary: "Delete Link",
      },
    }
  )
  .get(
    "/:linkId",
    async (app) => {
      const userId = app.user?.id

      const { linkId } = app.params

      if (!userId) {
        app.set.status = 401

        return {
          status: 401,
          message: "Unauthorized Access: User is not authenticated",
        }
      }

      const user = await db.query.user.findFirst({
        where: eq(userTable.id, userId),
      })

      if (!user) {
        app.set.status = 404

        return {
          status: 404,
          message: "User not found",
        }
      }

      try {
        const link = await db.query.links.findFirst({
          where: and(eq(linksTable.id, linkId), eq(linksTable.userId, user.id)),
          with: {
            tags: true,
          },
        })

        if (!link) {
          return {
            status: 404,
            message: "Link not found",
          }
        }

        app.set.status = 200

        return link
      } catch {
        return {
          status: 400,
          message: "Bad Request",
        }
      }
    },
    {
      params: t.Object({
        linkId: t.String({ minLength: 1 }),
      }),
      response: {
        200: t.Object({
          id: t.String(),
          description: t.Nullable(t.String()),
          createdAt: t.Nullable(t.Date(t.String())),
          userId: t.String(),
          title: t.String(),
          url: t.String(),
        }),
        400: t.Object({
          status: t.Literal(400, {
            examples: [400],
          }),
          message: t.String(),
        }),
        401: t.Object({
          status: t.Literal(401, {
            examples: [401],
          }),
          message: t.String(),
        }),
        404: t.Object({
          status: t.Literal(404, {
            examples: [404],
          }),
          message: t.String(),
        }),
      },
      detail: {
        summary: "Get Link by ID",
      },
    }
  )
  .put(
    "/:linkId",
    async (app) => {
      const userId = app.user?.id

      const { title, url, description, tags } = app.body
      const { linkId } = app.params

      if (!userId) {
        app.set.status = 401

        return {
          status: 401,
          message: "Unauthorized Access: User is not authenticated",
        }
      }

      const user = await db.query.user.findFirst({
        where: eq(userTable.id, userId),
      })

      if (!user) {
        app.set.status = 404

        return {
          status: 404,
          message: "User not found",
        }
      }

      if (!title && !url && !description && tags) {
        try {
          const link = await db.query.links.findFirst({
            where: and(
              eq(linksTable.id, linkId),
              eq(linksTable.userId, user.id)
            ),
          })

          if (!link) {
            app.set.status = 404

            return {
              status: 404,
              message: "Link was not found",
            }
          }

          const tagsToAssociate = tags.map((tag) => ({
            linkId: linkId,
            tagId: tag,
          }))

          await db.insert(linksToTagsTable).values(tagsToAssociate)

          app.set.status = 204

          return null
        } catch {
          return {
            status: 400,
            message: "Bad Request",
          }
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
          app.set.status = 404

          return {
            status: 404,
            message: "Link was not found",
          }
        }

        if (tags && tags.length > 0) {
          const tagsToAssociate = tags.map((tag) => ({
            linkId: link?.at(0)?.id as string,
            tagId: tag,
          }))

          try {
            await db.insert(linksToTagsTable).values(tagsToAssociate)
          } catch {
            app.set.status = 400

            return {
              status: 400,
              message: "Failed to associate tags to the link",
            }
          }
        }
        app.set.status = 204

        return null
      } catch {
        return {
          status: 400,
          message: "Bad Request",
        }
      }
    },
    {
      body: t.Object({
        title: t.Optional(
          t.String({
            minLength: 3,
          })
        ),
        url: t.Optional(
          t.String({
            pattern: "^(https?:\\/\\/)?",
            error: "Invalid URL",
          })
        ),
        description: t.Optional(t.String()),
        tags: t.Optional(t.Array(t.String())),
      }),
      response: {
        204: t.Null(),
        400: t.Object({
          status: t.Literal(400, {
            examples: [400],
          }),
          message: t.String(),
        }),
        401: t.Object({
          status: t.Literal(401, {
            examples: [401],
          }),
          message: t.String(),
        }),
        404: t.Object({
          status: t.Literal(404, {
            examples: [404],
          }),
          message: t.String(),
        }),
      },
      detail: {
        summary: "Update Link by ID",
      },
    }
  )
