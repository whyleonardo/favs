import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { type TagIconOption, tagIconsOptions } from "@/config/tag-icons-options"
import { COLORS } from "@/features/app-colors/utils"
import type { LinkWithTags } from "@/features/links/types"
import { cn } from "@/lib/utils"
import { formatDate } from "@/utils/format-date"
import { getUrlDomain } from "@/utils/get-url-domain"

import { Calendar } from "lucide-react"

import { LinkCardFooter } from "./link-card-footer"

interface LinkCardProps {
  link: LinkWithTags
}

export const LinkCardContent = ({ link }: LinkCardProps) => {
  const linkContainTags = link.tags && !!link.tags.length

  return (
    <Card className="size-full">
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle className="dark:text-foreground line-clamp-2 text-xl font-bold">
            {link.title}
          </CardTitle>
        </div>

        <CardDescription className="text-muted-foreground flex items-center text-sm">
          <span className="flex items-center">
            <Calendar className="mr-1 size-3" />
            {formatDate(String(link.createdAt))}
          </span>
          <span className="mx-2">•</span>
          <span className="truncate">{getUrlDomain(link.url)}</span>
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col justify-between">
        {link.description && (
          <p className="text-muted-foreground dark:text-muted-foreground/90 line-clamp-3 text-sm">
            {link.description}
          </p>
        )}

        {linkContainTags && (
          <div className="mt-2 flex flex-wrap gap-2">
            {link.tags.map((tag, index) => {
              const Icon = tagIconsOptions[tag.icon as TagIconOption]

              const randomColor = Math.ceil(Math.random() * COLORS.length)

              return (
                <Badge
                  key={tag.id}
                  variant="tag"
                  size="tag"
                  color={COLORS[randomColor]}
                  className={cn(index > 2 && "hidden")}
                >
                  <Icon className="mr-1 size-3" />
                  {tag.name}
                </Badge>
              )
            })}
          </div>
        )}
      </CardContent>

      <LinkCardFooter linkId={link.id} linkUrl={link.url} />
    </Card>
  )
}
