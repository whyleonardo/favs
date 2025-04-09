"use client"

import { useState } from "react"

import { AlertDialogTitle } from "@radix-ui/react-alert-dialog"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  ContextMenuItem,
  ContextMenuShortcut,
} from "@/components/ui/context-menu"
import { Typography } from "@/components/ui/typography"

import { useEventListener } from "usehooks-ts"

import { useDeleteLink } from "../../api/use-delete-link"

export const DeleteLinkAction = ({ linkId }: { linkId: string }) => {
  const [openDialog, setOpenDialog] = useState(false)

  const { mutate } = useDeleteLink()

  const onUseShortcut = (event: KeyboardEvent) => {
    if (event.code === "KeyL") {
      setOpenDialog((prev) => !prev)
    }
  }

  const handleDeleteLink = () =>
    mutate(
      {
        param: {
          linkId,
        },
      },
      {
        onSettled: (_, __, { param: { linkId } }) => {
          alert(linkId)
        },
      }
    )

  useEventListener("keypress", onUseShortcut)
  return (
    <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
      <AlertDialogTrigger asChild>
        <ContextMenuItem
          className="text-destructive cursor-pointer"
          onSelect={(e) => e.preventDefault()}
        >
          <Typography variant="p" component="p">
            Delete Link
          </Typography>
          <ContextMenuShortcut>L</ContextMenuShortcut>
        </ContextMenuItem>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteLink}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
