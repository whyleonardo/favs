import { relations } from "drizzle-orm"
import { pgTable, primaryKey, text } from "drizzle-orm/pg-core"

import { links } from "./links"
import { tags } from "./tags"

export const linksToTags = pgTable(
  "links_to_tags",
  {
    linkId: text("link_id")
      .notNull()
      .references(() => links.id),
    tagId: text("tag_id")
      .notNull()
      .references(() => tags.id),
  },
  (table) => [primaryKey({ columns: [table.linkId, table.tagId] })]
)

export const linksToTagsRelations = relations(linksToTags, ({ one }) => ({
  link: one(links, {
    fields: [linksToTags.linkId],
    references: [links.id],
  }),
  tag: one(tags, {
    fields: [linksToTags.tagId],
    references: [tags.id],
  }),
}))
