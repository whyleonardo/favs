import type { badgeVariants } from "@/components/ui/badge"

import type { VariantProps } from "class-variance-authority"

export type CSSVariableColor = {
  name: string
  value: string
}

export type ComponentPrefix = "sidebar" | "chart" | "common"

export type Colors = NonNullable<VariantProps<typeof badgeVariants>["color"]>

export type CSSVariableColorState = {
  key: ComponentPrefix
  color: CSSVariableColor
}
