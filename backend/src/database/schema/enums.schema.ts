import { pgEnum } from 'drizzle-orm/pg-core';

export const productStatusEnum = pgEnum('product_status', [
  'draft',
  'available',
  'sold',
  'archived',
]);

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
