import { badgeVariants } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { type TagIconOption, tagIconsOptions } from "@/config/tag-icons-options"
import type { Tag } from "@/features/tags/types"
import { cn } from "@/lib/utils"

import { Command as CommandPrimitive } from "cmdk"
import { motion } from "motion/react"

import { useTagCreator } from "./testing"

interface CommandTagItemProps {
  tag: Tag
  onlyRemove?: boolean
  classNameContainer?: string
}

export const CommandTagItem = ({
  tag,
  onlyRemove,
  classNameContainer,
}: CommandTagItemProps) => {
  const { selectedTags, setSelectedTags } = useTagCreator()

  const Icon = tagIconsOptions[tag.icon as TagIconOption]

  const tagIsSelected = !!selectedTags.find(
    (selectedTag) => selectedTag.id === tag.id
  )

  const onClick = () => {
    if (onlyRemove) {
      setSelectedTags((previousTags) =>
        previousTags.filter((previousTag) => previousTag.id !== tag.id)
      )

      return
    }

    tagIsSelected
      ? setSelectedTags((previousTags) =>
          previousTags.filter((previousTag) => previousTag.id !== tag.id)
        )
      : setSelectedTags((prev) => [
          ...prev,
          { icon: tag.icon, id: tag.id, name: tag.name },
        ])
  }

  return (
    <CommandPrimitive.Item
      key={tag.id}
      data-slot="command-item"
      className="!h-6 !p-0"
    >
      <motion.button
        type="button"
        className={badgeVariants({
          variant: tagIsSelected ? "default" : "outline",
          className: cn(
            "inline-flex w-full cursor-pointer items-center !px-2 !py-0.5 !transition-colors",
            classNameContainer
          ),
        })}
        onClick={onClick}
        initial={{ opacity: 0, scale: 0.1 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5 }}
      >
        <Icon
          className={cn(
            "!size-4",
            tagIsSelected ? "stroke-background" : "stroke-foreground"
          )}
        />
        {tag.name}
      </motion.button>
    </CommandPrimitive.Item>
  )
}

CommandTagItem.Skeleton = () => {
  const MotionSkeleton = motion.create(Skeleton)

  return (
    <MotionSkeleton
      className="h-6 w-20"
      initial={{ opacity: 0, scale: 0.1 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
    />
  )
}
