import { apiEnv } from "@solistack/env/api"

import { app } from "@/app"

app.listen(
  {
    port: apiEnv.PORT,
  },
  () =>
    console.log(
      `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
    )
)
