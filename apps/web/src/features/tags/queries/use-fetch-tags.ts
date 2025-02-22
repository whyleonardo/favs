import { useQuery } from "@tanstack/react-query"

import { fetchTags } from "@/features/tags/client/fetch-tags"

export const fetchTagsQueryKey = (params?: unknown[]) =>
  ["tags", { url: "GET /api/tags" }, ...(params ? [params] : [])] as const

export const useFetchTags = () => {
  const query = useQuery({
    queryFn: fetchTags,
    queryKey: fetchTagsQueryKey(),
  })

  return query
}
