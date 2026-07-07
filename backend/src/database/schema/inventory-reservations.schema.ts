import { sql } from 'drizzle-orm';
import {
  check,
  index,
  pgTable,
  timestamp,
  uniqueIndex,
  uuid,
} from 'drizzle-orm/pg-core';

import { reservationStatusEnum } from './enums.schema';
import { orders } from './orders.schema';
import { products } from './products.schema';

export const inventoryReservations = pgTable(
  'inventory_reservations',
  {
    id: uuid('id').defaultRandom().primaryKey(),

    productId: uuid('product_id')
      .notNull()
      .references(() => products.id, { onDelete: 'cascade' }),

    orderId: uuid('order_id').references(() => orders.id, {
      onDelete: 'set null',
    }),

    status: reservationStatusEnum('status').notNull().default('active'),

    expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),

    createdAt: timestamp('created_at', { withTimezone: true })
      .notNull()
      .defaultNow(),

    releasedAt: timestamp('released_at', { withTimezone: true }),
    convertedAt: timestamp('converted_at', { withTimezone: true }),
  },
  (table) => [
    index('inventory_reservations_product_id_idx').on(table.productId),
    index('inventory_reservations_order_id_idx').on(table.orderId),
    index('inventory_reservations_status_idx').on(table.status),
    index('inventory_reservations_expires_at_idx').on(table.expiresAt),

    uniqueIndex('inventory_reservations_one_active_per_product_unique')
      .on(table.productId)
      .where(sql`${table.status} = 'active'`),

    check(
      'inventory_reservations_expires_after_created_check',
      sql`${table.expiresAt} > ${table.createdAt}`,
    ),
  ],
);
