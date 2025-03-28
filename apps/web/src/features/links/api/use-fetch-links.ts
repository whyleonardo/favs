import { useQuery } from "@tanstack/react-query"

import { fetchLinks } from "@/features/links/services/fetch-links"

export const fetchLinksQueryKey = (params?: unknown[]) =>
  ["links", { url: "GET /api/links" }, ...(params ? [params] : [])] as const

export const useFetchLinks = () => {
  const query = useQuery({
    queryFn: fetchLinks,
    queryKey: fetchLinksQueryKey(),
  })

  return query
}
