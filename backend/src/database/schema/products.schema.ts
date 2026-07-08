import { sql } from 'drizzle-orm';
import {
  bigint as pgBigint,
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

import { collections } from './collections.schema';
import {
  catalogueStatusEnum,
  photographyTypeEnum,
  productAvailabilityEnum,
  productStatusEnum,
  supplyModeEnum,
} from './enums.schema';

export const products = pgTable(
  'products',
  {
    id: uuid('id').defaultRandom().primaryKey(),

    slug: text('slug').notNull(),
    sku: text('sku').notNull(),

    name: text('name').notNull(),

    shortDescription: text('short_description').notNull(),
    description: text('description').notNull(),
    designStory: text('design_story'),

    category: text('category').notNull(),

    collectionId: uuid('collection_id').references(() => collections.id, {
      onDelete: 'set null',
    }),

    priceMinor: pgBigint('price_minor', { mode: 'number' }).notNull(),
    currency: text('currency').notNull().default('KES'),

    // Legacy field retained until application code fully migrates.
    status: productStatusEnum('status').notNull().default('draft'),

    supplyMode: supplyModeEnum('supply_mode').notNull(),
    editionSize: integer('edition_size'),

    catalogueStatus: catalogueStatusEnum('catalogue_status')
      .notNull()
      .default('draft'),

    availability: productAvailabilityEnum('availability')
      .notNull()
      .default('unavailable'),

    photographyType: photographyTypeEnum('photography_type').notNull(),

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

    index('products_collection_id_idx').on(table.collectionId),
    index('products_supply_mode_idx').on(table.supplyMode),
    index('products_catalogue_status_idx').on(table.catalogueStatus),
    index('products_availability_idx').on(table.availability),

    index('products_catalogue_status_availability_idx').on(
      table.catalogueStatus,
      table.availability,
    ),

    check('products_price_minor_positive_check', sql`${table.priceMinor} > 0`),

    check(
      'products_supply_mode_edition_size_check',
      sql`
        (
          (
            ${table.supplyMode} = 'unique'
            AND ${table.editionSize} = 1
          )
          OR
          (
            ${table.supplyMode} = 'limited'
            AND ${table.editionSize} > 1
          )
          OR
          (
            ${table.supplyMode} = 'reproducible'
            AND ${table.editionSize} IS NULL
          )
        )
      `,
    ),
  ],
);
