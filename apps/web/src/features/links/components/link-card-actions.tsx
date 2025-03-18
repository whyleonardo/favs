"use client"

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

import { Loader2, TrashIcon } from "lucide-react"

import { useDeleteLink } from "../api/use-delete-link"

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

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            tabIndex={-1}
            autoFocus={false}
            size="sm-icon"
            variant="outline"
          >
            <TrashIcon className="text-destructive size-3.5" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="!max-w-[450px]">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>cancel</AlertDialogCancel>
            <Button
              variant="destructive"
              disabled={isPendingDeleteLink}
              onClick={handleDeleteLink}
            >
              delete
              {isPendingDeleteLink && (
                <Loader2 className="size-3.5 animate-spin" />
              )}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
