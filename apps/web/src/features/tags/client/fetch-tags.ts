import { client } from "@grek/api/rpc"

import { toast } from "sonner"

export async function fetchTags() {
  const response = await client.api.tags.$get()

  if (response.status === 401) {
    toast.error("Unauthorized!")
  }

  if (response.status === 200) {
    const data = await response.json()

    return data
  }
}
