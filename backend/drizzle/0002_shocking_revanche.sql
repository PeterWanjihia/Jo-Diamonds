CREATE TABLE "collections" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" text NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "collections_slug_not_blank_check" CHECK (length(btrim("collections"."slug")) > 0),
	CONSTRAINT "collections_name_not_blank_check" CHECK (length(btrim("collections"."name")) > 0),
	CONSTRAINT "collections_description_not_blank_check" CHECK (length(btrim("collections"."description")) > 0)
);
--> statement-breakpoint
CREATE UNIQUE INDEX "collections_slug_unique" ON "collections" USING btree ("slug");--> statement-breakpoint
CREATE UNIQUE INDEX "collections_name_unique" ON "collections" USING btree ("name");