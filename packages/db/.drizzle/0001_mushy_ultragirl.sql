ALTER TABLE "links_to_tags" DROP CONSTRAINT "links_to_tags_link_id_links_id_fk";
--> statement-breakpoint
ALTER TABLE "links_to_tags" DROP CONSTRAINT "links_to_tags_tag_id_tags_id_fk";
--> statement-breakpoint
ALTER TABLE "links_to_tags" ADD CONSTRAINT "links_to_tags_link_id_links_id_fk" FOREIGN KEY ("link_id") REFERENCES "public"."links"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "links_to_tags" ADD CONSTRAINT "links_to_tags_tag_id_tags_id_fk" FOREIGN KEY ("tag_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;