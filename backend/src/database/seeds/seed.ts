import 'dotenv/config';

import { eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/postgres-js';

import { createPostgresClient } from '../database.client';
import * as schema from '../schema';
import { productImages, products } from '../schema';
import {
  catalogueFixtures,
  catalogueSeedTimestamp,
} from './catalogue.fixtures';
import { resolveSeedEnvironment } from './seed-environment';

interface CurrentDatabaseRow {
  databaseName: string;
}

interface SeedResult {
  products: number;
  images: number;
}

async function seedDatabase(): Promise<void> {
  const environment = resolveSeedEnvironment(process.env);

  const client = createPostgresClient(environment.databaseUrl, {
    applicationName: 'jdiamonds-seed',
    maxConnections: 1,
  });

  const database = drizzle({
    client,
    schema,
  });

  try {
    const [currentDatabase] = await client<CurrentDatabaseRow[]>`
      select current_database() as "databaseName"
    `;

    if (!currentDatabase) {
      throw new Error('Database identity query returned no result');
    }

    console.log(
      `Seeding "${currentDatabase.databaseName}" in ${environment.nodeEnv} mode...`,
    );

    const result = await database.transaction(
      async (transaction): Promise<SeedResult> => {
        let productCount = 0;
        let imageCount = 0;

        for (const fixture of catalogueFixtures) {
          const [seededProduct] = await transaction
            .insert(products)
            .values({
              ...fixture.product,
              createdAt: catalogueSeedTimestamp,
              updatedAt: catalogueSeedTimestamp,
            })
            .onConflictDoUpdate({
              target: products.sku,
              set: {
                slug: fixture.product.slug,
                name: fixture.product.name,
                description: fixture.product.description,
                category: fixture.product.category,
                priceMinor: fixture.product.priceMinor,
                currency: fixture.product.currency,
                status: fixture.product.status,
                isFeatured: fixture.product.isFeatured,
                updatedAt: catalogueSeedTimestamp,
              },
            })
            .returning({
              id: products.id,
            });

          if (!seededProduct) {
            throw new Error(
              `Product upsert returned no row for SKU "${fixture.product.sku}"`,
            );
          }

          await transaction
            .delete(productImages)
            .where(eq(productImages.productId, seededProduct.id));

          await transaction.insert(productImages).values(
            fixture.images.map((image) => ({
              ...image,
              productId: seededProduct.id,
              createdAt: catalogueSeedTimestamp,
            })),
          );

          productCount += 1;
          imageCount += fixture.images.length;
        }

        return {
          products: productCount,
          images: imageCount,
        };
      },
    );

    console.log(`Seeded ${result.products} products.`);
    console.log(`Seeded ${result.images} product images.`);
    console.log('Database seed completed successfully.');
  } finally {
    await client.end({
      timeout: 5,
    });

    console.log('Seed database connections closed.');
  }
}

void seedDatabase().catch((error: unknown) => {
  console.error('Database seed failed.');

  if (error instanceof Error) {
    console.error(error.stack ?? error.message);
  } else {
    console.error(String(error));
  }

  process.exitCode = 1;
});
