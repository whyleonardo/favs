import { headers } from "next/headers"

import { auth } from "@grek/auth"

export const getIsPaidUser = async () => {
  const list = await auth.api.listActiveSubscriptions({
    headers: await headers(),
  })

  return list.some((subscription) => subscription.plan === "plus")
}
