import { client } from "@grek/api/rpc"

import type { InferRequestType } from "hono"
import { toast } from "sonner"

export type CreateLinkRequest = InferRequestType<typeof client.api.links.$post>

export async function createLink({ json }: CreateLinkRequest) {
  const response = await client.api.links.$post({
    json,
  })

  if (response.status === 401) {
    toast.error("Unauthorized!")
  }

  if (response.status === 409) {
    toast.error("Link already exists!")
  }
}
