import { type ComponentProps, createContext, useContext } from "react"

import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"

import { X } from "lucide-react"

interface TagContextValue {
  icon: string
  label: string
  onIconChange?: (icon: string) => void
  onDelete?: () => void
}

const TagContext = createContext<TagContextValue | null>(null)

const useTagContext = () => {
  const context = useContext(TagContext)

  if (!context) {
    throw new Error("Tag compound components must be used within Tag.Root")
  }
  return context
}

interface TagRootProps extends ComponentProps<"div"> {
  icon: string
  label: string
  onIconChange?: (icon: string) => void
  onDelete?: () => void
}

interface TagIconProps extends ComponentProps<"span"> {
  icons?: string[]
}

interface TagLabelProps extends ComponentProps<"span"> {}
interface TagDeleteProps extends ComponentProps<"button"> {}

// Root component
const TagRoot = ({
  icon,
  label,
  onIconChange,
  onDelete,
  className,
  ...props
}: TagRootProps) => {
  return (
    <TagContext.Provider value={{ icon, label, onIconChange, onDelete }}>
      <div
        className={cn(
          "flex items-center gap-1 rounded-full border px-3 py-1",
          className
        )}
        {...props}
      >
        {props.children}
      </div>
    </TagContext.Provider>
  )
}

// Icon component with popover
const TagIcon = ({
  icons = ["🏷️", "⭐", "🎯", "📌", "💡", "🔖"],
  className,
  ...props
}: TagIconProps) => {
  const { icon, onIconChange } = useTagContext()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <span className={cn("cursor-pointer text-lg", className)} {...props}>
          {icon}
        </span>
      </PopoverTrigger>
      <PopoverContent className="w-fit p-2">
        <div className="grid grid-cols-4 gap-2">
          {icons.map((emoji) => (
            <Button
              key={emoji}
              variant="ghost"
              className="h-8 w-8 p-0"
              onClick={() => onIconChange?.(emoji)}
            >
              {emoji}
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}

// Label component
const TagLabel = ({ className, ...props }: TagLabelProps) => {
  const { label } = useTagContext()

  return (
    <span
      className={cn("select-none text-sm font-medium", className)}
      {...props}
    >
      {label}
    </span>
  )
}

// Delete button component
const TagDelete = ({ className, ...props }: TagDeleteProps) => {
  const { onDelete } = useTagContext()

  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn("h-4 w-4 p-0", className)}
      onClick={() => onDelete?.()}
      {...props}
    >
      <X className="h-3 w-3" />
    </Button>
  )
}

// Compose the Tag component
export { TagRoot, TagIcon, TagLabel, TagDelete }
