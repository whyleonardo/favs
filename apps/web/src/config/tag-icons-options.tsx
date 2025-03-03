import type {
  ForwardRefExoticComponent,
  JSX,
  RefAttributes,
  SVGProps,
} from "react"

import { Icons } from "@/components/icons"

import { LucideCodeXml, LucidePalette, type LucideProps } from "lucide-react"

export const tagIconsOptions = {
  shadcn: Icons.shadcn,
  design: LucidePalette,
  devTools: LucideCodeXml,
} as const

export type TagIconOption = keyof typeof tagIconsOptions

export type IconType = (
  props: SVGProps<SVGSVGElement>
) =>
  | JSX.Element
  | ForwardRefExoticComponent<
      Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
    >
