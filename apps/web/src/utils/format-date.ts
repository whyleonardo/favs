import { format } from "date-fns"

export const formatDate = (date: string | Date) => {
  return format(date, "MMM d, yyyy")
}
