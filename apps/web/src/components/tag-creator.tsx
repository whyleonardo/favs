"use client"

import {
  type ChangeEvent,
  type ComponentProps,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  createContext,
  memo,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"

import { createId } from "@paralleldrive/cuid2"

import { Button } from "@/components/ui/button"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandList,
} from "@/components/ui/command"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  type Icon,
  type TagIconOption,
  tagIconsOptions,
} from "@/config/tag-icons-options"
import { useCreateTag } from "@/features/tags/api/use-create-tag"
import { useFetchTags } from "@/features/tags/api/use-fetch-tags"
import type { Tag } from "@/features/tags/types"
import { useFieldContext } from "@/lib/form"
import { cn } from "@/lib/utils"

import { Command as CommandPrimitive } from "cmdk"
import { PlusIcon, SearchIcon } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import { useEventListener } from "usehooks-ts"

import { TagButton } from "./tag-button"

interface TagCreatorContext {
  icon: TagIconOption
  setIcon: (newIcon: TagIconOption) => void
  selectedTags: Tag[]
  setSelectedTags: Dispatch<SetStateAction<Tag[]>>
  openCommand: boolean
  setOpenCommand: () => void
}

export const TagCreatorContext = createContext<TagCreatorContext | null>(null)

export const useTagCreator = () => {
  const context = useContext(TagCreatorContext)

  if (!context) {
    throw new Error("useTagCreator must be used within a TagCreatorProvider.")
  }

  return context
}

const TagCreatorProvider = ({ children }: { children: ReactNode }) => {
  const [icon, setIcon] = useState<TagIconOption>("code-xml")

  const [selectedTags, setSelectedTags] = useState<Tag[]>([])
  const [openCommand, _setOpenCommand] = useState(false)

  const setOpenCommand = useCallback(() => {
    _setOpenCommand((oldValue) => !oldValue)
  }, [])

  const contextValue = useMemo(
    () => ({
      icon,
      setIcon,
      selectedTags,
      setSelectedTags,
      openCommand,
      setOpenCommand,
    }),
    [icon, selectedTags, openCommand, setOpenCommand]
  )

  return <TagCreatorContext value={contextValue}>{children}</TagCreatorContext>
}

const TagCreator = memo(({ children }: { children: ReactNode }) => {
  const { selectedTags } = useTagCreator()

  return (
    <div className="flex flex-col justify-between gap-4 rounded border border-dashed px-2 py-4">
      <div className="flex w-full items-center gap-2">{children}</div>

      {selectedTags.length === 0 ? (
        <div className="flex min-h-6 w-full items-center justify-center">
          <p className="text-muted-foreground text-xs font-medium">
            No tags selected
          </p>
        </div>
      ) : (
        <motion.div
          layout
          exit={{ translateY: 120 }}
          className="relative flex min-h-6 max-w-full flex-wrap items-center gap-1.5"
        >
          <AnimatePresence mode="popLayout">
            {selectedTags.map((tag) => (
              <TagButton key={tag.id} tag={tag} onlyRemove className="w-fit" />
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  )
})

const TagCreatorCommand = () => {
  const { selectedTags, openCommand, setOpenCommand } = useTagCreator()
  const field = useFieldContext<string[]>()

  const [tagNameValue, _setTagNameValue] = useState("")

  const setTagNameValue = useCallback(
    (value: string) => _setTagNameValue(value),
    []
  )

  // biome-ignore lint/correctness/useExhaustiveDependencies: pass onChange as effect dep, causes infinite loops on app
  useEffect(() => {
    field.handleChange(selectedTags.map((tag) => tag.id))
  }, [selectedTags])

  return (
    <CommandDialog open={openCommand} onOpenChange={setOpenCommand}>
      <TagCreatorCommandHeader>
        <TagCreatorCommandIconSelectPopover />
        <TagCreatorCommandInput
          name={field.name}
          value={tagNameValue}
          setTagNameValue={setTagNameValue}
          placeholder="search tags or create new one..."
        />
      </TagCreatorCommandHeader>

      <TagCreatorCommandContent
        tagNameValue={tagNameValue}
        setTagNameValue={setTagNameValue}
      />
    </CommandDialog>
  )
}

const TagCreatorCommandTrigger = memo(({ id }: { id?: string }) => {
  const { setOpenCommand } = useTagCreator()

  return (
    <Button
      id={id}
      type="button"
      variant="outline"
      className="text-muted-foreground hover:bg-muted-foreground/5 w-full justify-start text-xs"
      onClick={() => setOpenCommand()}
    >
      <PlusIcon /> Add tags
    </Button>
  )
})

const TagCreatorCommandHeader = ({ children }: { children: ReactNode }) => {
  return (
    <div
      data-slot="command-input-wrapper"
      className="flex h-9 items-center gap-2 border-b px-3"
    >
      {children}
    </div>
  )
}

const TagCreatorCommandIconSelectPopover = () => {
  const [openPopover, setOpenPopover] = useState(false)
  const [filterIconsValue, _setFilterIconsValue] = useState("")

  const { icon, setIcon } = useTagCreator()
  const SelectedIcon = useMemo(
    () => motion.create(tagIconsOptions[icon]),
    [icon]
  )

  const setFilterIconsValue = useCallback(
    (event: ChangeEvent<HTMLInputElement>) =>
      _setFilterIconsValue(event.target.value),
    []
  )

  const icons = Object.entries(tagIconsOptions)
    .reduce(
      (acc, [key, value]) => {
        acc.push({
          name: key as TagIconOption,
          icon: value as Icon,
        })

        return acc
      },
      [] as { name: TagIconOption; icon: Icon }[]
    )
    .filter((icon) =>
      filterIconsValue !== ""
        ? icon.name.toLowerCase().includes(filterIconsValue.toLowerCase())
        : icon
    )

  const onHandleChangeIcon = (iconName: TagIconOption) => {
    return () => {
      setIcon(iconName)
      setOpenPopover(false)
    }
  }

  return (
    <Popover open={openPopover} onOpenChange={setOpenPopover}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="size-8 min-w-8 rounded-full"
        >
          <AnimatePresence>
            <SelectedIcon
              initial={{ opacity: 0, scale: 0.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
            />
          </AnimatePresence>
        </Button>
      </PopoverTrigger>

      <PopoverContent
        className="w-64"
        side="top"
        align="start"
        sideOffset={16}
        alignOffset={-12}
      >
        <div className="relative">
          <Input
            value={filterIconsValue}
            onChange={setFilterIconsValue}
            className="border-muted-foreground/10 peer ps-9 text-xs placeholder:text-xs"
            placeholder="search icon"
            type="text"
          />
          <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
            <SearchIcon className="size-4" aria-hidden="true" />
          </div>
        </div>

        <ScrollArea className="h-fit w-full rounded-md">
          <div className="mt-2 flex flex-wrap gap-2">
            {icons.map(({ icon, name }) => {
              const Icon = icon

              return (
                <TooltipProvider key={name}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full"
                        onClick={onHandleChangeIcon(name)}
                      >
                        {/* @ts-ignore */}
                        <Icon className="stroke-foreground size-4" />
                      </Button>
                    </TooltipTrigger>

                    <TooltipContent side="bottom">{name}</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )
            })}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  )
}

const TagCreatorCommandInput = ({
  className,
  setTagNameValue,
  value,
  ...props
}: ComponentProps<typeof CommandPrimitive.Input> & {
  setTagNameValue: (value: string) => void
}) => {
  const { setSelectedTags, icon } = useTagCreator()

  const { mutate } = useCreateTag()

  const inputRef = useRef<HTMLInputElement>(null)

  const onPressEnterOnInput = (event: KeyboardEvent) => {
    if (event.code === "Enter" && value) {
      const id = createId()

      mutate({
        json: {
          id,
          name: value,
          icon,
        },
      })

      setSelectedTags((prev) => [
        ...prev,
        {
          icon,
          id,
          name: value,
          color: "blue",
        },
      ])

      setTagNameValue("")
    }
  }

  //@ts-expect-error - usehooks-ts strange error
  useEventListener("keydown", onPressEnterOnInput, inputRef)

  return (
    <CommandPrimitive.Input
      ref={inputRef}
      data-slot="command-input"
      value={value}
      onValueChange={setTagNameValue}
      className={cn(
        "placeholder:text-muted-foreground outline-hidden flex h-10 w-full rounded-md bg-transparent py-3 text-sm placeholder:text-sm disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

const TagCreatorCommandContent = ({
  tagNameValue,
  setTagNameValue,
}: {
  tagNameValue: string
  setTagNameValue: (value: string) => void
}) => {
  const { setSelectedTags, icon } = useTagCreator()
  const { mutate } = useCreateTag()

  const { data: existentTags, isLoading: isLoadingExistentTags } =
    useFetchTags()

  const handleAddNewTag = () => {
    const id = createId()

    mutate({
      json: {
        id,
        name: tagNameValue,
        icon,
      },
    })

    setSelectedTags((prev) => [
      ...prev,
      {
        icon,
        id,
        name: tagNameValue,
        color: "blue",
      },
    ])

    setTagNameValue("")
  }

  const showEmpty =
    (existentTags && existentTags.length > 0) || tagNameValue !== ""

  return (
    <CommandList>
      {showEmpty && (
        <CommandEmpty className="p-0">
          <button
            type="button"
            className="hover:bg-muted-foreground/5 inline-flex w-full cursor-pointer items-center gap-2 px-4 py-3 text-start text-sm"
            onClick={handleAddNewTag}
          >
            <span className="text-muted-foreground flex items-center">
              <kbd className="text-muted-foreground/70 mr-2 inline-flex h-5 max-h-full items-center rounded border px-1 font-[inherit] text-[0.625rem] font-medium">
                Enter
              </kbd>
              Create tag
            </span>
            {tagNameValue}
          </button>
        </CommandEmpty>
      )}

      <CommandGroup heading="your tags" className="px-2 py-1">
        <div className="flex flex-row flex-wrap gap-2 p-1">
          {isLoadingExistentTags
            ? Array.from({ length: 3 }).map((_, index) => (
                <TagButton.Skeleton key={index} />
              ))
            : existentTags?.map((tag) => (
                <CommandPrimitive.Item
                  key={tag.id}
                  data-slot="command-item"
                  className="!h-6 !p-0"
                >
                  <TagButton tag={tag} />
                </CommandPrimitive.Item>
              ))}
        </div>

        {existentTags &&
          existentTags.length === 0 &&
          !isLoadingExistentTags && (
            <div className="flex min-h-6 w-full items-center justify-center">
              <p className="text-muted-foreground text-xs font-medium">
                nothing here yet
              </p>
            </div>
          )}
      </CommandGroup>
    </CommandList>
  )
}

export {
  TagCreatorProvider,
  TagCreator,
  TagCreatorCommand,
  TagCreatorCommandTrigger,
  TagCreatorCommandHeader,
  TagCreatorCommandIconSelectPopover,
  TagCreatorCommandInput,
  TagCreatorCommandContent,
}
