"use client"

import { useEffect, useState } from "react"

import { Credenza } from "@/components/ui/credenza"
import { Sheet } from "@/components/ui/sheet"
import { ClipboardHistoryCredenzaContent } from "@/features/clipboard-history/components/credenza/clipboard-history-credenza-content"
import { ClipboardHistorySheetContent } from "@/features/clipboard-history/components/sheet/clipboard-history-sheet-content"
import { ClipboardHistorySheetTrigger } from "@/features/clipboard-history/components/sheet/clipboard-history-sheet-trigger"
import { getClipboard } from "@/features/utils/get-clipboard"
import { useStore } from "@/hooks/use-store"
import { clipboardStore } from "@/store/clipboard-store"

export const Clipboard = () => {
  const [open, setOpen] = useState(true)

  useEffect(() => {
    getClipboard().then((clipboard) => {
      if (clipboard) {
        setOpen(true)
      }
    })
  }, [])

  return (
    <>
      <Sheet>
        <ClipboardHistorySheetTrigger />
        <ClipboardHistorySheetContent />
      </Sheet>

      <Credenza open={open} onOpenChange={setOpen}>
        <ClipboardHistoryCredenzaContent />
      </Credenza>
    </>
  )
}
