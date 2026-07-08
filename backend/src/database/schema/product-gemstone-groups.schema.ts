import { sql } from 'drizzle-orm';
import {
  check,
  index,
  integer,
  numeric,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from 'drizzle-orm/pg-core';

import {
  gemstoneOriginEnum,
  gemstoneRoleEnum,
  gemstoneSpecificationModeEnum,
} from './enums.schema';
import { products } from './products.schema';

export const productGemstoneGroups = pgTable(
  'product_gemstone_groups',
  {
    id: uuid('id').defaultRandom().primaryKey(),

    productId: uuid('product_id')
      .notNull()
      .references(() => products.id, {
        onDelete: 'cascade',
      }),

    role: gemstoneRoleEnum('role').notNull(),

    gemstoneType: text('gemstone_type').notNull(),

    origin: gemstoneOriginEnum('origin').notNull(),

    specificationMode:
      gemstoneSpecificationModeEnum('specification_mode').notNull(),

    quantity: integer('quantity').notNull().default(1),

    shape: text('shape'),
    colour: text('colour'),
    clarity: text('clarity'),
    cutGrade: text('cut_grade'),
    treatment: text('treatment'),

    totalCaratWeight: numeric('total_carat_weight', {
      precision: 10,
      scale: 3,
      mode: 'number',
    }),

    minimumTotalCaratWeight: numeric('minimum_total_carat_weight', {
      precision: 10,
      scale: 3,
      mode: 'number',
    }),

    maximumTotalCaratWeight: numeric('maximum_total_carat_weight', {
      precision: 10,
      scale: 3,
      mode: 'number',
    }),

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
    index('product_gemstone_groups_product_id_idx').on(table.productId),

    index('product_gemstone_groups_role_idx').on(table.role),

    uniqueIndex('product_gemstone_groups_product_display_order_unique').on(
      table.productId,
      table.displayOrder,
    ),

    check(
      'product_gemstone_groups_quantity_positive_check',
      sql`${table.quantity} > 0`,
    ),

    check(
      'product_gemstone_groups_display_order_non_negative_check',
      sql`${table.displayOrder} >= 0`,
    ),

    check(
      'product_gemstone_groups_total_carat_positive_check',
      sql`${table.totalCaratWeight} > 0`,
    ),

    check(
      'product_gemstone_groups_minimum_carat_positive_check',
      sql`${table.minimumTotalCaratWeight} > 0`,
    ),

    check(
      'product_gemstone_groups_maximum_carat_positive_check',
      sql`${table.maximumTotalCaratWeight} > 0`,
    ),

    check(
      'product_gemstone_groups_carat_claim_check',
      sql`
        (
          (
            ${table.specificationMode} IN ('exact', 'approximate')
            AND ${table.totalCaratWeight} IS NOT NULL
            AND ${table.minimumTotalCaratWeight} IS NULL
            AND ${table.maximumTotalCaratWeight} IS NULL
          )
          OR
          (
            ${table.specificationMode} = 'range'
            AND ${table.totalCaratWeight} IS NULL
            AND ${table.minimumTotalCaratWeight} IS NOT NULL
            AND ${table.maximumTotalCaratWeight} IS NOT NULL
            AND ${table.minimumTotalCaratWeight}
              <= ${table.maximumTotalCaratWeight}
          )
        )
      `,
    ),
  ],
);
