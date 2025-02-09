import { neon } from "@neondatabase/serverless"

import { dbEnv } from "@solistack/env/db"

import { drizzle } from "drizzle-orm/neon-http"

import * as schema from "./schemas"

const client = neon(dbEnv.DATABASE_URL)

export const db = drizzle(client, { schema })
