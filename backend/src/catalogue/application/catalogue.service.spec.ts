import type {
  CatalogueCollection,
  CatalogueProduct,
  CatalogueProductAggregate,
  CatalogueProductSummary,
  CatalogueRepository,
} from '../domain';
import {
  CatalogueCollectionNotFoundError,
  CatalogueProductNotFoundError,
} from './catalogue.errors';
import { CatalogueService } from './catalogue.service';

const timestamp = new Date('2026-07-01T00:00:00.000Z');

function createProduct(
  overrides: Partial<CatalogueProduct> = {},
): CatalogueProduct {
  return {
    id: '10000000-0000-4000-8000-000000000001',

    slug: 'classic-round-solitaire-ring',
    sku: 'JD-RNG-SOL-001',

    name: 'Classic Round Solitaire Ring',
    shortDescription: 'A refined round-cut solitaire ring.',
    description: 'A refined round-cut solitaire ring in a six-prong setting.',
    designStory: null,

    category: 'rings',
    collectionId: null,

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

    createdAt: timestamp,
    updatedAt: timestamp,

    ...overrides,
  };
}

function createAggregate(
  productOverrides: Partial<CatalogueProduct> = {},
): CatalogueProductAggregate {
  return {
    product: createProduct(productOverrides),
    collection: null,
    images: [],
    jewelleryDetails: null,
    gemstoneGroups: [],
    certificates: [],
    services: [],
  };
}

function createSummary(
  overrides: Partial<CatalogueProductSummary> = {},
): CatalogueProductSummary {
  return {
    id: '10000000-0000-4000-8000-000000000001',

    slug: 'classic-round-solitaire-ring',
    sku: 'JD-RNG-SOL-001',

    name: 'Classic Round Solitaire Ring',
    shortDescription: 'A refined round-cut solitaire ring.',
    category: 'rings',

    collection: null,

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
    primaryImage: null,

    ...overrides,
  };
}

function createCollection(
  overrides: Partial<CatalogueCollection> = {},
): CatalogueCollection {
  return {
    id: '20000000-0000-4000-8000-000000000001',
    slug: 'signature-solitaires',
    name: 'Signature Solitaires',
    description: 'A collection of refined solitaire pieces.',
    createdAt: timestamp,
    updatedAt: timestamp,
    ...overrides,
  };
}

describe('CatalogueService', () => {
  let repository: jest.Mocked<CatalogueRepository>;
  let service: CatalogueService;

  beforeEach(() => {
    repository = {
      listPublicProductSummaries: jest.fn(),
      listPublicProductSummariesByCollectionSlug: jest.fn(),
      findProductAggregateBySlug: jest.fn(),
      listCollections: jest.fn(),
      findCollectionBySlug: jest.fn(),
    };

    service = new CatalogueService(repository);
  });

  describe('listPublicProducts', () => {
    it('returns published product summaries', async () => {
      const publishedProduct = createSummary();

      repository.listPublicProductSummaries.mockResolvedValue([
        publishedProduct,
      ]);

      await expect(service.listPublicProducts()).resolves.toEqual([
        publishedProduct,
      ]);

      expect(repository.listPublicProductSummaries.mock.calls).toHaveLength(1);
    });

    it('defensively removes draft and archived products', async () => {
      const publishedProduct = createSummary();

      const draftProduct = createSummary({
        id: '10000000-0000-4000-8000-000000000002',
        slug: 'draft-product',
        catalogueStatus: 'draft',
      });

      const archivedProduct = createSummary({
        id: '10000000-0000-4000-8000-000000000003',
        slug: 'archived-product',
        catalogueStatus: 'archived',
      });

      repository.listPublicProductSummaries.mockResolvedValue([
        publishedProduct,
        draftProduct,
        archivedProduct,
      ]);

      await expect(service.listPublicProducts()).resolves.toEqual([
        publishedProduct,
      ]);
    });

    it('keeps published exhausted products in the public list', async () => {
      const soldProduct = createSummary({
        availability: 'exhausted',
      });

      repository.listPublicProductSummaries.mockResolvedValue([soldProduct]);

      await expect(service.listPublicProducts()).resolves.toEqual([
        soldProduct,
      ]);
    });
  });

  describe('getPublicProductBySlug', () => {
    it('returns a published product aggregate', async () => {
      const aggregate = createAggregate();

      repository.findProductAggregateBySlug.mockResolvedValue(aggregate);

      await expect(
        service.getPublicProductBySlug(aggregate.product.slug),
      ).resolves.toBe(aggregate);

      expect(repository.findProductAggregateBySlug.mock.calls).toEqual([
        [aggregate.product.slug],
      ]);
    });

    it('throws when the product does not exist', async () => {
      repository.findProductAggregateBySlug.mockResolvedValue(null);

      await expect(
        service.getPublicProductBySlug('missing-product'),
      ).rejects.toEqual(new CatalogueProductNotFoundError('missing-product'));
    });

    it.each(['draft', 'archived'] as const)(
      'hides %s products from public callers',
      async (catalogueStatus) => {
        const aggregate = createAggregate({
          catalogueStatus,
        });

        repository.findProductAggregateBySlug.mockResolvedValue(aggregate);

        await expect(
          service.getPublicProductBySlug(aggregate.product.slug),
        ).rejects.toBeInstanceOf(CatalogueProductNotFoundError);
      },
    );

    it('returns a published exhausted product', async () => {
      const aggregate = createAggregate({
        availability: 'exhausted',
      });

      repository.findProductAggregateBySlug.mockResolvedValue(aggregate);

      await expect(
        service.getPublicProductBySlug(aggregate.product.slug),
      ).resolves.toBe(aggregate);
    });
  });

  describe('collections', () => {
    it('lists collections', async () => {
      const collection = createCollection();

      repository.listCollections.mockResolvedValue([collection]);

      await expect(service.listCollections()).resolves.toEqual([collection]);
    });

    it('returns a collection by slug', async () => {
      const collection = createCollection();

      repository.findCollectionBySlug.mockResolvedValue(collection);

      await expect(service.getCollectionBySlug(collection.slug)).resolves.toBe(
        collection,
      );
    });

    it('throws when a collection does not exist', async () => {
      repository.findCollectionBySlug.mockResolvedValue(null);

      await expect(
        service.getCollectionBySlug('missing-collection'),
      ).rejects.toEqual(
        new CatalogueCollectionNotFoundError('missing-collection'),
      );
    });

    it('checks collection existence before listing its products', async () => {
      repository.findCollectionBySlug.mockResolvedValue(null);

      await expect(
        service.listPublicProductsByCollectionSlug('missing-collection'),
      ).rejects.toBeInstanceOf(CatalogueCollectionNotFoundError);

      expect(
        repository.listPublicProductSummariesByCollectionSlug.mock.calls,
      ).toHaveLength(0);
    });

    it('lists only published products in a collection', async () => {
      const collection = createCollection();

      const publishedProduct = createSummary({
        collection: {
          id: collection.id,
          slug: collection.slug,
          name: collection.name,
        },
      });

      const draftProduct = createSummary({
        id: '10000000-0000-4000-8000-000000000002',
        slug: 'draft-ring',
        catalogueStatus: 'draft',
        collection: {
          id: collection.id,
          slug: collection.slug,
          name: collection.name,
        },
      });

      repository.findCollectionBySlug.mockResolvedValue(collection);

      repository.listPublicProductSummariesByCollectionSlug.mockResolvedValue([
        publishedProduct,
        draftProduct,
      ]);

      await expect(
        service.listPublicProductsByCollectionSlug(collection.slug),
      ).resolves.toEqual([publishedProduct]);

      expect(
        repository.listPublicProductSummariesByCollectionSlug.mock.calls,
      ).toEqual([[collection.slug]]);
    });
  });

  describe('bag eligibility', () => {
    it('allows a published available product', async () => {
      const aggregate = createAggregate();

      repository.findProductAggregateBySlug.mockResolvedValue(aggregate);

      await expect(
        service.assessProductBagEligibilityBySlug(aggregate.product.slug),
      ).resolves.toEqual({
        allowed: true,
        reason: null,
      });
    });

    it('rejects an exhausted product', async () => {
      const aggregate = createAggregate({
        availability: 'exhausted',
      });

      repository.findProductAggregateBySlug.mockResolvedValue(aggregate);

      await expect(
        service.assessProductBagEligibilityBySlug(aggregate.product.slug),
      ).resolves.toEqual({
        allowed: false,
        reason: 'exhausted',
      });
    });

    it('throws when assessing a missing product', async () => {
      repository.findProductAggregateBySlug.mockResolvedValue(null);

      await expect(
        service.assessProductBagEligibilityBySlug('missing-product'),
      ).rejects.toBeInstanceOf(CatalogueProductNotFoundError);
    });
  });

  describe('commercial state', () => {
    it('derives sold for an exhausted unique product', async () => {
      const aggregate = createAggregate({
        availability: 'exhausted',
        supply: {
          mode: 'unique',
          editionSize: 1,
        },
      });

      repository.findProductAggregateBySlug.mockResolvedValue(aggregate);

      await expect(
        service.deriveProductCommercialStateBySlug(aggregate.product.slug),
      ).resolves.toBe('sold');
    });

    it('derives edition sold out for an exhausted limited product', async () => {
      const aggregate = createAggregate({
        availability: 'exhausted',
        supply: {
          mode: 'limited',
          editionSize: 25,
        },
      });

      repository.findProductAggregateBySlug.mockResolvedValue(aggregate);

      await expect(
        service.deriveProductCommercialStateBySlug(aggregate.product.slug),
      ).resolves.toBe('edition_sold_out');
    });

    it('throws when deriving the state of a missing product', async () => {
      repository.findProductAggregateBySlug.mockResolvedValue(null);

      await expect(
        service.deriveProductCommercialStateBySlug('missing-product'),
      ).rejects.toBeInstanceOf(CatalogueProductNotFoundError);
    });
  });
});
