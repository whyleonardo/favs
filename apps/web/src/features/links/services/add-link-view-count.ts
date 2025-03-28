"use server"

import { redis } from "@grek/redis"

export interface AddLinkViewCountRequest {
  linkId: string
}

export async function addLinkViewCount({ linkId }: AddLinkViewCountRequest) {
  await redis.hincrby(`link:${linkId}:stats`, "views", 1)
}
