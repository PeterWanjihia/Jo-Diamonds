import { sql } from 'drizzle-orm';
import {
  boolean,
  check,
  index,
  integer,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from 'drizzle-orm/pg-core';

import { products } from './products.schema';

export const productImages = pgTable(
  'product_images',
  {
    id: uuid('id').defaultRandom().primaryKey(),

    productId: uuid('product_id')
      .notNull()
      .references(() => products.id, { onDelete: 'cascade' }),

    url: text('url').notNull(),
    altText: text('alt_text').notNull(),

    sortOrder: integer('sort_order').notNull().default(0),
    isPrimary: boolean('is_primary').notNull().default(false),

    createdAt: timestamp('created_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    index('product_images_product_id_idx').on(table.productId),

    uniqueIndex('product_images_product_sort_order_unique').on(
      table.productId,
      table.sortOrder,
    ),

    uniqueIndex('product_images_one_primary_per_product_unique')
      .on(table.productId)
      .where(sql`${table.isPrimary} = true`),

    check(
      'product_images_sort_order_non_negative_check',
      sql`${table.sortOrder} >= 0`,
    ),
  ],
);
