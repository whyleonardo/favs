"use client"

import { buttonVariants } from "@/components/ui/button"
import { SheetTrigger } from "@/components/ui/sheet"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { LucideClipboard } from "lucide-react"

export const ClipboardHistorySheetTrigger = () => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={200}>
        <TooltipTrigger asChild>
          <SheetTrigger
            className={buttonVariants({
              className: "relative size-14 !min-h-14 !rounded-full",
              variant: "outline",
            })}
          >
            <LucideClipboard className="size-5" />
          </SheetTrigger>
        </TooltipTrigger>

        <TooltipContent>
          <p className="font-normal">clipboard history</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
