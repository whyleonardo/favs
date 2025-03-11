import { useMutation, useQueryClient } from "@tanstack/react-query"

import { deleteTag } from "@/features/tags/http/delete-tag"
import type { Tag } from "@/features/tags/types"

import { toast } from "sonner"

import { fetchTagsQueryKey } from "./use-fetch-tags"

export const deleteTagMutationKey = (params?: unknown[]) =>
  ["tags", { url: "DELETE /api/tags" }, ...(params ? [params] : [])] as const

export const useDeleteTag = () => {
  const queryClient = useQueryClient()

  const query = useMutation({
    mutationFn: ({ tagId }: { tagId: string }) => deleteTag({ tagId }),
    mutationKey: deleteTagMutationKey(),
    onMutate: async ({ tagId }) => {
      await queryClient.cancelQueries({ queryKey: fetchTagsQueryKey() })

      const previousTags = queryClient.getQueryData(
        fetchTagsQueryKey()
      ) as Tag[]

      queryClient.setQueryData(fetchTagsQueryKey(), (previousTags: Tag[]) => {
        return previousTags.filter((previousTag) => previousTag.id !== tagId)
      })

      return { previousTags }
    },
    onError: (_, __, context) => {
      toast.error("Failed to delete tag")

      queryClient.setQueryData(fetchTagsQueryKey(), context?.previousTags)
    },
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: fetchTagsQueryKey() }),
  })

  return query
}
