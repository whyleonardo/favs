"use client"

import {
  MorphingDialog,
  MorphingDialogClose,
  MorphingDialogContainer,
  MorphingDialogContent,
  MorphingDialogDescription,
  MorphingDialogSubtitle,
  MorphingDialogTitle,
  MorphingDialogTrigger,
} from "@/components/motion/morphing-dialog"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { type TagIconOption, tagIconsOptions } from "@/config/tag-icons-options"

// import { formatDate } from "@/utils/format-date"

interface LinkCardProps {
  link: {
    id: string
    createdAt: string | null
    tags: {
      id: string
      name: string
      icon: string
    }[]
    description: string | null
    title: string
    url: string
  }
}

export const LinkCard = ({ link }: LinkCardProps) => {
  const linkContainTags = link.tags.length > 0

  return (
    <MorphingDialog
      transition={{
        type: "spring",
        bounce: 0.05,
        duration: 0.25,
      }}
    >
      <MorphingDialogTrigger
        style={{
          borderRadius: "12px",
        }}
        className="min-h-[50px] min-w-[300px] flex-1 flex-col overflow-hidden border"
      >
        {/* <MorphingDialogImage
          src="/eb-27-lamp-edouard-wilfrid-buquet.jpg"
          alt="A desk lamp designed by Edouard Wilfrid Buquet in 1925. It features a double-arm design and is made from nickel-plated brass, aluminium and varnished wood."
          className="h-48 w-full object-cover"
        /> */}

        <div className="flex grow flex-row justify-between gap-3 px-3 py-2">
          <div>
            <MorphingDialogTitle>{link.title}</MorphingDialogTitle>
            <MorphingDialogSubtitle className="text-muted-foreground text-xs">
              New Date
            </MorphingDialogSubtitle>
          </div>

          {linkContainTags && (
            <div className="flex items-start gap-1">
              {link.tags.map((tag) => {
                const Icon = tagIconsOptions[tag.icon as TagIconOption]

                return (
                  <TooltipProvider key={tag.id}>
                    <Tooltip>
                      <TooltipTrigger>
                        <Badge
                          key={tag.id}
                          variant="secondary"
                          className="flex size-5 items-center gap-1 overflow-hidden rounded-sm p-0.5"
                        >
                          <Icon className="text-foreground !size-4" />
                        </Badge>
                      </TooltipTrigger>

                      <TooltipContent>{tag.name}</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )
              })}
            </div>
          )}
        </div>
      </MorphingDialogTrigger>

      <MorphingDialogContainer>
        <MorphingDialogContent
          style={{
            borderRadius: "24px",
          }}
          className="pointer-events-auto relative flex h-auto w-full flex-col overflow-hidden border p-4 sm:w-[500px]"
        >
          {/* <MorphingDialogImage
            src="/eb-27-lamp-edouard-wilfrid-buquet.jpg"
            alt="A desk lamp designed by Edouard Wilfrid Buquet in 1925. It features a double-arm design and is made from nickel-plated brass, aluminium and varnished wood."
            className="h-full w-full"
          /> */}
          <div className="p-4">
            <MorphingDialogTitle className="text-2xl">
              {link.title}
            </MorphingDialogTitle>

            <MorphingDialogSubtitle className="text-muted-foreground">
              <a
                className="inline-flex text-teal-500 underline"
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.url}
              </a>
            </MorphingDialogSubtitle>

            <MorphingDialogDescription
              disableLayoutAnimation
              variants={{
                initial: { opacity: 0, scale: 0.8, y: 100 },
                animate: { opacity: 1, scale: 1, y: 0 },
                exit: { opacity: 0, scale: 0.8, y: 100 },
              }}
            >
              <p className="text-muted-foreground/80 mt-2">
                {link.description}
              </p>
            </MorphingDialogDescription>

            {linkContainTags && (
              <>
                <Separator className="bg-muted-foreground/5 my-4" />

                <div>
                  {link.tags.map((tag) => {
                    const Icon = tagIconsOptions[tag.icon as TagIconOption]

                    return (
                      <Badge
                        key={tag.id}
                        variant="secondary"
                        className="flex items-center gap-1 rounded-sm"
                      >
                        <Icon className="text-foreground !size-3" />
                        {tag.name}
                      </Badge>
                    )
                  })}
                </div>
              </>
            )}
          </div>

          <MorphingDialogClose className="cursor-pointer" />
        </MorphingDialogContent>
      </MorphingDialogContainer>
    </MorphingDialog>
  )
}
