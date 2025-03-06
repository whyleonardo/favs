"use client"

// import { LinkCard } from "@/features/links/components/link-card"
import { useFetchLinks } from "@/features/links/queries/use-fetch-links"

export const LinksContainer = () => {
  const { data: links } = useFetchLinks()

  return (
    <div className="mx-auto flex max-w-screen-lg flex-wrap gap-4 px-4">
      {links?.map((link) => <div key={link.id}>hey </div>)}
    </div>
  )
}
