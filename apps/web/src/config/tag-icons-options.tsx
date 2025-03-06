import type {
  ForwardRefExoticComponent,
  JSX,
  RefAttributes,
  SVGProps,
} from "react"

import { Icons } from "@/components/icons"

import { CodeXmlIcon, type LucideProps, PaletteIcon } from "lucide-react"

export const tagIconsOptions = {
  shadcn: Icons.shadcn,
  design: PaletteIcon,
  devTools: CodeXmlIcon,
}

export type TagIconOption = keyof typeof tagIconsOptions

export type Icon = (
  props: SVGProps<SVGSVGElement>
) =>
  | JSX.Element
  | ForwardRefExoticComponent<
      Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
    >
