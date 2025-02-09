import { db } from "@solistack/db"
import { user as userTable } from "@solistack/db/schemas"
import { tags as tagsTable } from "@solistack/db/schemas"

import { UnexpectedError } from "@/http/_errors/unexpected-error"
import { userMiddleware } from "@/http/middlewares/auth"

import { eq } from "drizzle-orm"
import { Elysia, t } from "elysia"

export const tagsController = new Elysia({
  prefix: "/tags",
  detail: {
    tags: ["Tags"],
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

      const { name, icon } = app.body

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

        if (!tag.at(0)) {
          app.set.status = 404

          return {
            status: 404,
            message: "Tag was not found",
          }
        }

        app.set.status = 200

        return {
          tagId: tag.at(0)?.id as string,
        }
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
        name: t.String({
          minLength: 3,
        }),
        icon: t.String(),
      }),
      response: {
        200: t.Object({
          tagId: t.String(),
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
        409: t.Object({
          status: t.Literal(409, {
            examples: [409],
          }),
          message: t.String(),
        }),
      },
      detail: {
        summary: "Create New Tag",
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
        const tags = await db.query.tags.findMany({
          columns: {
            id: true,
            name: true,
            icon: true,
          },
          where: eq(tagsTable.userId, user.id),
        })

        app.set.status = 200

        return tags
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
            name: t.String(),
            icon: t.String(),
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
          status: t.Number(t.Literal(404)),
          message: t.String(),
        }),
      },
      detail: {
        summary: "Get All Tags",
      },
    }
  )
