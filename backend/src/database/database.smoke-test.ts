import { randomUUID } from 'node:crypto';

import { eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/postgres-js';

import { createPostgresClient } from './database.client';
import type { Database, PostgresClient } from './database.types';
import * as schema from './schema';
import { products } from './schema';
import { resolveSeedEnvironment } from './seeds/seed-environment';

const EXPECTED_PUBLIC_TABLES = [
  'enquiries',
  'inventory_reservations',
  'order_items',
  'orders',
  'product_images',
  'products',
  'stripe_events',
] as const;

const EXPECTED_ENUM_ROWS = [
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
  products: number;
  productImages: number;
  orders: number;
  orderItems: number;
  inventoryReservations: number;
  stripeEvents: number;
  enquiries: number;
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

  it('contains the expected PostgreSQL enum values', async () => {
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
        (select count(*)::int from products)
          as "products",
        (select count(*)::int from product_images)
          as "productImages",
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
    const uniqueSuffix = productId
      .replaceAll('-', '')
      .slice(0, 12)
      .toUpperCase();

    const sku = `SMOKE-${uniqueSuffix}`;
    const slug = `database-smoke-${uniqueSuffix.toLowerCase()}`;
    const smokeDatabase = getDatabase();

    await expect(
      smokeDatabase.transaction(async (transaction): Promise<void> => {
        await transaction.insert(products).values({
          id: productId,
          sku,
          slug,
          name: 'Database Smoke Test Product',

          shortDescription: 'Temporary database smoke-test product.',
          description:
            'Temporary product created inside a rollback-only smoke test.',

          category: 'smoke-test',

          priceMinor: 100,
          currency: 'KES',

          status: 'draft',

          supplyMode: 'unique',
          editionSize: 1,
          catalogueStatus: 'draft',
          availability: 'unavailable',
          photographyType: 'exact',

          isFeatured: false,
        });

        const [insertedProduct] = await transaction
          .select({
            id: products.id,
            sku: products.sku,
          })
          .from(products)
          .where(eq(products.id, productId));

        expect(insertedProduct).toEqual({
          id: productId,
          sku,
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
});
