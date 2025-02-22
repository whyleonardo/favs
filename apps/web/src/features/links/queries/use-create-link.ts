import { useMutation, useQueryClient } from "@tanstack/react-query"

import {
  type CreateLinkRequest,
  createLink,
} from "@/features/links/client/create-link"
import { fetchLinksQueryKey } from "@/features/links/queries/use-fetch-links"

export const createLinkMutationKey = (params?: unknown[]) =>
  ["links", { url: "POST /api/links" }, ...(params ? [params] : [])] as const

export const useCreateLink = () => {
  const queryClient = useQueryClient()

  const query = useMutation<void, Error, CreateLinkRequest>({
    mutationFn: ({ json }) => createLink({ json }),
    mutationKey: fetchLinksQueryKey(),
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: fetchLinksQueryKey() }),
  })

  return query
}
