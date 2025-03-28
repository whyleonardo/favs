"use server"

import { redis } from "@grek/redis"

interface GetLinkViewsCountRequest {
  linkId: string
}

export async function getLinkViewsCount({ linkId }: GetLinkViewsCountRequest) {
  const views = (await redis.hget(`link:${linkId}:stats`, "views")) as string
  const linkViewsCount = views ? Number.parseInt(views, 10) : 0

  return linkViewsCount
}
