"use client"

import NextLink from "next/link"

import { Button } from "@/components/ui/button"
import { CardFooter } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useGetLinkViewsCount } from "@/features/links/api/use-get-link-views-count"

import { ExternalLinkIcon, EyeIcon } from "lucide-react"

import { useAddLinkViewCount } from "../api/use-add-link-view-count"

interface LinkCardFooterProps {
  linkId: string
  linkUrl: string
}

export const LinkCardFooter = ({ linkId, linkUrl }: LinkCardFooterProps) => {
  const { mutate: mutateAddLinkViewCount } = useAddLinkViewCount()

  const { data, isLoading: isLoadingLinkViewsCount } = useGetLinkViewsCount({
    linkId,
  })

  const linkViewsCount = data && data === 1 ? `${data} view` : `${data} views`

  const handleClickOnLink = () => mutateAddLinkViewCount({ linkId })

  return (
    <CardFooter className="bg-muted/50 mt-auto flex items-center justify-between py-4">
      {isLoadingLinkViewsCount ? (
        <Skeleton className="h-3 w-14" />
      ) : (
        <div className="text-muted-foreground flex items-center gap-1 text-xs">
          <EyeIcon className="text-muted-foreground/70 size-3.5" />{" "}
          {linkViewsCount}
        </div>
      )}

      <Button asChild variant="link" onClick={handleClickOnLink}>
        <NextLink href={linkUrl} target="_blank" rel="noopener noreferrer">
          Visit Link
          <ExternalLinkIcon className="ml-1 h-3 w-3" />
        </NextLink>
      </Button>
    </CardFooter>
  )
}
