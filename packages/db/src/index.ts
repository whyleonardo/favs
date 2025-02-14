import { dbEnv } from "@grek/env/db"
import { neon } from "@neondatabase/serverless"

import { drizzle } from "drizzle-orm/neon-http"

import * as schema from "./schemas"

const client = neon(dbEnv.DATABASE_URL)

export const db = drizzle(client, { schema })
