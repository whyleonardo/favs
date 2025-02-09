import { createId } from "@paralleldrive/cuid2"

import { relations } from "drizzle-orm"
import { pgTable, text, timestamp } from "drizzle-orm/pg-core"
import { createSelectSchema } from "drizzle-zod"
import { z } from "zod"

import { user } from "./auth"
import { linksToTags } from "./links-to-tags"

export const links = pgTable("links", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  title: text("title").notNull().unique(),
  url: text("url").notNull(),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow(),
  userId: text("user_id").notNull(),
})

export const linksRelations = relations(links, ({ one, many }) => ({
  userId: one(user, { fields: [links.userId], references: [user.id] }),
  tags: many(linksToTags),
}))

export const selectLinksSchema = createSelectSchema(links)
export const insertLinksSchema = createSelectSchema(links, {
  title: z
    .string()
    .min(3, { message: "The link title must be at least 3 characters" }),
  url: z.string().url({ message: "The url must be a valid url" }),
  description: z.string().optional(),
})

// zsp9vy7lsvw23bxy8lrzn1ya
