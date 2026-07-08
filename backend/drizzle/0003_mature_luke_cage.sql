ALTER TABLE "products" ADD COLUMN "short_description" text;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "design_story" text;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "collection_id" uuid;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "supply_mode" "supply_mode";--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "edition_size" integer;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "catalogue_status" "catalogue_status";--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "availability" "product_availability";--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "photography_type" "photography_type";--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_collection_id_collections_id_fk" FOREIGN KEY ("collection_id") REFERENCES "public"."collections"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "products_collection_id_idx" ON "products" USING btree ("collection_id");--> statement-breakpoint
CREATE INDEX "products_supply_mode_idx" ON "products" USING btree ("supply_mode");--> statement-breakpoint
CREATE INDEX "products_catalogue_status_idx" ON "products" USING btree ("catalogue_status");--> statement-breakpoint
CREATE INDEX "products_availability_idx" ON "products" USING btree ("availability");--> statement-breakpoint
CREATE INDEX "products_catalogue_status_availability_idx" ON "products" USING btree ("catalogue_status","availability");