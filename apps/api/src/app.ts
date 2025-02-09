import { cors } from "@elysiajs/cors"
import { swagger } from "@elysiajs/swagger"

import { apiEnv } from "@solistack/env/api"

import { linksController } from "@/http/controllers/links"
import { tagsController } from "@/http/controllers/tags"
import { betterAuthView } from "@/lib/auth-view"

import { Elysia } from "elysia"

export const app = new Elysia()
  .use(
    cors({
      origin: apiEnv.ORIGINS,
      credentials: true,
    })
  )
  .use(
    swagger({
      path: "/docs",
      documentation: {
        info: {
          title: "Favs API",
          description: "Favs API Documentation",
          version: "0.0.1",
        },
        tags: [
          { name: "Links", description: "Links endpoints" },
          { name: "Tags", description: "Tags endpoints" },
        ],
      },
    })
  )
  .all("/api/auth/*", betterAuthView)
  .use(linksController)
  .use(tagsController)
