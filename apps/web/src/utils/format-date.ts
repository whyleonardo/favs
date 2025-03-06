import { format } from "date-fns"

export const formatDate = (date: string | Date) => format(date, "MMM d, yyyy")
