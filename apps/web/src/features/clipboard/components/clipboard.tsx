"use client"

import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { Credenza } from "@/components/ui/credenza"
import { CreateNewLinkModal } from "@/features/clipboard/components/modal/create-link-modal"
import { getClipboard } from "@/features/clipboard/utils/get-clipboard"
import { useStore } from "@/hooks/use-store"
import { clipboardStore } from "@/store/clipboard-store"

import { toast } from "sonner"

export const Clipboard = () => {
  const [open, setOpen] = useState(false)
  const useClipboard = useStore(clipboardStore, (state) => state)

  useEffect(() => {
    getClipboard().then((clipboard) => {
      if (clipboard) {
        useClipboard?.setClipboardHistory(clipboard)
      }
      toast.info("we detected a link in your clipboard", {
        className: "font-mono",
        duration: 10000,
        action: (
          <Button
            variant="outline"
            size="sm"
            className="text-xs"
            onClick={() => setOpen(true)}
          >
            create link
          </Button>
        ),
      })
    })
  }, [useClipboard?.setClipboardHistory])

  return (
    <Credenza open={open} onOpenChange={setOpen}>
      <CreateNewLinkModal />
    </Credenza>
  )
}
