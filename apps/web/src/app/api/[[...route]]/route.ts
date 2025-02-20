import { honoApp } from "@grek/api"

import { handle } from "hono/vercel"

export const GET = handle(honoApp)
export const POST = handle(honoApp)
export const OPTIONS = handle(honoApp)
export const DELETE = handle(honoApp)
export const PUT = handle(honoApp)
