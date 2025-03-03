import { client } from "@grek/api/rpc"

import type { InferRequestType, InferResponseType } from "hono"
import { toast } from "sonner"

export type CreateTagRequest = InferRequestType<typeof client.api.tags.$post>
export type CreateTagResponse = InferResponseType<typeof client.api.tags.$post>

export async function createTag({
  json,
}: CreateTagRequest): Promise<CreateTagResponse> {
  const response = await client.api.tags.$post({
    json,
  })

  //@ts-expect-error - missing response type
  if (response.status === 400) {
    toast.error("Bad Request")
  }

  if (response.status === 401) {
    toast.error("Unauthorized!")
  }

  if (response.status === 409) {
    toast.error("Tag already exists!")
  }

  const data = await response.json()

  return data
}
