CREATE TABLE "product_services" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"product_id" uuid NOT NULL,
	"service_type" "product_service_type" NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"is_available" boolean DEFAULT true NOT NULL,
	"is_included" boolean DEFAULT false NOT NULL,
	"price_on_request" boolean DEFAULT false NOT NULL,
	"price_minor" bigint,
	"currency" text DEFAULT 'KES' NOT NULL,
	"lead_time_days" integer,
	"requirements" text,
	"notes" text,
	"display_order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "product_services_title_not_blank_check" CHECK (length(trim("product_services"."title")) > 0),
	CONSTRAINT "product_services_currency_format_check" CHECK ("product_services"."currency" ~ '^[A-Z]{3}$'),
	CONSTRAINT "product_services_price_positive_check" CHECK ("product_services"."price_minor" > 0),
	CONSTRAINT "product_services_lead_time_non_negative_check" CHECK ("product_services"."lead_time_days" >= 0),
	CONSTRAINT "product_services_display_order_non_negative_check" CHECK ("product_services"."display_order" >= 0),
	CONSTRAINT "product_services_pricing_mode_check" CHECK (
        (
          (
            "product_services"."is_included" = true
            AND "product_services"."price_on_request" = false
            AND "product_services"."price_minor" IS NULL
          )
          OR
          (
            "product_services"."is_included" = false
            AND "product_services"."price_on_request" = true
            AND "product_services"."price_minor" IS NULL
          )
          OR
          (
            "product_services"."is_included" = false
            AND "product_services"."price_on_request" = false
            AND "product_services"."price_minor" IS NOT NULL
          )
        )
      )
);
--> statement-breakpoint
ALTER TABLE "product_services" ADD CONSTRAINT "product_services_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "product_services_product_id_idx" ON "product_services" USING btree ("product_id");--> statement-breakpoint
CREATE INDEX "product_services_service_type_idx" ON "product_services" USING btree ("service_type");--> statement-breakpoint
CREATE INDEX "product_services_is_available_idx" ON "product_services" USING btree ("is_available");--> statement-breakpoint
CREATE UNIQUE INDEX "product_services_product_display_order_unique" ON "product_services" USING btree ("product_id","display_order");