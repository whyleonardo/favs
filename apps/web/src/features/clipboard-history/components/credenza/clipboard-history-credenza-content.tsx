"use client"

import { useState } from "react"

import { ResizablePanel } from "@/components/resizable-panel"
import {
  CredenzaContent,
  CredenzaHeader,
  CredenzaTitle,
} from "@/components/ui/credenza"
import { createNewLinkSteps } from "@/features/clipboard-history/config/create-new-link-steps"
import { useStore } from "@/hooks/use-store"
import { cn } from "@/lib/utils"
import { clipboardStore } from "@/store/clipboard-store"

export const ClipboardHistoryCredenzaContent = () => {
  const useClipboard = useStore(clipboardStore, (state) => state)
  const [activeStep, setActiveStep] = useState<number>(1)

  return (
    <CredenzaContent className="!w-[1500px]">
      <CredenzaHeader>
        <CredenzaTitle>we detected a link in your clipboard</CredenzaTitle>
      </CredenzaHeader>
      {createNewLinkSteps.map((step) => (
        <div
          key={step.id}
          className={cn(step.index !== activeStep && "hidden")}
        >
          {step.component({ setActiveStep })}
        </div>
      ))}
    </CredenzaContent>
  )
}
