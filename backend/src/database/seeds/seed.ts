import 'dotenv/config';

import { eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/postgres-js';

import { createPostgresClient } from '../database.client';
import * as schema from '../schema';
import {
  collections,
  productCertificates,
  productGemstoneGroups,
  productImages,
  productJewelleryDetails,
  productServices,
  products,
} from '../schema';
import {
  certificatesBySku,
  collectionFixtures,
  gemstoneGroupsBySku,
  jewelleryDetailsBySku,
  productCollectionIdBySku,
  servicesBySku,
} from './catalogue-relations.fixtures';
import {
  catalogueFixtures,
  catalogueSeedTimestamp,
} from './catalogue.fixtures';
import { resolveSeedEnvironment } from './seed-environment';

interface CurrentDatabaseRow {
  databaseName: string;
}

interface SeedResult {
  collections: number;
  products: number;
  images: number;
  jewelleryDetails: number;
  gemstoneGroups: number;
  certificates: number;
  services: number;
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
        let collectionCount = 0;
        let productCount = 0;
        let imageCount = 0;
        let jewelleryDetailsCount = 0;
        let gemstoneGroupCount = 0;
        let certificateCount = 0;
        let serviceCount = 0;

        for (const fixture of collectionFixtures) {
          await transaction
            .insert(collections)
            .values({
              ...fixture,
              createdAt: catalogueSeedTimestamp,
              updatedAt: catalogueSeedTimestamp,
            })
            .onConflictDoUpdate({
              target: collections.slug,
              set: {
                name: fixture.name,
                description: fixture.description,
                updatedAt: catalogueSeedTimestamp,
              },
            });

          collectionCount += 1;
        }

        for (const fixture of catalogueFixtures) {
          const sku = fixture.product.sku;
          const collectionId = productCollectionIdBySku[sku];

          if (!collectionId) {
            throw new Error(`No collection assignment found for SKU "${sku}"`);
          }

          const jewelleryDetails = jewelleryDetailsBySku[sku];

          if (!jewelleryDetails) {
            throw new Error(`No jewellery details found for SKU "${sku}"`);
          }

          const gemstoneGroups = gemstoneGroupsBySku[sku] ?? [];
          const certificates = certificatesBySku[sku] ?? [];
          const services = servicesBySku[sku] ?? [];

          const [seededProduct] = await transaction
            .insert(products)
            .values({
              ...fixture.product,
              collectionId,
              createdAt: catalogueSeedTimestamp,
              updatedAt: catalogueSeedTimestamp,
            })
            .onConflictDoUpdate({
              target: products.sku,
              set: {
                slug: fixture.product.slug,
                name: fixture.product.name,

                shortDescription: fixture.product.shortDescription,
                description: fixture.product.description,
                designStory: fixture.product.designStory,

                category: fixture.product.category,
                collectionId,

                priceMinor: fixture.product.priceMinor,
                currency: fixture.product.currency,

                status: fixture.product.status,

                supplyMode: fixture.product.supplyMode,
                editionSize: fixture.product.editionSize,
                catalogueStatus: fixture.product.catalogueStatus,
                availability: fixture.product.availability,
                photographyType: fixture.product.photographyType,

                isFeatured: fixture.product.isFeatured,
                updatedAt: catalogueSeedTimestamp,
              },
            })
            .returning({
              id: products.id,
            });

          if (!seededProduct) {
            throw new Error(`Product upsert returned no row for SKU "${sku}"`);
          }

          await transaction
            .delete(productImages)
            .where(eq(productImages.productId, seededProduct.id));

          await transaction
            .delete(productJewelleryDetails)
            .where(eq(productJewelleryDetails.productId, seededProduct.id));

          await transaction
            .delete(productGemstoneGroups)
            .where(eq(productGemstoneGroups.productId, seededProduct.id));

          await transaction
            .delete(productCertificates)
            .where(eq(productCertificates.productId, seededProduct.id));

          await transaction
            .delete(productServices)
            .where(eq(productServices.productId, seededProduct.id));

          await transaction.insert(productImages).values(
            fixture.images.map((image) => ({
              ...image,
              productId: seededProduct.id,
              createdAt: catalogueSeedTimestamp,
            })),
          );

          await transaction.insert(productJewelleryDetails).values({
            ...jewelleryDetails,
            productId: seededProduct.id,
          });

          if (gemstoneGroups.length > 0) {
            await transaction.insert(productGemstoneGroups).values(
              gemstoneGroups.map((group) => ({
                ...group,
                productId: seededProduct.id,
                createdAt: catalogueSeedTimestamp,
                updatedAt: catalogueSeedTimestamp,
              })),
            );
          }

          if (certificates.length > 0) {
            await transaction.insert(productCertificates).values(
              certificates.map((certificate) => ({
                ...certificate,
                productId: seededProduct.id,
                createdAt: catalogueSeedTimestamp,
                updatedAt: catalogueSeedTimestamp,
              })),
            );
          }

          if (services.length > 0) {
            await transaction.insert(productServices).values(
              services.map((service) => ({
                ...service,
                productId: seededProduct.id,
                createdAt: catalogueSeedTimestamp,
                updatedAt: catalogueSeedTimestamp,
              })),
            );
          }

          productCount += 1;
          imageCount += fixture.images.length;
          jewelleryDetailsCount += 1;
          gemstoneGroupCount += gemstoneGroups.length;
          certificateCount += certificates.length;
          serviceCount += services.length;
        }

        return {
          collections: collectionCount,
          products: productCount,
          images: imageCount,
          jewelleryDetails: jewelleryDetailsCount,
          gemstoneGroups: gemstoneGroupCount,
          certificates: certificateCount,
          services: serviceCount,
        };
      },
    );

    console.log(`Seeded ${result.collections} collections.`);
    console.log(`Seeded ${result.products} products.`);
    console.log(`Seeded ${result.images} product images.`);
    console.log(`Seeded ${result.jewelleryDetails} jewellery detail records.`);
    console.log(`Seeded ${result.gemstoneGroups} gemstone groups.`);
    console.log(`Seeded ${result.certificates} certificates.`);
    console.log(`Seeded ${result.services} product services.`);
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
