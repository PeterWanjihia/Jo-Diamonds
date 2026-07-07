import { sql } from 'drizzle-orm';
import {
  bigint as pgBigint,
  boolean,
  check,
  index,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from 'drizzle-orm/pg-core';

import { productStatusEnum } from './enums.schema';

export const products = pgTable(
  'products',
  {
    id: uuid('id').defaultRandom().primaryKey(),

    slug: text('slug').notNull(),
    sku: text('sku').notNull(),

    name: text('name').notNull(),
    description: text('description').notNull(),
    category: text('category').notNull(),

    priceMinor: pgBigint('price_minor', { mode: 'number' }).notNull(),
    currency: text('currency').notNull().default('KES'),

    status: productStatusEnum('status').notNull().default('draft'),
    isFeatured: boolean('is_featured').notNull().default(false),

    createdAt: timestamp('created_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    uniqueIndex('products_slug_unique').on(table.slug),
    uniqueIndex('products_sku_unique').on(table.sku),

    index('products_status_idx').on(table.status),
    index('products_category_idx').on(table.category),
    index('products_is_featured_idx').on(table.isFeatured),

    check('products_price_minor_positive_check', sql`${table.priceMinor} > 0`),
  ],
);
