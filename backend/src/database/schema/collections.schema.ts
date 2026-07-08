import { sql } from 'drizzle-orm';
import {
  check,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from 'drizzle-orm/pg-core';

export const collections = pgTable(
  'collections',
  {
    id: uuid('id').defaultRandom().primaryKey(),

    slug: text('slug').notNull(),
    name: text('name').notNull(),
    description: text('description').notNull(),

    createdAt: timestamp('created_at', { withTimezone: true })
      .notNull()
      .defaultNow(),

    updatedAt: timestamp('updated_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    uniqueIndex('collections_slug_unique').on(table.slug),
    uniqueIndex('collections_name_unique').on(table.name),

    check(
      'collections_slug_not_blank_check',
      sql`length(btrim(${table.slug})) > 0`,
    ),

    check(
      'collections_name_not_blank_check',
      sql`length(btrim(${table.name})) > 0`,
    ),

    check(
      'collections_description_not_blank_check',
      sql`length(btrim(${table.description})) > 0`,
    ),
  ],
);
