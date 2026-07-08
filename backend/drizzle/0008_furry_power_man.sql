CREATE TABLE "product_certificates" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"product_id" uuid NOT NULL,
	"scope" "certification_scope" NOT NULL,
	"certificate_type" text NOT NULL,
	"issuer" text NOT NULL,
	"certificate_number" text,
	"verification_url" text,
	"document_url" text,
	"issued_at" timestamp with time zone,
	"notes" text,
	"display_order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "product_certificates_display_order_non_negative_check" CHECK ("product_certificates"."display_order" >= 0),
	CONSTRAINT "product_certificates_type_not_blank_check" CHECK (length(trim("product_certificates"."certificate_type")) > 0),
	CONSTRAINT "product_certificates_issuer_not_blank_check" CHECK (length(trim("product_certificates"."issuer")) > 0),
	CONSTRAINT "product_certificates_number_not_blank_check" CHECK (
        "product_certificates"."certificate_number" IS NULL
        OR length(trim("product_certificates"."certificate_number")) > 0
      ),
	CONSTRAINT "product_certificates_scope_number_check" CHECK (
        (
          "product_certificates"."scope" = 'product'
          OR
          (
            "product_certificates"."scope" = 'per_unit'
            AND "product_certificates"."certificate_number" IS NULL
          )
        )
      )
);
--> statement-breakpoint
ALTER TABLE "product_certificates" ADD CONSTRAINT "product_certificates_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "product_certificates_product_id_idx" ON "product_certificates" USING btree ("product_id");--> statement-breakpoint
CREATE INDEX "product_certificates_scope_idx" ON "product_certificates" USING btree ("scope");--> statement-breakpoint
CREATE INDEX "product_certificates_issuer_idx" ON "product_certificates" USING btree ("issuer");--> statement-breakpoint
CREATE UNIQUE INDEX "product_certificates_product_display_order_unique" ON "product_certificates" USING btree ("product_id","display_order");--> statement-breakpoint
CREATE UNIQUE INDEX "product_certificates_issuer_number_unique" ON "product_certificates" USING btree ("issuer","certificate_number") WHERE "product_certificates"."certificate_number" IS NOT NULL;