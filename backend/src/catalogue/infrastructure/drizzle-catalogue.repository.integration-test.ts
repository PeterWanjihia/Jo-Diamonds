import { Test, type TestingModule } from '@nestjs/testing';

import { AppModule } from '../../app.module';
import { CATALOGUE_REPOSITORY } from '../catalogue.constants';
import type { CatalogueRepository } from '../domain';
import { DrizzleCatalogueRepository } from './drizzle-catalogue.repository';

describe('DrizzleCatalogueRepository integration', () => {
  let testingModule: TestingModule;
  let repository: CatalogueRepository;

  beforeAll(async () => {
    testingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    repository = testingModule.get<CatalogueRepository>(CATALOGUE_REPOSITORY);
  });

  afterAll(async () => {
    await testingModule.close();
  });

  it('resolves the Drizzle repository implementation', () => {
    expect(repository).toBeInstanceOf(DrizzleCatalogueRepository);
  });

  it('lists only published product summaries', async () => {
    const products = await repository.listPublicProductSummaries();

    expect(products).toHaveLength(3);

    expect(products.map((product) => product.slug)).toEqual([
      'classic-round-solitaire-ring',
      'emerald-cut-diamond-pendant',
      'halo-diamond-stud-earrings',
    ]);

    expect(
      products.every((product) => product.catalogueStatus === 'published'),
    ).toBe(true);

    expect(
      products.some((product) => product.slug === 'diamond-tennis-bracelet'),
    ).toBe(false);

    expect(
      products.some((product) => product.slug === 'vintage-oval-halo-ring'),
    ).toBe(false);
  });

  it('keeps a published exhausted product in public listings', async () => {
    const products = await repository.listPublicProductSummaries();

    const emeraldPendant = products.find(
      (product) => product.slug === 'emerald-cut-diamond-pendant',
    );

    expect(emeraldPendant).toBeDefined();

    expect(emeraldPendant).toMatchObject({
      sku: 'JD-NEC-EMR-001',
      catalogueStatus: 'published',
      availability: 'exhausted',
      supply: {
        mode: 'unique',
        editionSize: 1,
      },
    });
  });

  it('maps collection references and primary images', async () => {
    const products = await repository.listPublicProductSummaries();

    const solitaire = products.find(
      (product) => product.slug === 'classic-round-solitaire-ring',
    );

    expect(solitaire).toBeDefined();

    expect(solitaire?.collection).toEqual({
      id: '30000000-0000-4000-8000-000000000001',
      slug: 'signature-solitaires',
      name: 'Signature Solitaires',
    });

    expect(solitaire?.primaryImage).toMatchObject({
      id: '20000000-0000-4000-8000-000000000001',
      url: '/images/catalogue/seed/classic-round-solitaire-ring-01.webp',
      altText: 'Classic round solitaire diamond ring',
      sortOrder: 0,
      isPrimary: true,
    });
  });

  it('lists published products belonging to a collection', async () => {
    const signatureProducts =
      await repository.listPublicProductSummariesByCollectionSlug(
        'signature-solitaires',
      );

    expect(signatureProducts.map((product) => product.slug)).toEqual([
      'classic-round-solitaire-ring',
      'emerald-cut-diamond-pendant',
    ]);

    const modernProducts =
      await repository.listPublicProductSummariesByCollectionSlug(
        'modern-icons',
      );

    expect(modernProducts.map((product) => product.slug)).toEqual([
      'halo-diamond-stud-earrings',
    ]);

    expect(
      modernProducts.some(
        (product) => product.slug === 'diamond-tennis-bracelet',
      ),
    ).toBe(false);
  });

  it('returns an empty list when a collection has no published products', async () => {
    const products =
      await repository.listPublicProductSummariesByCollectionSlug(
        'heritage-halo',
      );

    expect(products).toEqual([]);
  });

  it('loads the complete solitaire product aggregate', async () => {
    const aggregate = await repository.findProductAggregateBySlug(
      'classic-round-solitaire-ring',
    );

    expect(aggregate).not.toBeNull();

    if (aggregate === null) {
      throw new Error('Expected seeded solitaire aggregate to exist');
    }

    expect(aggregate.product).toMatchObject({
      id: '10000000-0000-4000-8000-000000000001',
      slug: 'classic-round-solitaire-ring',
      sku: 'JD-RNG-SOL-001',

      price: {
        minor: 45_000_000,
        currency: 'KES',
      },

      supply: {
        mode: 'unique',
        editionSize: 1,
      },

      catalogueStatus: 'published',
      availability: 'available',
      photographyType: 'exact',
      isFeatured: true,
    });

    expect(aggregate.collection).toMatchObject({
      id: '30000000-0000-4000-8000-000000000001',
      slug: 'signature-solitaires',
      name: 'Signature Solitaires',
    });

    expect(aggregate.images).toHaveLength(2);

    expect(aggregate.images.map((image) => image.sortOrder)).toEqual([0, 1]);

    expect(aggregate.images[0]).toMatchObject({
      id: '20000000-0000-4000-8000-000000000001',
      isPrimary: true,
    });

    expect(aggregate.jewelleryDetails).toMatchObject({
      metalType: 'gold',
      metalPurity: '18K',
      metalColour: 'white',
      totalWeightGrams: 4.82,
      settingStyle: 'six-prong solitaire',
      sizeSystem: 'US',
      sizeValue: '6.5',
      resizable: true,
      soldAs: 'single ring',
    });

    expect(aggregate.gemstoneGroups).toHaveLength(1);

    expect(aggregate.gemstoneGroups[0]).toMatchObject({
      role: 'primary',
      gemstoneType: 'diamond',
      origin: 'natural',
      quantity: 1,
      shape: 'round',

      caratClaim: {
        mode: 'exact',
        totalCaratWeight: 1.25,
      },
    });

    expect(aggregate.certificates).toHaveLength(1);

    expect(aggregate.certificates[0]).toMatchObject({
      scope: 'product',
      certificateType: 'diamond grading report',
      issuer: 'GIA',
      certificateNumber: 'GIA-JD-SOL-001',
    });

    expect(aggregate.services).toHaveLength(3);

    expect(aggregate.services.map((service) => service.serviceType)).toEqual([
      'care',
      'resizing',
      'engraving',
    ]);

    expect(aggregate.services.map((service) => service.pricing.mode)).toEqual([
      'included',
      'on_request',
      'fixed',
    ]);

    expect(aggregate.services[2]?.pricing).toEqual({
      mode: 'fixed',
      price: {
        minor: 150_000,
        currency: 'KES',
      },
    });
  });

  it('can load draft and archived aggregates internally', async () => {
    const draft = await repository.findProductAggregateBySlug(
      'diamond-tennis-bracelet',
    );

    const archived = await repository.findProductAggregateBySlug(
      'vintage-oval-halo-ring',
    );

    expect(draft?.product.catalogueStatus).toBe('draft');

    expect(archived?.product.catalogueStatus).toBe('archived');
  });

  it('returns null for an unknown product slug', async () => {
    await expect(
      repository.findProductAggregateBySlug('missing-catalogue-product'),
    ).resolves.toBeNull();
  });

  it('lists and finds seeded collections', async () => {
    const collections = await repository.listCollections();

    expect(collections.map((collection) => collection.slug)).toEqual([
      'heritage-halo',
      'modern-icons',
      'signature-solitaires',
    ]);

    await expect(
      repository.findCollectionBySlug('signature-solitaires'),
    ).resolves.toMatchObject({
      id: '30000000-0000-4000-8000-000000000001',
      slug: 'signature-solitaires',
      name: 'Signature Solitaires',
    });

    await expect(
      repository.findCollectionBySlug('missing-collection'),
    ).resolves.toBeNull();
  });
});
