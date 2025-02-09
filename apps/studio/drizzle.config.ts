import { dbEnv } from "@solistack/env/db"

import { defineConfig } from "drizzle-kit"

export default defineConfig({
  out: ".next",
  dialect: "postgresql",
  schema: ["../../packages/db/src/schemas"],
  dbCredentials: {
    url: dbEnv.DATABASE_URL,
  },
})
