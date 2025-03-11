"use client"

import { useFetchLinks } from "@/features/links/api/use-fetch-links"
import { LinkCard } from "@/features/links/components/link-card"

export const LinksContainer = () => {
  const { data: links } = useFetchLinks()

  return (
    <div className="mx-auto flex max-w-screen-lg flex-wrap gap-4 px-4">
      {links?.map((link) => <LinkCard key={link.id} link={link} />)}
    </div>
  )
}
