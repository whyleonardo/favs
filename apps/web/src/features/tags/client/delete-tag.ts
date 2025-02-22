import { client } from "@grek/api/rpc"

import { toast } from "sonner"

interface CreateTagParams {
  tagId: string
}

export async function deleteTag({ tagId }: CreateTagParams) {
  const response = await client.api.tags[":tagId"].$delete({
    param: {
      tagId,
    },
  })

  if (response.status === 401) {
    toast.error("Unauthorized!")
  }

  if (response.status === 500) {
    console.log(await response.json())
  }
}
