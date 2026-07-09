import { pgEnum } from 'drizzle-orm/pg-core';

export const orderStatusEnum = pgEnum('order_status', [
  'pending_payment',
  'paid',
  'cancelled',
  'expired',
  'fulfilled',
  'refunded',
]);

export const reservationStatusEnum = pgEnum('reservation_status', [
  'active',
  'released',
  'expired',
  'converted',
]);

export const enquiryStatusEnum = pgEnum('enquiry_status', [
  'new',
  'contacted',
  'closed',
  'spam',
]);

export const supplyModeEnum = pgEnum('supply_mode', [
  'unique',
  'limited',
  'reproducible',
]);

export const catalogueStatusEnum = pgEnum('catalogue_status', [
  'draft',
  'published',
  'archived',
]);

export const productAvailabilityEnum = pgEnum('product_availability', [
  'available',
  'unavailable',
  'exhausted',
]);

export const photographyTypeEnum = pgEnum('photography_type', [
  'exact',
  'representative',
]);

export const gemstoneRoleEnum = pgEnum('gemstone_role', ['primary', 'accent']);

export const gemstoneOriginEnum = pgEnum('gemstone_origin', [
  'natural',
  'laboratory_grown',
]);

export const gemstoneSpecificationModeEnum = pgEnum(
  'gemstone_specification_mode',
  ['exact', 'approximate', 'range'],
);

export const certificationScopeEnum = pgEnum('certification_scope', [
  'product',
  'per_unit',
]);

export const productServiceTypeEnum = pgEnum('product_service_type', [
  'resizing',
  'engraving',
  'private_viewing',
  'care',
  'personalization',
]);
