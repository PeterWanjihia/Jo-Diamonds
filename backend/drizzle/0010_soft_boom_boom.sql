DROP INDEX "products_status_idx";--> statement-breakpoint
ALTER TABLE "products" DROP COLUMN "status";--> statement-breakpoint
DROP TYPE "public"."product_status";