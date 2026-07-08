CREATE TABLE "product_jewellery_details" (
	"product_id" uuid PRIMARY KEY NOT NULL,
	"metal_type" text,
	"metal_purity" text,
	"metal_colour" text,
	"total_weight_grams" numeric(10, 3),
	"width_mm" numeric(10, 2),
	"height_mm" numeric(10, 2),
	"depth_mm" numeric(10, 2),
	"length_mm" numeric(10, 2),
	"setting_style" text,
	"size_system" text,
	"size_value" text,
	"resizable" boolean DEFAULT false NOT NULL,
	"resize_min" text,
	"resize_max" text,
	"resize_notes" text,
	"adjustable" boolean DEFAULT false NOT NULL,
	"clasp_type" text,
	"backing_type" text,
	"sold_as" text,
	CONSTRAINT "product_jewellery_details_total_weight_positive_check" CHECK ("product_jewellery_details"."total_weight_grams" > 0),
	CONSTRAINT "product_jewellery_details_width_positive_check" CHECK ("product_jewellery_details"."width_mm" > 0),
	CONSTRAINT "product_jewellery_details_height_positive_check" CHECK ("product_jewellery_details"."height_mm" > 0),
	CONSTRAINT "product_jewellery_details_depth_positive_check" CHECK ("product_jewellery_details"."depth_mm" > 0),
	CONSTRAINT "product_jewellery_details_length_positive_check" CHECK ("product_jewellery_details"."length_mm" > 0)
);
--> statement-breakpoint
ALTER TABLE "product_jewellery_details" ADD CONSTRAINT "product_jewellery_details_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;