import type {
  ForwardRefExoticComponent,
  JSX,
  RefAttributes,
  SVGProps,
} from "react"

import { Icons } from "@/components/icons"

import {
  BrushIcon,
  CaseLowerIcon,
  CodeXmlIcon,
  ConeIcon,
  ImageIcon,
  type LucideProps,
  PackageOpenIcon,
  PaletteIcon,
  PanelsTopLeftIcon,
} from "lucide-react"

export const tagIconsOptions = {
  brush: BrushIcon,
  palette: PaletteIcon,
  "code-xml": CodeXmlIcon,
  image: ImageIcon,
  cone: ConeIcon,
  panels: PanelsTopLeftIcon,
  shadcn: Icons.shadcn,
  "package-open": PackageOpenIcon,
  "case-lower": CaseLowerIcon,
} as const

export type TagIconOption = keyof typeof tagIconsOptions

export type Icon = (
  props: SVGProps<SVGSVGElement>
) =>
  | JSX.Element
  | ForwardRefExoticComponent<
      Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
    >
