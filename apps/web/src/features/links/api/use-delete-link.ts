import { useMutation, useQueryClient } from "@tanstack/react-query"

import { fetchLinksQueryKey } from "@/features/links/api/use-fetch-links"
import {
  type DeleteLinkRequest,
  deleteLink,
} from "@/features/links/services/delete-link"

export const deleteLinkMutationKey = (params?: unknown[]) =>
  ["links", { url: "DELETE /api/links" }, ...(params ? [params] : [])] as const

export const useDeleteLink = () => {
  const queryClient = useQueryClient()

  const query = useMutation<void, Error, DeleteLinkRequest>({
    mutationFn: ({ param }) => deleteLink({ param }),
    mutationKey: deleteLinkMutationKey(),
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: fetchLinksQueryKey() }),
  })

  return query
}
