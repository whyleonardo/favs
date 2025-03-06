import { Icons } from "@/components/icons"

import {
  LucideCodeXml,
  IconNode as LucideIcon,
  LucidePalette,
} from "lucide-react"

export const tagIconsOptions = {
  shadcn: Icons.shadcn,
  design: LucidePalette,
  devTools: LucideCodeXml,
} as const

export type TagIconOption = keyof typeof tagIconsOptions

export type IconType = LucideIcon
