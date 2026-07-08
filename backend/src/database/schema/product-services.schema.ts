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

import { productServiceTypeEnum } from './enums.schema';
import { products } from './products.schema';

export const productServices = pgTable(
  'product_services',
  {
    id: uuid('id').defaultRandom().primaryKey(),

    productId: uuid('product_id')
      .notNull()
      .references(() => products.id, {
        onDelete: 'cascade',
      }),

    serviceType: productServiceTypeEnum('service_type').notNull(),

    title: text('title').notNull(),

    description: text('description'),

    isAvailable: boolean('is_available').notNull().default(true),

    isIncluded: boolean('is_included').notNull().default(false),

    priceOnRequest: boolean('price_on_request').notNull().default(false),

    priceMinor: pgBigint('price_minor', {
      mode: 'number',
    }),

    currency: text('currency').notNull().default('KES'),

    leadTimeDays: integer('lead_time_days'),

    requirements: text('requirements'),

    notes: text('notes'),

    displayOrder: integer('display_order').notNull().default(0),

    createdAt: timestamp('created_at', {
      withTimezone: true,
    })
      .notNull()
      .defaultNow(),

    updatedAt: timestamp('updated_at', {
      withTimezone: true,
    })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    index('product_services_product_id_idx').on(table.productId),

    index('product_services_service_type_idx').on(table.serviceType),

    index('product_services_is_available_idx').on(table.isAvailable),

    uniqueIndex('product_services_product_display_order_unique').on(
      table.productId,
      table.displayOrder,
    ),

    check(
      'product_services_title_not_blank_check',
      sql`length(trim(${table.title})) > 0`,
    ),

    check(
      'product_services_currency_format_check',
      sql`${table.currency} ~ '^[A-Z]{3}$'`,
    ),

    check(
      'product_services_price_positive_check',
      sql`${table.priceMinor} > 0`,
    ),

    check(
      'product_services_lead_time_non_negative_check',
      sql`${table.leadTimeDays} >= 0`,
    ),

    check(
      'product_services_display_order_non_negative_check',
      sql`${table.displayOrder} >= 0`,
    ),

    check(
      'product_services_pricing_mode_check',
      sql`
        (
          (
            ${table.isIncluded} = true
            AND ${table.priceOnRequest} = false
            AND ${table.priceMinor} IS NULL
          )
          OR
          (
            ${table.isIncluded} = false
            AND ${table.priceOnRequest} = true
            AND ${table.priceMinor} IS NULL
          )
          OR
          (
            ${table.isIncluded} = false
            AND ${table.priceOnRequest} = false
            AND ${table.priceMinor} IS NOT NULL
          )
        )
      `,
    ),
  ],
);
