import { client } from "@grek/api/rpc"

import type { InferRequestType } from "hono"
import { toast } from "sonner"

export type DeleteLinkRequest = InferRequestType<
  (typeof client.api.links)[":linkId"]["$delete"]
>

export async function deleteLink({ param }: DeleteLinkRequest) {
  const response = await client.api.links[":linkId"].$delete({
    param,
  })

  if (response.status === 401) {
    toast.error("Unauthorized!")
  }

  if (response.status === 500) {
    toast.error("Unexpected Error!")
  }
}
