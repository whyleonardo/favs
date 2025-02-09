import { createId } from "@paralleldrive/cuid2"

import { relations } from "drizzle-orm"
import { pgTable, text, unique } from "drizzle-orm/pg-core"
import { createSelectSchema } from "drizzle-zod"
import { z } from "zod"

import { user } from "./auth"
import { linksToTags } from "./links-to-tags"

export const tags = pgTable(
  "tags",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    name: text("name").notNull(),
    userId: text("user_id").notNull(),
    icon: text("icon").notNull(),
  },
  (table) => [unique("uniqueTagNamePerUser").on(table.name, table.userId)]
)

export const tagsRelations = relations(tags, ({ one, many }) => ({
  userId: one(user, { fields: [tags.userId], references: [user.id] }),
  links: many(linksToTags),
}))

export const selectTagsSchema = createSelectSchema(tags)
export const insertTagsSchema = createSelectSchema(tags, {
  name: z
    .string()
    .min(3, { message: "The tag name must be at least 3 characters" }),
})
