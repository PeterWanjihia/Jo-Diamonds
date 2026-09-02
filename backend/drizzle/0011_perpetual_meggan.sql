ALTER TABLE "product_services" DROP CONSTRAINT "product_services_currency_format_check";--> statement-breakpoint
UPDATE "products"
SET
  "price_minor" = CASE "sku"
    WHEN 'JD-RNG-SOL-001' THEN 1480000
    WHEN 'JD-EAR-HAL-001' THEN 850000
    WHEN 'JD-NEC-EMR-001' THEN 1700000
    WHEN 'JD-BRC-TEN-001' THEN 2200000
    WHEN 'JD-RNG-OVL-001' THEN 1900000
    ELSE "price_minor"
  END,
  "currency" = 'GBP'
WHERE "sku" IN (
  'JD-RNG-SOL-001',
  'JD-EAR-HAL-001',
  'JD-NEC-EMR-001',
  'JD-BRC-TEN-001',
  'JD-RNG-OVL-001'
);--> statement-breakpoint
UPDATE "product_services"
SET
  "price_minor" = CASE "id"
    WHEN '60000000-0000-4000-8000-000000000003' THEN 15000
    WHEN '60000000-0000-4000-8000-000000000007' THEN 18000
    ELSE "price_minor"
  END,
  "currency" = 'GBP'
WHERE "id" IN (
  '60000000-0000-4000-8000-000000000003',
  '60000000-0000-4000-8000-000000000007'
);--> statement-breakpoint
UPDATE "products" SET "currency" = 'GBP' WHERE "currency" <> 'GBP';--> statement-breakpoint
UPDATE "product_services" SET "currency" = 'GBP' WHERE "currency" <> 'GBP';--> statement-breakpoint
UPDATE "orders" SET "currency" = 'GBP' WHERE "currency" <> 'GBP';--> statement-breakpoint
UPDATE "order_items" SET "currency_snapshot" = 'GBP' WHERE "currency_snapshot" <> 'GBP';--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "currency" SET DEFAULT 'GBP';--> statement-breakpoint
ALTER TABLE "product_services" ALTER COLUMN "currency" SET DEFAULT 'GBP';--> statement-breakpoint
ALTER TABLE "orders" ALTER COLUMN "currency" SET DEFAULT 'GBP';--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_currency_gbp_check" CHECK ("products"."currency" = 'GBP');--> statement-breakpoint
ALTER TABLE "product_services" ADD CONSTRAINT "product_services_currency_gbp_check" CHECK ("product_services"."currency" = 'GBP');--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_currency_gbp_check" CHECK ("orders"."currency" = 'GBP');--> statement-breakpoint
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_currency_snapshot_gbp_check" CHECK ("order_items"."currency_snapshot" = 'GBP');