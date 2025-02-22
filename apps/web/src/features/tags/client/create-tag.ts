import { client } from "@grek/api/rpc"

import { toast } from "sonner"

interface CreateTagParams {
  icon: string
  name: string
}

export async function createTag({ icon, name }: CreateTagParams) {
  const response = await client.api.tags.$post({
    json: {
      icon,
      name,
    },
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

  if (response.status === 201) {
    const data = await response.json()

    return data
  }
}
