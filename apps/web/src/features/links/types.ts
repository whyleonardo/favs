import type { Tag } from "@/features/tags/types"

export type Link = {
  id: string
  createdAt: string | null
  description: string | null
  title: string
  url: string
}

export type LinkWithTags = Link & {
  tags: Tag[]
}
