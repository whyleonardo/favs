import { useMutation, useQueryClient } from "@tanstack/react-query"

import {
  type CreateTagRequest,
  type CreateTagResponse,
  createTag,
} from "@/features/tags/services/create-tag"
import type { Tag } from "@/features/tags/types"

import { toast } from "sonner"

import { fetchTagsQueryKey } from "./use-fetch-tags"

export const createTagMutationKey = (params?: unknown[]) =>
  ["tags", { url: "POST /api/tags" }, ...(params ? [params] : [])] as const

export const useCreateTag = () => {
  const queryClient = useQueryClient()

  const query = useMutation<CreateTagResponse, Error, CreateTagRequest>({
    mutationFn: async ({ json }) => {
      const response = await createTag({ json })

      return response
    },
    mutationKey: createTagMutationKey(),
    onMutate: async ({ json }) => {
      const tag = json

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
    onError: (_, __, ctx) => {
      toast.error("Failed to create new tag")

      const context = ctx as { previousTags: Tag[] }

      queryClient.setQueryData(
        fetchTagsQueryKey(),
        context?.previousTags as Tag[]
      )
    },
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: fetchTagsQueryKey() }),
  })

  return query
}
