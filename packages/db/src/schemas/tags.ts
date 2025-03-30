import { createId } from "@paralleldrive/cuid2"

import { relations } from "drizzle-orm"
import { pgEnum, pgTable, text, unique } from "drizzle-orm/pg-core"
import { createSelectSchema } from "drizzle-zod"
import { z } from "zod"

import { user } from "./auth"
import { linksToTags } from "./links-to-tags"

// Create enum for tag colors based on badge component variants using pgEnum
export const tagColorEnum = pgEnum("tag_color", [
  "red",
  "orange",
  "amber",
  "yellow",
  "lime",
  "green",
  "emerald",
  "teal",
  "cyan",
  "sky",
  "blue",
  "indigo",
  "violet",
  "purple",
  "fuchsia",
  "pink",
  "rose",
])

export const tags = pgTable(
  "tags",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    name: text("name").notNull(),
    userId: text("user_id").notNull(),
    icon: text("icon").notNull(),
    color: tagColorEnum("color").notNull().default("blue"),
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
  color: z.enum(tagColorEnum.enumValues).default("blue"),
})
