"use client"

import NextLink from "next/link"

import { Button } from "@/components/ui/button"
import { CardFooter } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useGetLinkViewsCount } from "@/features/links/api/use-get-link-views-count"
import { useGetIsPaidUser } from "@/features/payment/queries/use-get-is-paid-user"

import { ExternalLinkIcon, EyeIcon } from "lucide-react"

import { useAddLinkViewCount } from "../api/use-add-link-view-count"

interface LinkCardFooterProps {
  linkId: string
  linkUrl: string
}

export const LinkCardFooter = ({ linkId, linkUrl }: LinkCardFooterProps) => {
  const { mutate: mutateAddLinkViewCount } = useAddLinkViewCount()
  const { isPaidUser, isLoading: isGettingUserSubscription } =
    useGetIsPaidUser()

  const { data, isLoading: isLoadingLinkViewsCount } = useGetLinkViewsCount({
    linkId,
  })

  const linkViewsCount = data && data === 1 ? `${data} view` : `${data} views`

  const handleClickOnLink = () => {
    if (isPaidUser) {
      mutateAddLinkViewCount({ linkId })
    }
  }

  if (!isPaidUser) {
    return (
      <CardFooter className="bg-muted/50 mt-auto flex items-center justify-between py-4">
        <div className="text-muted-foreground flex items-center gap-1 text-xs">
          Get plus to see click count
        </div>

        <Button asChild variant="link" onClick={handleClickOnLink}>
          <NextLink href={linkUrl} target="_blank" rel="noopener noreferrer">
            Visit Link
            <ExternalLinkIcon className="ml-1 h-3 w-3" />
          </NextLink>
        </Button>
      </CardFooter>
    )
  }

  return (
    <CardFooter className="bg-muted/50 mt-auto flex items-center justify-between py-4">
      {isLoadingLinkViewsCount || isGettingUserSubscription ? (
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
