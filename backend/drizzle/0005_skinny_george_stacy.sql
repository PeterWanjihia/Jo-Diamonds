ALTER TABLE "products" ALTER COLUMN "short_description" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "supply_mode" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "catalogue_status" SET DEFAULT 'draft';--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "catalogue_status" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "availability" SET DEFAULT 'unavailable';--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "availability" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "photography_type" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_supply_mode_edition_size_check" CHECK (
        (
          (
            "products"."supply_mode" = 'unique'
            AND "products"."edition_size" = 1
          )
          OR
          (
            "products"."supply_mode" = 'limited'
            AND "products"."edition_size" > 1
          )
          OR
          (
            "products"."supply_mode" = 'reproducible'
            AND "products"."edition_size" IS NULL
          )
        )
      );