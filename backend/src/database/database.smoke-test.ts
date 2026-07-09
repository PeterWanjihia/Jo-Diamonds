import { randomUUID } from 'node:crypto';

import { eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/postgres-js';

import { createPostgresClient } from './database.client';
import type { Database, PostgresClient } from './database.types';
import * as schema from './schema';
import {
  collections,
  productCertificates,
  productGemstoneGroups,
  productJewelleryDetails,
  productServices,
  products,
} from './schema';
import { resolveSeedEnvironment } from './seeds/seed-environment';

const EXPECTED_PUBLIC_TABLES = [
  'collections',
  'enquiries',
  'inventory_reservations',
  'order_items',
  'orders',
  'product_certificates',
  'product_gemstone_groups',
  'product_images',
  'product_jewellery_details',
  'product_services',
  'products',
  'stripe_events',
] as const;

const EXPECTED_ENUM_ROWS = [
  {
    enumName: 'catalogue_status',
    enumValue: 'draft',
  },
  {
    enumName: 'catalogue_status',
    enumValue: 'published',
  },
  {
    enumName: 'catalogue_status',
    enumValue: 'archived',
  },

  {
    enumName: 'certification_scope',
    enumValue: 'product',
  },
  {
    enumName: 'certification_scope',
    enumValue: 'per_unit',
  },

  {
    enumName: 'enquiry_status',
    enumValue: 'new',
  },
  {
    enumName: 'enquiry_status',
    enumValue: 'contacted',
  },
  {
    enumName: 'enquiry_status',
    enumValue: 'closed',
  },
  {
    enumName: 'enquiry_status',
    enumValue: 'spam',
  },

  {
    enumName: 'gemstone_origin',
    enumValue: 'natural',
  },
  {
    enumName: 'gemstone_origin',
    enumValue: 'laboratory_grown',
  },

  {
    enumName: 'gemstone_role',
    enumValue: 'primary',
  },
  {
    enumName: 'gemstone_role',
    enumValue: 'accent',
  },

  {
    enumName: 'gemstone_specification_mode',
    enumValue: 'exact',
  },
  {
    enumName: 'gemstone_specification_mode',
    enumValue: 'approximate',
  },
  {
    enumName: 'gemstone_specification_mode',
    enumValue: 'range',
  },

  {
    enumName: 'order_status',
    enumValue: 'pending_payment',
  },
  {
    enumName: 'order_status',
    enumValue: 'paid',
  },
  {
    enumName: 'order_status',
    enumValue: 'cancelled',
  },
  {
    enumName: 'order_status',
    enumValue: 'expired',
  },
  {
    enumName: 'order_status',
    enumValue: 'fulfilled',
  },
  {
    enumName: 'order_status',
    enumValue: 'refunded',
  },

  {
    enumName: 'photography_type',
    enumValue: 'exact',
  },
  {
    enumName: 'photography_type',
    enumValue: 'representative',
  },

  {
    enumName: 'product_availability',
    enumValue: 'available',
  },
  {
    enumName: 'product_availability',
    enumValue: 'unavailable',
  },
  {
    enumName: 'product_availability',
    enumValue: 'exhausted',
  },

  {
    enumName: 'product_service_type',
    enumValue: 'resizing',
  },
  {
    enumName: 'product_service_type',
    enumValue: 'engraving',
  },
  {
    enumName: 'product_service_type',
    enumValue: 'private_viewing',
  },
  {
    enumName: 'product_service_type',
    enumValue: 'care',
  },
  {
    enumName: 'product_service_type',
    enumValue: 'personalization',
  },

  {
    enumName: 'product_status',
    enumValue: 'draft',
  },
  {
    enumName: 'product_status',
    enumValue: 'available',
  },
  {
    enumName: 'product_status',
    enumValue: 'sold',
  },
  {
    enumName: 'product_status',
    enumValue: 'archived',
  },

  {
    enumName: 'reservation_status',
    enumValue: 'active',
  },
  {
    enumName: 'reservation_status',
    enumValue: 'released',
  },
  {
    enumName: 'reservation_status',
    enumValue: 'expired',
  },
  {
    enumName: 'reservation_status',
    enumValue: 'converted',
  },

  {
    enumName: 'supply_mode',
    enumValue: 'unique',
  },
  {
    enumName: 'supply_mode',
    enumValue: 'limited',
  },
  {
    enumName: 'supply_mode',
    enumValue: 'reproducible',
  },
] as const;

const EXPECTED_ROLLBACK_MESSAGE = 'Expected database smoke-test rollback';

interface CurrentDatabaseRow {
  databaseName: string;
}

interface TableNameRow {
  tableName: string;
}

interface EnumRow {
  enumName: string;
  enumValue: string;
}

interface MigrationCountRow {
  migrationCount: number;
}

interface TableCountsRow {
  collections: number;
  products: number;
  productImages: number;
  productJewelleryDetails: number;
  productGemstoneGroups: number;
  productCertificates: number;
  productServices: number;
  orders: number;
  orderItems: number;
  inventoryReservations: number;
  stripeEvents: number;
  enquiries: number;
}

type SeedProductInsert = typeof products.$inferInsert;

function createSmokeProduct(productId: string): SeedProductInsert {
  const uniqueSuffix = productId.replaceAll('-', '').slice(0, 12).toUpperCase();

  return {
    id: productId,
    sku: `SMOKE-${uniqueSuffix}`,
    slug: `database-smoke-${uniqueSuffix.toLowerCase()}`,

    name: 'Database Smoke Test Product',

    shortDescription: 'Temporary database smoke-test product.',
    description: 'Temporary product created inside a rollback-only smoke test.',

    category: 'smoke-test',

    priceMinor: 100,
    currency: 'KES',

    supplyMode: 'unique',
    editionSize: 1,

    catalogueStatus: 'draft',
    availability: 'unavailable',
    photographyType: 'exact',

    isFeatured: false,
  };
}

describe('database smoke tests', () => {
  let client: PostgresClient | undefined;
  let database: Database | undefined;
  let connectedDatabaseName: string | undefined;

  function getClient(): PostgresClient {
    if (!client) {
      throw new Error('Database smoke-test client was not initialized');
    }

    return client;
  }

  function getDatabase(): Database {
    if (!database) {
      throw new Error('Database smoke-test connection was not initialized');
    }

    return database;
  }

  beforeAll(async () => {
    const environment = resolveSeedEnvironment(process.env);

    if (environment.nodeEnv !== 'test') {
      throw new Error(
        `Database smoke tests require NODE_ENV=test; received "${environment.nodeEnv}"`,
      );
    }

    client = createPostgresClient(environment.databaseUrl, {
      applicationName: 'jdiamonds-db-smoke',
      maxConnections: 1,
    });

    try {
      const [currentDatabase] = await client<CurrentDatabaseRow[]>`
        select current_database() as "databaseName"
      `;

      if (!currentDatabase) {
        throw new Error('Database identity query returned no result');
      }

      if (!currentDatabase.databaseName.endsWith('_test')) {
        throw new Error(
          `Refusing to run database smoke tests against non-test database "${currentDatabase.databaseName}"`,
        );
      }

      connectedDatabaseName = currentDatabase.databaseName;

      database = drizzle({
        client,
        schema,
      });
    } catch (error: unknown) {
      await client.end({
        timeout: 5,
      });

      client = undefined;
      database = undefined;
      connectedDatabaseName = undefined;

      throw error;
    }
  });

  afterAll(async () => {
    if (!client) {
      return;
    }

    await client.end({
      timeout: 5,
    });

    client = undefined;
    database = undefined;
    connectedDatabaseName = undefined;
  });

  it('connects to an isolated test database', () => {
    expect(connectedDatabaseName).toMatch(/_test$/);
  });

  it('has at least one applied Drizzle migration', async () => {
    const [row] = await getClient()<MigrationCountRow[]>`
      select count(*)::int as "migrationCount"
      from drizzle.__drizzle_migrations
    `;

    expect(row).toBeDefined();
    expect(row?.migrationCount).toBeGreaterThan(0);
  });

  it('contains every required application table', async () => {
    const rows = await getClient()<TableNameRow[]>`
      select table_name as "tableName"
      from information_schema.tables
      where table_schema = 'public'
        and table_type = 'BASE TABLE'
      order by table_name
    `;

    const actualTables = rows.map((row) => row.tableName);

    expect(actualTables).toEqual(
      expect.arrayContaining([...EXPECTED_PUBLIC_TABLES]),
    );
  });

  it('contains every expected PostgreSQL enum value', async () => {
    const rows = await getClient()<EnumRow[]>`
      select
        type_definition.typname as "enumName",
        enum_definition.enumlabel as "enumValue"
      from pg_type type_definition
      inner join pg_enum enum_definition
        on enum_definition.enumtypid = type_definition.oid
      inner join pg_namespace namespace_definition
        on namespace_definition.oid =
          type_definition.typnamespace
      where namespace_definition.nspname = 'public'
      order by
        type_definition.typname,
        enum_definition.enumsortorder
    `;

    expect(rows).toEqual(expect.arrayContaining([...EXPECTED_ENUM_ROWS]));
  });

  it('can read from every application table', async () => {
    const [counts] = await getClient()<TableCountsRow[]>`
      select
        (select count(*)::int from collections)
          as "collections",
        (select count(*)::int from products)
          as "products",
        (select count(*)::int from product_images)
          as "productImages",
        (select count(*)::int from product_jewellery_details)
          as "productJewelleryDetails",
        (select count(*)::int from product_gemstone_groups)
          as "productGemstoneGroups",
        (select count(*)::int from product_certificates)
          as "productCertificates",
        (select count(*)::int from product_services)
          as "productServices",
        (select count(*)::int from orders)
          as "orders",
        (select count(*)::int from order_items)
          as "orderItems",
        (select count(*)::int from inventory_reservations)
          as "inventoryReservations",
        (select count(*)::int from stripe_events)
          as "stripeEvents",
        (select count(*)::int from enquiries)
          as "enquiries"
    `;

    if (!counts) {
      throw new Error('Database table-count query returned no result');
    }

    for (const count of Object.values(counts)) {
      expect(Number.isInteger(count)).toBe(true);
      expect(count).toBeGreaterThanOrEqual(0);
    }
  });

  it('supports write, read and rollback semantics', async () => {
    const productId = randomUUID();
    const product = createSmokeProduct(productId);
    const smokeDatabase = getDatabase();

    await expect(
      smokeDatabase.transaction(async (transaction): Promise<void> => {
        await transaction.insert(products).values(product);

        const [insertedProduct] = await transaction
          .select({
            id: products.id,
            sku: products.sku,
            supplyMode: products.supplyMode,
            catalogueStatus: products.catalogueStatus,
            availability: products.availability,
          })
          .from(products)
          .where(eq(products.id, productId));

        expect(insertedProduct).toEqual({
          id: productId,
          sku: product.sku,
          supplyMode: 'unique',
          catalogueStatus: 'draft',
          availability: 'unavailable',
        });

        throw new Error(EXPECTED_ROLLBACK_MESSAGE);
      }),
    ).rejects.toThrow(EXPECTED_ROLLBACK_MESSAGE);

    const persistedRows = await smokeDatabase
      .select({
        id: products.id,
      })
      .from(products)
      .where(eq(products.id, productId));

    expect(persistedRows).toHaveLength(0);
  });

  it('sets product collection_id to null when its collection is deleted', async () => {
    const collectionId = randomUUID();
    const productId = randomUUID();
    const product = createSmokeProduct(productId);
    const smokeDatabase = getDatabase();

    const uniqueSuffix = collectionId
      .replaceAll('-', '')
      .slice(0, 12)
      .toLowerCase();

    await expect(
      smokeDatabase.transaction(async (transaction): Promise<void> => {
        await transaction.insert(collections).values({
          id: collectionId,
          slug: `smoke-collection-${uniqueSuffix}`,
          name: `Smoke Collection ${uniqueSuffix}`,
          description: 'Temporary smoke-test collection.',
        });

        await transaction.insert(products).values({
          ...product,
          collectionId,
        });

        await transaction
          .delete(collections)
          .where(eq(collections.id, collectionId));

        const [updatedProduct] = await transaction
          .select({
            collectionId: products.collectionId,
          })
          .from(products)
          .where(eq(products.id, productId));

        expect(updatedProduct).toEqual({
          collectionId: null,
        });

        throw new Error(EXPECTED_ROLLBACK_MESSAGE);
      }),
    ).rejects.toThrow(EXPECTED_ROLLBACK_MESSAGE);
  });

  it('cascades product deletion to catalogue child records', async () => {
    const productId = randomUUID();
    const product = createSmokeProduct(productId);
    const smokeDatabase = getDatabase();

    await expect(
      smokeDatabase.transaction(async (transaction): Promise<void> => {
        await transaction.insert(products).values(product);

        await transaction.insert(productJewelleryDetails).values({
          productId,
          metalType: 'gold',
          metalPurity: '18K',
          metalColour: 'white',
          totalWeightGrams: 1,
        });

        await transaction.insert(productGemstoneGroups).values({
          productId,
          role: 'primary',
          gemstoneType: 'diamond',
          origin: 'natural',
          specificationMode: 'exact',
          quantity: 1,
          totalCaratWeight: 1,
          displayOrder: 0,
        });

        await transaction.insert(productCertificates).values({
          productId,
          scope: 'product',
          certificateType: 'smoke-test grading report',
          issuer: 'Smoke Test Issuer',
          certificateNumber: `CERT-${productId}`,
          displayOrder: 0,
        });

        await transaction.insert(productServices).values({
          productId,
          serviceType: 'care',
          title: 'Smoke-test jewellery care',
          isAvailable: true,
          isIncluded: true,
          priceOnRequest: false,
          priceMinor: null,
          currency: 'KES',
          displayOrder: 0,
        });

        await transaction.delete(products).where(eq(products.id, productId));

        const jewelleryDetailsRows = await transaction
          .select({
            productId: productJewelleryDetails.productId,
          })
          .from(productJewelleryDetails)
          .where(eq(productJewelleryDetails.productId, productId));

        const gemstoneGroupRows = await transaction
          .select({
            id: productGemstoneGroups.id,
          })
          .from(productGemstoneGroups)
          .where(eq(productGemstoneGroups.productId, productId));

        const certificateRows = await transaction
          .select({
            id: productCertificates.id,
          })
          .from(productCertificates)
          .where(eq(productCertificates.productId, productId));

        const serviceRows = await transaction
          .select({
            id: productServices.id,
          })
          .from(productServices)
          .where(eq(productServices.productId, productId));

        expect(jewelleryDetailsRows).toHaveLength(0);
        expect(gemstoneGroupRows).toHaveLength(0);
        expect(certificateRows).toHaveLength(0);
        expect(serviceRows).toHaveLength(0);

        throw new Error(EXPECTED_ROLLBACK_MESSAGE);
      }),
    ).rejects.toThrow(EXPECTED_ROLLBACK_MESSAGE);
  });

  it('rejects an invalid product supply configuration', async () => {
    const productId = randomUUID();
    const smokeDatabase = getDatabase();

    let rejectedError: unknown;

    try {
      await smokeDatabase.insert(products).values({
        ...createSmokeProduct(productId),
        supplyMode: 'unique',
        editionSize: 5,
      });
    } catch (error: unknown) {
      rejectedError = error;
    }

    expect(rejectedError).toBeDefined();

    expect(rejectedError).toMatchObject({
      cause: {
        code: '23514',
        constraint_name: 'products_supply_mode_edition_size_check',
      },
    });

    const persistedRows = await smokeDatabase
      .select({
        id: products.id,
      })
      .from(products)
      .where(eq(products.id, productId));

    expect(persistedRows).toHaveLength(0);
  });
});
