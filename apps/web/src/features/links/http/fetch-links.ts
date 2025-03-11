import { client } from "@grek/api/rpc"

import { toast } from "sonner"

export async function fetchLinks() {
  const response = await client.api.links.$get()

  if (response.status === 401) {
    toast.error("Unauthorized!")
  }

  if (response.status === 200) {
    const data = await response.json()

    return data
  }
}
