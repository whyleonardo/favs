"use client"

import { useId } from "react"

import {
  TagCreator,
  TagCreatorCommand,
  TagCreatorCommandTrigger,
  TagCreatorProvider,
} from "@/components/tag-creator"
import { Label } from "@/components/ui/label"

export const FormTagCreator = () => {
  const id = useId()
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor="tags" className="text-s font-semibold">
        Tags
      </Label>

      <TagCreatorProvider>
        <TagCreator>
          <TagCreatorCommandTrigger id={id} />
          <TagCreatorCommand />
        </TagCreator>
      </TagCreatorProvider>
    </div>
  )
}
