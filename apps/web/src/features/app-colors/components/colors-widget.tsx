"use client"

import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { ColorsTable } from "@/features/app-colors/components/colors-table"
import type { CSSVariableColorState } from "@/features/app-colors/types"
import { getComputedCSSColorsVariables } from "@/features/app-colors/utils"

import { PaletteIcon } from "lucide-react"

export const ColorsWidget = () => {
  const [cssVariableColors, setCSSVariableColors] = useState<
    CSSVariableColorState[]
  >([])

  useEffect(() => {
    const cssVars = getComputedCSSColorsVariables(document)

    if (cssVars) {
      setCSSVariableColors(cssVars)
    }
  }, [])
  return (
    <Sheet>
      <SheetTrigger
        className="absolute bottom-20 right-4 size-11 rounded-full"
        asChild
      >
        <Button size="icon">
          <PaletteIcon className="size-5" />
        </Button>
      </SheetTrigger>

      <SheetContent className="min-w-[600px]">
        <SheetHeader>
          <SheetTitle>colors</SheetTitle>
          <SheetDescription>
            see all color variables' on the app
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-1.5 p-4">
          <ColorsTable data={cssVariableColors} />
        </div>
      </SheetContent>
    </Sheet>
  )
}
