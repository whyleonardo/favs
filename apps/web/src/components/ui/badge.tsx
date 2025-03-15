import type * as React from "react"

import { Slot } from "@radix-ui/react-slot"

import { cn } from "@/lib/utils"

import { type VariantProps, cva } from "class-variance-authority"

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border font-medium w-fit whitespace-nowrap shrink-0  gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-auto",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive:
          "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40",
        outline:
          "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
      },
      color: {
        red: "bg-red-50 text-red-400 border-red-200 dark:bg-red-950 dark:text-red-500 dark:border-red-900",
        orange:
          "bg-orange-50 text-orange-400 border-orange-200 dark:bg-orange-950 dark:text-orange-500 dark:border-orange-900",
        amber:
          "bg-amber-50 text-amber-400 border-amber-200 dark:bg-amber-950 dark:text-amber-500 dark:border-amber-900",
        yellow:
          "bg-yellow-50 text-yellow-400 border-yellow-200 dark:bg-yellow-950 dark:text-yellow-500 dark:border-yellow-900",
        lime: "bg-lime-50 text-lime-400 border-lime-200 dark:bg-lime-950 dark:text-lime-500 dark:border-lime-900",
        green:
          "bg-green-50 text-green-400 border-green-200 dark:bg-green-950 dark:text-green-500 dark:border-green-900",
        emerald:
          "bg-emerald-50 text-emerald-400 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-500 dark:border-emerald-900",
        teal: "bg-teal-50 text-teal-400 border-teal-200 dark:bg-teal-950 dark:text-teal-500 dark:border-teal-900",
        cyan: "bg-cyan-50 text-cyan-400 border-cyan-200 dark:bg-cyan-950 dark:text-cyan-500 dark:border-cyan-900",
        sky: "bg-sky-50 text-sky-400 border-sky-200 dark:bg-sky-950 dark:text-sky-500 dark:border-sky-900",
        blue: "bg-blue-50 text-blue-400 border-blue-200 dark:bg-blue-950 dark:text-blue-500 dark:border-blue-900",
        indigo:
          "bg-indigo-50 text-indigo-400 border-indigo-200 dark:bg-indigo-950 dark:text-indigo-500 dark:border-indigo-900",
        violet:
          "bg-violet-50 text-violet-400 border-violet-200 dark:bg-violet-950 dark:text-violet-500 dark:border-violet-900",
        purple:
          "bg-purple-50 text-purple-400 border-purple-200 dark:bg-purple-950 dark:text-purple-500 dark:border-purple-900",
        fuchsia:
          "bg-fuchsia-50 text-fuchsia-400 border-fuchsia-200 dark:bg-fuchsia-950 dark:text-fuchsia-500 dark:border-fuchsia-900",
        pink: "bg-pink-50 text-pink-400 border-pink-200 dark:bg-pink-950 dark:text-pink-500 dark:border-pink-900",
        rose: "bg-rose-50 text-rose-400 border-rose-200 dark:bg-rose-950 dark:text-rose-500 dark:border-rose-900",
      },
      size: {
        default: "px-2 py-0.5 text-xs [&>svg]:size-3",
        xs: "px-1.5 py-0.5 text-xs [&>svg]:size-2.5",
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
