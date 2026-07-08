import { sql } from 'drizzle-orm';
import {
  check,
  index,
  integer,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from 'drizzle-orm/pg-core';

import { certificationScopeEnum } from './enums.schema';
import { products } from './products.schema';

export const productCertificates = pgTable(
  'product_certificates',
  {
    id: uuid('id').defaultRandom().primaryKey(),

    productId: uuid('product_id')
      .notNull()
      .references(() => products.id, {
        onDelete: 'cascade',
      }),

    scope: certificationScopeEnum('scope').notNull(),

    certificateType: text('certificate_type').notNull(),

    issuer: text('issuer').notNull(),

    certificateNumber: text('certificate_number'),

    verificationUrl: text('verification_url'),

    documentUrl: text('document_url'),

    issuedAt: timestamp('issued_at', {
      withTimezone: true,
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
    index('product_certificates_product_id_idx').on(table.productId),

    index('product_certificates_scope_idx').on(table.scope),

    index('product_certificates_issuer_idx').on(table.issuer),

    uniqueIndex('product_certificates_product_display_order_unique').on(
      table.productId,
      table.displayOrder,
    ),

    uniqueIndex('product_certificates_issuer_number_unique')
      .on(table.issuer, table.certificateNumber)
      .where(sql`${table.certificateNumber} IS NOT NULL`),

    check(
      'product_certificates_display_order_non_negative_check',
      sql`${table.displayOrder} >= 0`,
    ),

    check(
      'product_certificates_type_not_blank_check',
      sql`length(trim(${table.certificateType})) > 0`,
    ),

    check(
      'product_certificates_issuer_not_blank_check',
      sql`length(trim(${table.issuer})) > 0`,
    ),

    check(
      'product_certificates_number_not_blank_check',
      sql`
        ${table.certificateNumber} IS NULL
        OR length(trim(${table.certificateNumber})) > 0
      `,
    ),

    check(
      'product_certificates_scope_number_check',
      sql`
        (
          ${table.scope} = 'product'
          OR
          (
            ${table.scope} = 'per_unit'
            AND ${table.certificateNumber} IS NULL
          )
        )
      `,
    ),
  ],
);
