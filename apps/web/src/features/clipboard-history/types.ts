import { insertLinksSchema } from "@grek/db/schemas"

import type { z } from "zod"

const schema = insertLinksSchema.pick({
  title: true,
  url: true,
  description: true,
})

//@ts-expect-error - missing types
export type CreateLinkFormData = z.infer<typeof schema>
