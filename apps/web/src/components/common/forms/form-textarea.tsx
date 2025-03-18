import { useId } from "react"

import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useFieldContext } from "@/lib/form"

interface FormTextareaProps {
  label: string
  placeholder?: string
}

export const FormTextarea = ({ label, placeholder }: FormTextareaProps) => {
  const field = useFieldContext<string>()
  const id = useId()

  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={id} className="text-s font-semibold capitalize">
        {label}
      </Label>

      <Textarea
        id={id}
        placeholder={placeholder}
        className="resize-none"
        value={field.state.value}
        onChange={({ target }) => field.handleChange(target.value)}
      />

      {/* <ErrorMessage
        errors={form.formState.errors}
        name="description"
        render={({ message }) => (
          <p className="text-destructive text-[0.75rem] tracking-tight">
            {message}
          </p>
        )}
      /> */}
    </div>
  )
}
