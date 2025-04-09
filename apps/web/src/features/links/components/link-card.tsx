import type { ReactNode } from "react"

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"

import { DeleteLinkAction } from "./link-card-context-menu/delete-link-action"

export const LinkCard = ({
  children,
  linkId,
}: {
  children: ReactNode
  linkId: string
}) => {
  return (
    <ContextMenu>
      <ContextMenuTrigger className="h-fit min-h-40 w-full items-center justify-between text-sm font-medium sm:max-w-xs">
        {children}
      </ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <ContextMenuLabel>Actions</ContextMenuLabel>
        <ContextMenuSeparator />

        <DeleteLinkAction linkId={linkId} />
      </ContextMenuContent>
    </ContextMenu>
  )
}
