import { dbEnv } from "@solistack/env/db"

import { defineConfig } from "drizzle-kit"

export default defineConfig({
  out: ".drizzle",
  dialect: "postgresql",
  schema: ["./src/schemas"],
  dbCredentials: {
    url: dbEnv.DATABASE_URL,
  },
})
