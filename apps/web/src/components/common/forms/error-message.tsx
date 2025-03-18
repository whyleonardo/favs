import { AlertCircleIcon } from "lucide-react"

interface ErrorMessageProps {
  errors: {
    message: string
  }[]
}

export const ErrorMessage = ({ errors }: ErrorMessageProps) => {
  if (errors.length === 0) {
    return null
  }
  return (
    <ul className="flex flex-col gap-1">
      {errors.map(({ message }, index) => (
        <li
          className="text-destructive flex items-center gap-1 text-xs"
          key={index}
        >
          <AlertCircleIcon className="size-3.5" /> {message}
        </li>
      ))}
    </ul>
  )
}
