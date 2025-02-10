import { env } from "@solistack/env/web"

import { type CookiesFn, getCookie } from "cookies-next"
import ky from "ky"

export const api = ky.create({
  prefixUrl: env.NEXT_PUBLIC_API_BASE_URL,
  hooks: {
    beforeRequest: [
      async (request) => {
        let cookieStore: CookiesFn | undefined

        if (typeof window === "undefined") {
          const { cookies: serverCookies } = await import("next/headers")

          cookieStore = serverCookies
        }
        const token = getCookie("favs-app.session_token", {
          cookies: cookieStore,
        })

        if (token) {
          request.headers.set("cookie", `favs-app.session_token=${await token}`)
        }
      },
    ],
  },
})
