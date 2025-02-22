import { z } from "zod"

export const createLinkSchema = z.object({
  title: z
    .string()
    .min(3, { message: "The link title must be at least 3 characters" }),
  url: z.string().url({ message: "The url must be a valid url" }),
  description: z.optional(z.string()),
  tags: z
    .array(
      z.object({
        id: z.string(),
        text: z
          .string()
          .min(3, { message: "The tag must be at least 3 characters" }),
      })
    )
    .optional(),
})

export type CreateLinkFormData = z.infer<typeof createLinkSchema>
