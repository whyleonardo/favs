import { useQuery } from "@tanstack/react-query"

import { stripeSubscription } from "@grek/auth/client"

export const useGetIsPaidUser = () => {
  const query = useQuery({
    queryKey: ["is-paid-user"],
    queryFn: async () => {
      const list = await stripeSubscription.list()

      if (list.data) {
        return list.data.some((subscription) => subscription.plan === "plus")
      }

      return false
    },
  })

  return {
    isPaidUser: query.data,
    isLoading: query.isLoading,
  }
}
