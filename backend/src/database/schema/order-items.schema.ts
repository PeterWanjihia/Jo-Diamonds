import { sql } from 'drizzle-orm';
import {
  bigint as pgBigint,
  check,
  index,
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core';

import { orders } from './orders.schema';
import { products } from './products.schema';

export const orderItems = pgTable(
  'order_items',
  {
    id: uuid('id').defaultRandom().primaryKey(),

    orderId: uuid('order_id')
      .notNull()
      .references(() => orders.id, { onDelete: 'cascade' }),

    productId: uuid('product_id').references(() => products.id, {
      onDelete: 'set null',
    }),

    productNameSnapshot: text('product_name_snapshot').notNull(),
    productSkuSnapshot: text('product_sku_snapshot').notNull(),

    unitPriceMinorSnapshot: pgBigint('unit_price_minor_snapshot', {
      mode: 'number',
    }).notNull(),

    currencySnapshot: text('currency_snapshot').notNull(),

    quantity: integer('quantity').notNull().default(1),
    lineTotalMinor: pgBigint('line_total_minor', { mode: 'number' }).notNull(),

    createdAt: timestamp('created_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    index('order_items_order_id_idx').on(table.orderId),
    index('order_items_product_id_idx').on(table.productId),

    check(
      'order_items_unit_price_minor_positive_check',
      sql`${table.unitPriceMinorSnapshot} > 0`,
    ),
    check('order_items_quantity_positive_check', sql`${table.quantity} > 0`),
    check(
      'order_items_line_total_minor_non_negative_check',
      sql`${table.lineTotalMinor} >= 0`,
    ),
  ],
);
