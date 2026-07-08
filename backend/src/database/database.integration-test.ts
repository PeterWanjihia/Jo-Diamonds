import type { INestApplicationContext } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { sql } from 'drizzle-orm';

import { AppModule } from '../app.module';
import { DATABASE_CONNECTION } from './database.constants';
import type { Database } from './database.types';
import { products } from './schema';

describe('DatabaseModule integration', () => {
  let application: INestApplicationContext;
  let database: Database;

  beforeAll(async () => {
    application = await NestFactory.createApplicationContext(AppModule, {
      logger: false,
    });

    database = application.get<Database>(DATABASE_CONNECTION);
  });

  afterAll(async () => {
    await application.close();
  });

  it('exposes one shared Drizzle database instance', () => {
    const first = application.get<Database>(DATABASE_CONNECTION);
    const second = application.get<Database>(DATABASE_CONNECTION);

    expect(first).toBe(second);
  });

  it('connects to the isolated test database', async () => {
    const rows = await database.execute(
      sql<{ databaseName: string }>`
        select current_database() as "databaseName"
      `,
    );

    expect(rows[0]?.databaseName).toBe('jdiamonds_test');
  });

  it('queries the migrated products table through Drizzle', async () => {
    const rows = await database
      .select({
        id: products.id,
      })
      .from(products)
      .limit(1);

    expect(Array.isArray(rows)).toBe(true);
  });
});
