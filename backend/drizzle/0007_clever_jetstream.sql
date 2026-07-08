CREATE TABLE "product_gemstone_groups" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"product_id" uuid NOT NULL,
	"role" "gemstone_role" NOT NULL,
	"gemstone_type" text NOT NULL,
	"origin" "gemstone_origin" NOT NULL,
	"specification_mode" "gemstone_specification_mode" NOT NULL,
	"quantity" integer DEFAULT 1 NOT NULL,
	"shape" text,
	"colour" text,
	"clarity" text,
	"cut_grade" text,
	"treatment" text,
	"total_carat_weight" numeric(10, 3),
	"minimum_total_carat_weight" numeric(10, 3),
	"maximum_total_carat_weight" numeric(10, 3),
	"notes" text,
	"display_order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "product_gemstone_groups_quantity_positive_check" CHECK ("product_gemstone_groups"."quantity" > 0),
	CONSTRAINT "product_gemstone_groups_display_order_non_negative_check" CHECK ("product_gemstone_groups"."display_order" >= 0),
	CONSTRAINT "product_gemstone_groups_total_carat_positive_check" CHECK ("product_gemstone_groups"."total_carat_weight" > 0),
	CONSTRAINT "product_gemstone_groups_minimum_carat_positive_check" CHECK ("product_gemstone_groups"."minimum_total_carat_weight" > 0),
	CONSTRAINT "product_gemstone_groups_maximum_carat_positive_check" CHECK ("product_gemstone_groups"."maximum_total_carat_weight" > 0),
	CONSTRAINT "product_gemstone_groups_carat_claim_check" CHECK (
        (
          (
            "product_gemstone_groups"."specification_mode" IN ('exact', 'approximate')
            AND "product_gemstone_groups"."total_carat_weight" IS NOT NULL
            AND "product_gemstone_groups"."minimum_total_carat_weight" IS NULL
            AND "product_gemstone_groups"."maximum_total_carat_weight" IS NULL
          )
          OR
          (
            "product_gemstone_groups"."specification_mode" = 'range'
            AND "product_gemstone_groups"."total_carat_weight" IS NULL
            AND "product_gemstone_groups"."minimum_total_carat_weight" IS NOT NULL
            AND "product_gemstone_groups"."maximum_total_carat_weight" IS NOT NULL
            AND "product_gemstone_groups"."minimum_total_carat_weight"
              <= "product_gemstone_groups"."maximum_total_carat_weight"
          )
        )
      )
);
--> statement-breakpoint
ALTER TABLE "product_gemstone_groups" ADD CONSTRAINT "product_gemstone_groups_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "product_gemstone_groups_product_id_idx" ON "product_gemstone_groups" USING btree ("product_id");--> statement-breakpoint
CREATE INDEX "product_gemstone_groups_role_idx" ON "product_gemstone_groups" USING btree ("role");--> statement-breakpoint
CREATE UNIQUE INDEX "product_gemstone_groups_product_display_order_unique" ON "product_gemstone_groups" USING btree ("product_id","display_order");