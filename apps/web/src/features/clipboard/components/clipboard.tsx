"use client"

import { useEffect, useState } from "react"

import { useQuery } from "@tanstack/react-query"

import { Button } from "@/components/ui/button"
import { Credenza } from "@/components/ui/credenza"
import { CreateNewLinkModal } from "@/features/clipboard/components/modal/create-link-modal"
import { getClipboard } from "@/features/clipboard/utils/get-clipboard"
import { useStore } from "@/hooks/use-store"
import { clipboardStore } from "@/store/clipboard-store"

import { toast } from "sonner"
import { useIsMounted } from "usehooks-ts"

export const Clipboard = () => {
  const [open, setOpen] = useState(false)
  const isMounted = useIsMounted()

  const useClipboard = useStore(clipboardStore, (state) => state)

  const { data: clipboard } = useQuery({
    queryKey: ["clipboard"],
    queryFn: async () => await getClipboard(),
    enabled: isMounted,
  })

  useEffect(() => {
    if (clipboard) {
      useClipboard?.setClipboardHistory(clipboard)

      toast.info("We detected a link in your clipboard", {
        duration: 5000,
        className: "!min-w-[370px] !flex",
        action: (
          <Button
            variant="ghost"
            size="sm"
            className="ml-auto border border-blue-200/60 text-xs hover:bg-transparent dark:border-blue-950/90"
            onClick={() => setOpen(true)}
          >
            Create Link
          </Button>
        ),
      })
    }
  }, [useClipboard?.setClipboardHistory, clipboard])
  return (
    <>
      <Credenza open={open} onOpenChange={setOpen}>
        <CreateNewLinkModal />
      </Credenza>
    </>
  )
}
