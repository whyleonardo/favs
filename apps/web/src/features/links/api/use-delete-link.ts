import { useMutation, useQueryClient } from "@tanstack/react-query"

import { fetchLinksQueryKey } from "@/features/links/api/use-fetch-links"
import {
  type DeleteLinkRequest,
  deleteLink,
} from "@/features/links/services/delete-link"

import type { Link } from "../types"

type DeleteLinkContext = {
  previousLinks: Link[]
}

export const deleteLinkMutationKey = (params?: unknown[]) =>
  ["links", { url: "DELETE /api/links" }, ...(params ? [params] : [])] as const

export const useDeleteLink = () => {
  const queryClient = useQueryClient()

  const query = useMutation<void, Error, DeleteLinkRequest, DeleteLinkContext>({
    mutationFn: ({ param }) => deleteLink({ param }),
    mutationKey: deleteLinkMutationKey(),
    onMutate: async ({ param: { linkId } }) => {
      await queryClient.cancelQueries({ queryKey: fetchLinksQueryKey() })
      const previousLinks = queryClient.getQueryData(
        fetchLinksQueryKey()
      ) as Link[]

      queryClient.setQueryData(fetchLinksQueryKey(), (oldLinks: Link[]) =>
        oldLinks.filter((link) => link.id !== linkId)
      )
      return { previousLinks }
    },
    onError: (_, __, context) => {
      if (context?.previousLinks) {
        queryClient.setQueryData(fetchLinksQueryKey(), context.previousLinks)
      }
    },
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: fetchLinksQueryKey() }),
  })

  return query
}
