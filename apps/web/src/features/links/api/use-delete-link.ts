import { useMutation, useQueryClient } from "@tanstack/react-query"

import { fetchLinksQueryKey } from "@/features/links/api/use-fetch-links"
import {
  type DeleteLinkRequest,
  deleteLink,
} from "@/features/links/http/delete-link"

export const createLinkMutationKey = (params?: unknown[]) =>
  ["links", { url: "POST /api/links" }, ...(params ? [params] : [])] as const

export const useDeleteLink = () => {
  const queryClient = useQueryClient()

  const query = useMutation<void, Error, DeleteLinkRequest>({
    mutationFn: ({ param }) => deleteLink({ param }),
    mutationKey: fetchLinksQueryKey(),
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: fetchLinksQueryKey() }),
  })

  return query
}
