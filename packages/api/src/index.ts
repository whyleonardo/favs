import { OpenAPIHono } from "@hono/zod-openapi"
import { apiReference } from "@scalar/hono-api-reference"

import { showRoutes } from "hono/dev"

import { authRoute } from "./http/routes/auth"
import { createLink } from "./http/routes/links/create-link"
import { deleteLink } from "./http/routes/links/delete-link"
import { fetchLinks } from "./http/routes/links/fetch-links"
import { getLinkById } from "./http/routes/links/get-link-by-id"
import { updateLink } from "./http/routes/links/update-link"
import { createTag } from "./http/routes/tags/create-tag"
import { fetchTags } from "./http/routes/tags/fetch-tags"

export const honoApp = new OpenAPIHono().basePath("/api")

showRoutes(honoApp)

honoApp.doc("/openapi.json", {
  openapi: "3.1.0",
  info: { version: "1.0.0", title: "Grek API" },
})

honoApp.get(
  "/docs",
  apiReference({
    spec: { url: "/api/openapi.json" },
    pageTitle: "Grek API",
    theme: "bluePlanet",
  })
)

const routes = honoApp
  .route("/auth", authRoute)
  .route("/links", createLink)
  .route("/links", fetchLinks)
  .route("/links", deleteLink)
  .route("/links", getLinkById)
  .route("/links", updateLink)
  .route("/tags", createTag)
  .route("/tags", fetchTags)

export type AppType = typeof routes
