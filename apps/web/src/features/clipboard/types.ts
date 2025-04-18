import { z } from "zod"

export const createLinkSchema = z.object({
  title: z
    .string()
    .min(3, { message: "The link title must be at least 3 characters" }),
  url: z.string().min(6, { message: "The URL cannot be so short" }),
  description: z.optional(z.string()),
  tags: z.array(z.string().cuid2()).optional(),
})

export type CreateLinkFormData = z.infer<typeof createLinkSchema>
