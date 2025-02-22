import { useMutation, useQueryClient } from "@tanstack/react-query"

import { createTag } from "@/features/tags/client/create-tag"
import type { Tag } from "@/features/tags/types"

import { toast } from "sonner"

import { fetchTagsQueryKey } from "./use-fetch-tags"

export const createTagMutationKey = (params?: unknown[]) =>
  ["tags", { url: "POST /api/tags" }, ...(params ? [params] : [])] as const

export const useCreateTag = () => {
  const queryClient = useQueryClient()

  const query = useMutation({
    mutationFn: ({ icon, name }: { icon: string; name: string }) =>
      createTag({ icon, name }),
    mutationKey: createTagMutationKey(),
    onMutate: async (tag) => {
      await queryClient.cancelQueries({ queryKey: fetchTagsQueryKey() })

      const previousTags = queryClient.getQueryData(
        fetchTagsQueryKey()
      ) as Tag[]

      queryClient.setQueryData(fetchTagsQueryKey(), (previousTags: Tag[]) => [
        ...previousTags,
        tag,
      ])

      return { previousTags }
    },
    onError: (_, __, context) => {
      toast.error("Failed to create new tag")

      queryClient.setQueryData(fetchTagsQueryKey(), context?.previousTags)
    },
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: fetchTagsQueryKey() }),
  })

  return query
}
