"use client"

import { useFetchLinks } from "@/features/links/api/use-fetch-links"
import { LinkCard } from "@/features/links/components/link-card"
import { LinkCardContent } from "@/features/links/components/link-card-content"

export const LinksContainer = () => {
  const { data: links } = useFetchLinks()

  return (
    <div className="max-w-8xl mx-auto flex flex-wrap items-center justify-center gap-4 px-2 sm:px-0">
      {links?.map((link) => (
        <LinkCard key={link.id} linkId={link.id}>
          <LinkCardContent link={link} />
        </LinkCard>
      ))}
    </div>
  )
}
