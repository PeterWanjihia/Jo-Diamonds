-- Custom SQL migration file, put your code below! --
UPDATE "products"
SET
  "catalogue_status" = CASE "status"
    WHEN 'draft' THEN 'draft'::catalogue_status
    WHEN 'available' THEN 'published'::catalogue_status
    WHEN 'sold' THEN 'published'::catalogue_status
    WHEN 'archived' THEN 'archived'::catalogue_status
  END,
  "availability" = CASE "status"
    WHEN 'draft' THEN 'unavailable'::product_availability
    WHEN 'available' THEN 'available'::product_availability
    WHEN 'sold' THEN 'exhausted'::product_availability
    WHEN 'archived' THEN 'unavailable'::product_availability
  END;
--> statement-breakpoint

UPDATE "products"
SET
  "short_description" =
    'A round-cut solitaire ring in a clean six-prong setting.',
  "supply_mode" = 'unique'::supply_mode,
  "edition_size" = 1,
  "photography_type" = 'exact'::photography_type
WHERE "sku" = 'JD-RNG-SOL-001';
--> statement-breakpoint

UPDATE "products"
SET
  "short_description" =
    'Matched diamond stud earrings framed by delicate halos.',
  "supply_mode" = 'reproducible'::supply_mode,
  "edition_size" = NULL,
  "photography_type" = 'representative'::photography_type
WHERE "sku" = 'JD-EAR-HAL-001';
--> statement-breakpoint

UPDATE "products"
SET
  "short_description" =
    'An emerald-cut diamond pendant in a minimal polished setting.',
  "supply_mode" = 'unique'::supply_mode,
  "edition_size" = 1,
  "photography_type" = 'exact'::photography_type
WHERE "sku" = 'JD-NEC-EMR-001';
--> statement-breakpoint

UPDATE "products"
SET
  "short_description" =
    'A fluid diamond tennis bracelet with balanced stone spacing.',
  "supply_mode" = 'limited'::supply_mode,
  "edition_size" = 25,
  "photography_type" = 'representative'::photography_type
WHERE "sku" = 'JD-BRC-TEN-001';
--> statement-breakpoint

UPDATE "products"
SET
  "short_description" =
    'An oval halo ring with vintage-inspired shoulders.',
  "supply_mode" = 'unique'::supply_mode,
  "edition_size" = 1,
  "photography_type" = 'exact'::photography_type
WHERE "sku" = 'JD-RNG-OVL-001';
--> statement-breakpoint

DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM "products"
    WHERE "short_description" IS NULL
       OR "supply_mode" IS NULL
       OR "catalogue_status" IS NULL
       OR "availability" IS NULL
       OR "photography_type" IS NULL
  ) THEN
    RAISE EXCEPTION
      'Catalogue backfill incomplete: one or more products remain unclassified';
  END IF;
END
$$;