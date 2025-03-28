import type * as React from "react"

import { Slot } from "@radix-ui/react-slot"

import { cn } from "@/lib/utils"

import { type VariantProps, cva } from "class-variance-authority"

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md font-medium w-fit whitespace-nowrap shrink-0 gap-1 [&>svg]:pointer-events-none focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 transition-[color,box-shadow] overflow-auto",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary:
          "bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive:
          "bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40",
        outline:
          "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
        tag: "rounded-full font-medium select-none",
      },
      color: {
        red: "bg-red-100 text-red-500 dark:bg-red-950 stroke-red-500",
        orange:
          "bg-orange-100 text-orange-500 dark:bg-orange-950 stroke-orange-500",
        amber: "bg-amber-100 text-amber-500 dark:bg-amber-950 stroke-amber-500",
        yellow:
          "bg-yellow-100 text-yellow-500 dark:bg-yellow-950 stroke-yellow-500",
        lime: "bg-lime-100 text-lime-500 dark:bg-lime-950 stroke-lime-500",
        green: "bg-green-100 text-green-500 dark:bg-green-950 stroke-green-500",
        emerald:
          "bg-emerald-100 text-emerald-500 dark:bg-emerald-950 stroke-emerald-500",
        teal: "bg-teal-100 text-teal-500 dark:bg-teal-950 stroke-teal-500",
        cyan: "bg-cyan-100 text-cyan-500 dark:bg-cyan-950 stroke-cyan-500",
        sky: "bg-sky-100 text-sky-500 dark:bg-sky-950 stroke-sky-500",
        blue: "bg-blue-100 text-blue-500 dark:bg-blue-950 stroke-blue-500",
        indigo:
          "bg-indigo-100 text-indigo-500 dark:bg-indigo-950 stroke-indigo-500",
        violet:
          "bg-violet-100 text-violet-500 dark:bg-violet-950 stroke-violet-500",
        purple:
          "bg-purple-100 text-purple-500 dark:bg-purple-950 stroke-purple-500",
        fuchsia:
          "bg-fuchsia-100 text-fuchsia-500 dark:bg-fuchsia-950 stroke-fuchsia-500",
        pink: "bg-pink-100 text-pink-500 dark:bg-pink-950 stroke-pink-500",
        rose: "bg-rose-100 text-rose-500 dark:bg-rose-950 stroke-rose-500",
      },
      size: {
        default: "px-2 py-0.5 text-xs [&>svg]:size-3",
        xs: "px-1.5 py-0.5 text-xs [&>svg]:size-2.5",
        tag: "px-3 py-1 text-xs",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Badge({
  className,
  variant,
  color,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant, color, size }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
