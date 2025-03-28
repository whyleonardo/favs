"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useDeleteLink } from "@/features/links/api/use-delete-link"

import { Loader2, MoreVerticalIcon, TrashIcon } from "lucide-react"

interface LinkCardActionsProps {
  linkId: string
}

export const LinkCardActions = ({ linkId }: LinkCardActionsProps) => {
  const { mutate: mutateDeleteLink, isPending: isPendingDeleteLink } =
    useDeleteLink()

  const handleDeleteLink = () => {
    mutateDeleteLink({
      param: {
        linkId,
      },
    })
  }

  return (
    <div className="flex items-center gap-1">
      {/* <Button tabIndex={-1} size="sm-icon" variant="ghost">
        <PencilIcon className="size-3.5" />
      </Button> */}

      <Button
        size="sm-icon"
        variant="ghost"
        className="text-muted-foreground opacity-40 transition-opacity hover:opacity-100"
        disabled={isPendingDeleteLink}
        onClick={handleDeleteLink}
      >
        {isPendingDeleteLink ? (
          <Loader2 className="size-3.5 animate-spin" />
        ) : (
          <TrashIcon className="text-destructive size-3.5" />
        )}
      </Button>
    </div>
  )
}
