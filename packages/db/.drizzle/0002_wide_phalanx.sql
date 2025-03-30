CREATE TYPE "public"."tag_color" AS ENUM('red', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose');--> statement-breakpoint
ALTER TABLE "tags" ADD COLUMN "color" "tag_color" DEFAULT 'blue' NOT NULL;