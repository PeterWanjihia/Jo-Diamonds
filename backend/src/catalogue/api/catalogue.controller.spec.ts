import type {
  CatalogueCollection,
  CatalogueProductAggregate,
  CatalogueProductSummary,
} from '../domain';
import {
  CatalogueProductNotFoundError,
  CatalogueService,
} from '../application';
import { CatalogueController } from './catalogue.controller';

const timestamp = new Date('2026-07-01T00:00:00.000Z');

type CatalogueServiceMock = {
  listPublicProducts: jest.MockedFunction<
    CatalogueService['listPublicProducts']
  >;

  getPublicProductBySlug: jest.MockedFunction<
    CatalogueService['getPublicProductBySlug']
  >;

  listCollections: jest.MockedFunction<CatalogueService['listCollections']>;

  getCollectionBySlug: jest.MockedFunction<
    CatalogueService['getCollectionBySlug']
  >;

  listPublicProductsByCollectionSlug: jest.MockedFunction<
    CatalogueService['listPublicProductsByCollectionSlug']
  >;
};

function createProductSummary(
  overrides: Partial<CatalogueProductSummary> = {},
): CatalogueProductSummary {
  return {
    id: '10000000-0000-4000-8000-000000000001',

    slug: 'classic-round-solitaire-ring',
    sku: 'JD-RNG-SOL-001',

    name: 'Classic Round Solitaire Ring',
    shortDescription:
      'A round-cut solitaire ring in a clean six-prong setting.',
    category: 'rings',

    collection: {
      id: '30000000-0000-4000-8000-000000000001',
      slug: 'signature-solitaires',
      name: 'Signature Solitaires',
    },

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

    primaryImage: {
      id: '20000000-0000-4000-8000-000000000001',
      url: '/images/catalogue/seed/classic-round-solitaire-ring-01.webp',
      altText: 'Classic round solitaire diamond ring',
      sortOrder: 0,
      isPrimary: true,
      createdAt: timestamp,
    },

    ...overrides,
  };
}

function createCollection(
  overrides: Partial<CatalogueCollection> = {},
): CatalogueCollection {
  return {
    id: '30000000-0000-4000-8000-000000000001',
    slug: 'signature-solitaires',
    name: 'Signature Solitaires',
    description:
      'Diamond-led pieces built around restrained settings and prominent centre stones.',
    createdAt: timestamp,
    updatedAt: timestamp,
    ...overrides,
  };
}

function createProductAggregate(): CatalogueProductAggregate {
  return {
    product: {
      id: '10000000-0000-4000-8000-000000000001',

      slug: 'classic-round-solitaire-ring',
      sku: 'JD-RNG-SOL-001',

      name: 'Classic Round Solitaire Ring',
      shortDescription:
        'A round-cut solitaire ring in a clean six-prong setting.',
      description:
        'A refined round-cut solitaire ring designed around a clean six-prong setting.',
      designStory: null,

      category: 'rings',
      collectionId: '30000000-0000-4000-8000-000000000001',

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
    },

    collection: createCollection(),

    images: [],
    jewelleryDetails: null,
    gemstoneGroups: [],
    certificates: [],
    services: [],
  };
}

describe('CatalogueController', () => {
  let catalogueService: CatalogueServiceMock;
  let controller: CatalogueController;

  beforeEach(() => {
    catalogueService = {
      listPublicProducts: jest.fn(),
      getPublicProductBySlug: jest.fn(),
      listCollections: jest.fn(),
      getCollectionBySlug: jest.fn(),
      listPublicProductsByCollectionSlug: jest.fn(),
    };

    controller = new CatalogueController(
      catalogueService as unknown as CatalogueService,
    );
  });

  describe('listProducts', () => {
    it('returns mapped products with a count', async () => {
      const product = createProductSummary();

      catalogueService.listPublicProducts.mockResolvedValue([product]);

      await expect(controller.listProducts()).resolves.toEqual({
        data: [
          {
            slug: 'classic-round-solitaire-ring',
            sku: 'JD-RNG-SOL-001',

            name: 'Classic Round Solitaire Ring',
            shortDescription:
              'A round-cut solitaire ring in a clean six-prong setting.',
            category: 'rings',

            collection: {
              slug: 'signature-solitaires',
              name: 'Signature Solitaires',
            },

            price: {
              minor: 45_000_000,
              currency: 'KES',
            },

            supply: {
              mode: 'unique',
              editionSize: 1,
            },

            availability: 'available',
            commercialState: 'available',
            canEnterBag: true,

            photographyType: 'exact',
            isFeatured: true,

            primaryImage: {
              url: '/images/catalogue/seed/classic-round-solitaire-ring-01.webp',
              altText: 'Classic round solitaire diamond ring',
              sortOrder: 0,
              isPrimary: true,
            },
          },
        ],

        meta: {
          count: 1,
        },
      });

      expect(catalogueService.listPublicProducts.mock.calls).toEqual([[]]);
    });
  });

  describe('getProduct', () => {
    it('passes the slug to the service and returns a resource envelope', async () => {
      const aggregate = createProductAggregate();

      catalogueService.getPublicProductBySlug.mockResolvedValue(aggregate);

      const response = await controller.getProduct({
        slug: aggregate.product.slug,
      });

      expect(response.data).toMatchObject({
        slug: 'classic-round-solitaire-ring',
        sku: 'JD-RNG-SOL-001',

        price: {
          minor: 45_000_000,
          currency: 'KES',
        },

        commercialState: 'available',
        canEnterBag: true,
      });

      expect(catalogueService.getPublicProductBySlug.mock.calls).toEqual([
        [aggregate.product.slug],
      ]);
    });

    it('allows application errors to reach the HTTP exception filter', async () => {
      const error = new CatalogueProductNotFoundError('missing-product');

      catalogueService.getPublicProductBySlug.mockRejectedValue(error);

      await expect(
        controller.getProduct({
          slug: 'missing-product',
        }),
      ).rejects.toBe(error);
    });
  });

  describe('listCollections', () => {
    it('returns mapped collections with a count', async () => {
      const collection = createCollection();

      catalogueService.listCollections.mockResolvedValue([collection]);

      await expect(controller.listCollections()).resolves.toEqual({
        data: [
          {
            slug: 'signature-solitaires',
            name: 'Signature Solitaires',
            description:
              'Diamond-led pieces built around restrained settings and prominent centre stones.',
          },
        ],

        meta: {
          count: 1,
        },
      });

      expect(catalogueService.listCollections.mock.calls).toEqual([[]]);
    });
  });

  describe('getCollection', () => {
    it('passes the slug to the service and returns a resource envelope', async () => {
      const collection = createCollection();

      catalogueService.getCollectionBySlug.mockResolvedValue(collection);

      await expect(
        controller.getCollection({
          slug: collection.slug,
        }),
      ).resolves.toEqual({
        data: {
          slug: 'signature-solitaires',
          name: 'Signature Solitaires',
          description:
            'Diamond-led pieces built around restrained settings and prominent centre stones.',
        },
      });

      expect(catalogueService.getCollectionBySlug.mock.calls).toEqual([
        [collection.slug],
      ]);
    });
  });

  describe('listCollectionProducts', () => {
    it('passes the collection slug and returns mapped products', async () => {
      const product = createProductSummary();

      catalogueService.listPublicProductsByCollectionSlug.mockResolvedValue([
        product,
      ]);

      const response = await controller.listCollectionProducts({
        slug: 'signature-solitaires',
      });

      expect(response.meta).toEqual({
        count: 1,
      });

      expect(response.data).toHaveLength(1);

      expect(response.data[0]).toMatchObject({
        slug: 'classic-round-solitaire-ring',
        commercialState: 'available',
        canEnterBag: true,
      });

      expect(
        catalogueService.listPublicProductsByCollectionSlug.mock.calls,
      ).toEqual([['signature-solitaires']]);
    });
  });
});
