import type { ComponentProps } from "react"

import { cn } from "@/lib/utils"

import { type VariantProps, cva } from "class-variance-authority"

export const typographyVariants = cva("tracking-tight", {
  variants: {
    variant: {
      h1: "scroll-m-20 text-4xl font-extrabold lg:text-5xl",
      h2: "scroll-m-20 text-3xl font-semibold first:mt-0",
      h3: "scroll-m-20 text-2xl font-semibold",
      h4: "scroll-m-20 text-xl font-semibold",
      p: "leading-7 [&:not(:first-child)]:mt-6",
      blockquote: "mt-6 border-l-2 pl-6 italic",
      list: "my-6 ml-6 list-disc [&>li]:mt-2",
      "inline-code":
        "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
      lead: "text-xl text-muted-foreground",
      large: "text-lg font-semibold",
      small: "text-sm font-medium leading-none",
      muted: "text-sm text-muted-foreground",
    },
  },
})

type TypographyProps = {
  component?: "h1" | "h2" | "h3" | "h4" | "p" | "blockquote" | "ul" | "code"
  className?: string
} & VariantProps<typeof typographyVariants> &
  ComponentProps<"h1"> &
  ComponentProps<"h2"> &
  ComponentProps<"h3"> &
  ComponentProps<"h4"> &
  ComponentProps<"p"> &
  ComponentProps<"blockquote"> &
  ComponentProps<"ul"> &
  ComponentProps<"code">

export const Typography = ({
  variant = "p",
  component = "p",
  className,
  ...props
}: TypographyProps) => {
  const Comp = component

  return (
    <Comp
      className={cn(
        typographyVariants({
          variant,
          className,
        })
      )}
      {...props}
    />
  )
}
