import { index, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

import { enquiryStatusEnum } from './enums.schema';
import { products } from './products.schema';

export const enquiries = pgTable(
  'enquiries',
  {
    id: uuid('id').defaultRandom().primaryKey(),

    productId: uuid('product_id').references(() => products.id, {
      onDelete: 'set null',
    }),

    name: text('name').notNull(),
    email: text('email').notNull(),
    phone: text('phone'),
    message: text('message').notNull(),

    status: enquiryStatusEnum('status').notNull().default('new'),

    respondedAt: timestamp('responded_at', { withTimezone: true }),

    createdAt: timestamp('created_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    index('enquiries_product_id_idx').on(table.productId),
    index('enquiries_status_idx').on(table.status),
    index('enquiries_email_idx').on(table.email),
    index('enquiries_created_at_idx').on(table.createdAt),
  ],
);
