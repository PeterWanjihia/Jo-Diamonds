import { sql } from 'drizzle-orm';
import {
  boolean,
  check,
  numeric,
  pgTable,
  text,
  uuid,
} from 'drizzle-orm/pg-core';

import { products } from './products.schema';

export const productJewelleryDetails = pgTable(
  'product_jewellery_details',
  {
    productId: uuid('product_id')
      .primaryKey()
      .references(() => products.id, {
        onDelete: 'cascade',
      }),

    metalType: text('metal_type'),
    metalPurity: text('metal_purity'),
    metalColour: text('metal_colour'),

    totalWeightGrams: numeric('total_weight_grams', {
      precision: 10,
      scale: 3,
      mode: 'number',
    }),

    widthMm: numeric('width_mm', {
      precision: 10,
      scale: 2,
      mode: 'number',
    }),

    heightMm: numeric('height_mm', {
      precision: 10,
      scale: 2,
      mode: 'number',
    }),

    depthMm: numeric('depth_mm', {
      precision: 10,
      scale: 2,
      mode: 'number',
    }),

    lengthMm: numeric('length_mm', {
      precision: 10,
      scale: 2,
      mode: 'number',
    }),

    settingStyle: text('setting_style'),

    sizeSystem: text('size_system'),
    sizeValue: text('size_value'),

    resizable: boolean('resizable').notNull().default(false),
    resizeMin: text('resize_min'),
    resizeMax: text('resize_max'),
    resizeNotes: text('resize_notes'),

    adjustable: boolean('adjustable').notNull().default(false),

    claspType: text('clasp_type'),
    backingType: text('backing_type'),
    soldAs: text('sold_as'),
  },
  (table) => [
    check(
      'product_jewellery_details_total_weight_positive_check',
      sql`${table.totalWeightGrams} > 0`,
    ),

    check(
      'product_jewellery_details_width_positive_check',
      sql`${table.widthMm} > 0`,
    ),

    check(
      'product_jewellery_details_height_positive_check',
      sql`${table.heightMm} > 0`,
    ),

    check(
      'product_jewellery_details_depth_positive_check',
      sql`${table.depthMm} > 0`,
    ),

    check(
      'product_jewellery_details_length_positive_check',
      sql`${table.lengthMm} > 0`,
    ),
  ],
);
