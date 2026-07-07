import { sql } from 'drizzle-orm';
import {
  bigint as pgBigint,
  check,
  index,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from 'drizzle-orm/pg-core';

import { orderStatusEnum } from './enums.schema';

export const orders = pgTable(
  'orders',
  {
    id: uuid('id').defaultRandom().primaryKey(),

    orderNumber: text('order_number').notNull(),

    customerEmail: text('customer_email').notNull(),
    customerName: text('customer_name'),
    customerPhone: text('customer_phone'),

    status: orderStatusEnum('status').notNull().default('pending_payment'),

    currency: text('currency').notNull().default('KES'),
    subtotalMinor: pgBigint('subtotal_minor', { mode: 'number' }).notNull(),
    totalMinor: pgBigint('total_minor', { mode: 'number' }).notNull(),

    stripeCheckoutSessionId: text('stripe_checkout_session_id'),
    stripePaymentIntentId: text('stripe_payment_intent_id'),

    expiresAt: timestamp('expires_at', { withTimezone: true }),
    paidAt: timestamp('paid_at', { withTimezone: true }),
    cancelledAt: timestamp('cancelled_at', { withTimezone: true }),

    createdAt: timestamp('created_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    uniqueIndex('orders_order_number_unique').on(table.orderNumber),
    uniqueIndex('orders_stripe_checkout_session_id_unique').on(
      table.stripeCheckoutSessionId,
    ),
    uniqueIndex('orders_stripe_payment_intent_id_unique').on(
      table.stripePaymentIntentId,
    ),

    index('orders_status_idx').on(table.status),
    index('orders_customer_email_idx').on(table.customerEmail),
    index('orders_created_at_idx').on(table.createdAt),

    check(
      'orders_subtotal_minor_non_negative_check',
      sql`${table.subtotalMinor} >= 0`,
    ),
    check(
      'orders_total_minor_non_negative_check',
      sql`${table.totalMinor} >= 0`,
    ),
  ],
);
