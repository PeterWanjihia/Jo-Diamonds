CREATE TYPE "public"."catalogue_status" AS ENUM('draft', 'published', 'archived');--> statement-breakpoint
CREATE TYPE "public"."certification_scope" AS ENUM('product', 'per_unit');--> statement-breakpoint
CREATE TYPE "public"."gemstone_origin" AS ENUM('natural', 'laboratory_grown');--> statement-breakpoint
CREATE TYPE "public"."gemstone_role" AS ENUM('primary', 'accent');--> statement-breakpoint
CREATE TYPE "public"."gemstone_specification_mode" AS ENUM('exact', 'approximate', 'range');--> statement-breakpoint
CREATE TYPE "public"."photography_type" AS ENUM('exact', 'representative');--> statement-breakpoint
CREATE TYPE "public"."product_availability" AS ENUM('available', 'unavailable', 'exhausted');--> statement-breakpoint
CREATE TYPE "public"."product_service_type" AS ENUM('resizing', 'engraving', 'private_viewing', 'care', 'personalization');--> statement-breakpoint
CREATE TYPE "public"."supply_mode" AS ENUM('unique', 'limited', 'reproducible');