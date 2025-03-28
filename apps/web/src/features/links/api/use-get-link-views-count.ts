import { useQuery } from "@tanstack/react-query"

import { getLinkViewsCount } from "@/features/links/services/get-link-views-count"

export const getLinkViewsCountQueryKey = (linkId: string) => [
  "link-views-count",
  linkId,
]

export const useGetLinkViewsCount = ({ linkId }: { linkId: string }) => {
  const query = useQuery({
    queryFn: async () => await getLinkViewsCount({ linkId }),
    queryKey: getLinkViewsCountQueryKey(linkId),
  })

  return query
}
