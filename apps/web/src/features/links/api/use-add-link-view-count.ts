import { useMutation, useQueryClient } from "@tanstack/react-query"

import {
  type AddLinkViewCountRequest,
  addLinkViewCount,
} from "../services/add-link-view-count"
import { getLinkViewsCountQueryKey } from "./use-get-link-views-count"

export const useAddLinkViewCount = () => {
  const queryClient = useQueryClient()

  const query = useMutation<void, Error, AddLinkViewCountRequest>({
    mutationFn: async ({ linkId }) => await addLinkViewCount({ linkId }),
    onSettled: (_, __, { linkId }) =>
      queryClient.invalidateQueries({
        queryKey: getLinkViewsCountQueryKey(linkId),
      }),
  })

  return query
}
