import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Typography } from "@/components/ui/typography"
import { type TagIconOption, tagIconsOptions } from "@/config/tag-icons-options"
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
          <Typography component="p" variant="muted">
            {link.description}
          </Typography>
        )}

        {linkContainTags && (
          <div className="mt-2 flex flex-wrap gap-2">
            {link.tags.map((tag, index) => {
              const Icon = tagIconsOptions[tag.icon as TagIconOption]

              const tagColor = tag.color

              return (
                <Badge
                  key={tag.id}
                  variant="tag"
                  size="tag"
                  color={tagColor}
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
