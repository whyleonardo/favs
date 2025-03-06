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
  design: BrushIcon,
  colors: PaletteIcon,
  devTools: CodeXmlIcon,
  images: ImageIcon,
  icons: ConeIcon,
  "ui-references": PanelsTopLeftIcon,
  shadcn: Icons.shadcn,
  oss: PackageOpenIcon,
  fonts: CaseLowerIcon,
}

export type TagIconOption = keyof typeof tagIconsOptions

export type Icon = (
  props: SVGProps<SVGSVGElement>
) =>
  | JSX.Element
  | ForwardRefExoticComponent<
      Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
    >
