import { useId } from "react"
import type React from "react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useFieldContext } from "@/lib/form"
import { cn } from "@/lib/utils"

import { ErrorMessage } from "./error-message"

type FormInputVariants = "default" | "link"

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  variant?: FormInputVariants
  helperText?: string
  ref?: React.Ref<HTMLInputElement>
}

export const FormInput = ({
  variant = "default",
  label,
  placeholder,
  helperText,
  ref,
  ...rest
}: FormInputProps) => {
  const field = useFieldContext<string>()
  const id = useId()

  const isErrorOnField = field.state.meta.errors.length > 0

  return (
    <div className="flex flex-col">
      <Label
        htmlFor={id}
        className={cn(
          "mb-1 text-sm font-semibold capitalize",
          variant === "link" && "uppercase",
          isErrorOnField && "text-destructive"
        )}
      >
        {label}
      </Label>

      {variant === "default" && (
        <Input
          id={id}
          ref={ref}
          placeholder={placeholder}
          type="text"
          value={field.state.value}
          onChange={({ target }) => field.handleChange(target.value)}
          {...rest}
        />
      )}

      {variant === "link" && (
        <div className="relative">
          <Input
            id={id}
            ref={ref}
            className={cn(
              "ps-16",
              isErrorOnField && "text-destructive border-destructive"
            )}
            placeholder={placeholder}
            value={field.state.value}
            onChange={({ target }) => field.handleChange(target.value)}
            {...rest}
          />
          <span className="text-muted-foreground/60 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-sm peer-disabled:opacity-50">
            https://
          </span>
        </div>
      )}

      <div className="mt-2">
        {isErrorOnField && <ErrorMessage errors={field.state.meta.errors} />}

        {helperText && !isErrorOnField && (
          <p className="text-muted-foreground text-xs">{helperText}</p>
        )}
      </div>
    </div>
  )
}
