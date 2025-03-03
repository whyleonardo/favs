import { type ReactNode, useState } from "react"

import { useCreateTag } from "@/features/tags/queries/use-create-tag"
import { useDeleteTag } from "@/features/tags/queries/use-delete-tag"
import { useFetchTags } from "@/features/tags/queries/use-fetch-tags"

import { LucideActivity, LucideAlarmCheck, LucideX } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"

import { Input } from "./ui/input"
import { Skeleton } from "./ui/skeleton"

interface TagContainerProps {
  children: ReactNode
}

const TagInput = () => {
  const { data: tags, isLoading } = useFetchTags()
  const [value, setValue] = useState("")

  const { mutate } = useCreateTag()

  return (
    <>
      <Input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            mutate({
              name: value,
              icon: "new",
            })

            setValue("")
          }
        }}
        placeholder="add tag"
      />

      <div className="flex flex-wrap items-center gap-2">
        {isLoading ? (
          <Skeleton className="h-7 w-28" />
        ) : (
          <AnimatePresence mode="popLayout">
            {tags?.map(({ icon, id, name }) => (
              <Tag key={`${icon}-${name}`}>
                <TagIcon icon={icon} />
                <TagName name={name} />
                <TagAction tagId={id} />
              </Tag>
            ))}
          </AnimatePresence>
        )}
      </div>
    </>
  )
}

const Tag = ({ children }: { children: ReactNode }) => {
  return (
    <motion.div
      className="bg-muted flex items-center gap-1 rounded-sm px-1 py-0.5"
      layout
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.2, type: "spring" }}
    >
      {children}
    </motion.div>
  )
}

const TagIcon = ({ icon }: { icon: string }) => {
  const Icon = icons[icon]

  return (
    <button type="button" className="group cursor-pointer rounded-full p-1">
      <Icon className="size-4 transition group-hover:opacity-75" />
    </button>
  )
}

const TagName = ({ name }: { name: string }) => {
  return <span>{name}</span>
}

const TagAction = ({ tagId }: { tagId: string }) => {
  const { mutate } = useDeleteTag()

  return (
    <button
      onClick={() => mutate({ tagId })}
      type="button"
      className="group cursor-pointer rounded-full p-1"
    >
      <LucideX className="ml-1 size-3.5 transition group-hover:opacity-75" />
    </button>
  )
}

export { TagIcon, Tag, TagAction, TagName, TagInput }
