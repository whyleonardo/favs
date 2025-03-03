import { toast } from "sonner"
import { z } from "zod"

const CLIPBOARD_PERMISSION_ERROR_MESSAGE =
  "NotAllowedError: Failed to execute 'readText' on 'Clipboard': Read permission denied."

const clipboardSchema = z.object({
  url: z.string().url(),
})

export async function getClipboard() {
  let url: string | null = null

  try {
    url = await navigator.clipboard.readText()
  } catch (error) {
    if (String(error).match(CLIPBOARD_PERMISSION_ERROR_MESSAGE)) {
      toast.error("Permission to clipboard is not allowed!")
    }

    return null
  }

  const clipboard = clipboardSchema.safeParse({
    url,
  })

  if (!clipboard.success) {
    return null
  }

  return clipboard.data.url
}
