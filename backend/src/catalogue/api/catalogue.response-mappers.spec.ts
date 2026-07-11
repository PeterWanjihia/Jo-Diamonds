import type {
  CatalogueProductAggregate,
  CatalogueProductSummary,
} from '../domain';
import {
  mapCatalogueCollectionResponse,
  mapCatalogueProductDetailResponse,
  mapCatalogueProductSummaryResponse,
} from './catalogue.response-mappers';

const timestamp = new Date('2026-07-01T00:00:00.000Z');
const issuedAt = new Date('2026-06-15T10:30:00.000Z');

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
      designStory: 'Designed around a restrained six-prong setting.',

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

    collection: {
      id: '30000000-0000-4000-8000-000000000001',
      slug: 'signature-solitaires',
      name: 'Signature Solitaires',
      description: 'Diamond-led pieces built around restrained settings.',
      createdAt: timestamp,
      updatedAt: timestamp,
    },

    images: [
      {
        id: '20000000-0000-4000-8000-000000000001',
        url: '/images/catalogue/seed/classic-round-solitaire-ring-01.webp',
        altText: 'Classic round solitaire diamond ring',
        sortOrder: 0,
        isPrimary: true,
        createdAt: timestamp,
      },
      {
        id: '20000000-0000-4000-8000-000000000002',
        url: '/images/catalogue/seed/classic-round-solitaire-ring-02.webp',
        altText: 'Side profile of classic solitaire diamond ring',
        sortOrder: 1,
        isPrimary: false,
        createdAt: timestamp,
      },
    ],

    jewelleryDetails: {
      metalType: 'gold',
      metalPurity: '18K',
      metalColour: 'white',

      totalWeightGrams: 4.82,

      widthMm: 2.1,
      heightMm: 7.3,
      depthMm: 6.9,
      lengthMm: null,

      settingStyle: 'six-prong solitaire',

      sizeSystem: 'US',
      sizeValue: '6.5',

      resizable: true,
      resizeMin: '5.5',
      resizeMax: '7.5',
      resizeNotes: 'Resizing beyond this range requires workshop assessment.',

      adjustable: false,

      claspType: null,
      backingType: null,
      soldAs: 'single ring',
    },

    gemstoneGroups: [
      {
        id: '40000000-0000-4000-8000-000000000001',

        role: 'primary',
        gemstoneType: 'diamond',
        origin: 'natural',

        quantity: 1,

        shape: 'round',
        colour: 'G',
        clarity: 'VS1',
        cutGrade: 'excellent',
        treatment: 'none',

        caratClaim: {
          mode: 'exact',
          totalCaratWeight: 1.25,
        },

        notes: 'Single centre diamond.',
        displayOrder: 0,

        createdAt: timestamp,
        updatedAt: timestamp,
      },
    ],

    certificates: [
      {
        id: '50000000-0000-4000-8000-000000000001',

        scope: 'product',

        certificateType: 'diamond grading report',
        issuer: 'GIA',

        certificateNumber: 'GIA-JD-SOL-001',
        verificationUrl: 'https://www.gia.edu/report-check-landing',
        documentUrl: null,

        issuedAt,
        notes: 'Certificate applies to the exact centre diamond.',

        displayOrder: 0,

        createdAt: timestamp,
        updatedAt: timestamp,
      },
    ],

    services: [
      {
        id: '60000000-0000-4000-8000-000000000001',

        serviceType: 'care',

        title: 'Complimentary annual inspection',
        description: 'Annual setting and prong inspection.',

        isAvailable: true,

        pricing: {
          mode: 'included',
          price: null,
        },

        leadTimeDays: 0,

        requirements: null,
        notes: null,

        displayOrder: 0,

        createdAt: timestamp,
        updatedAt: timestamp,
      },
      {
        id: '60000000-0000-4000-8000-000000000002',

        serviceType: 'engraving',

        title: 'Inside-band engraving',
        description: 'Short text engraving inside the ring band.',

        isAvailable: true,

        pricing: {
          mode: 'fixed',
          price: {
            minor: 150_000,
            currency: 'KES',
          },
        },

        leadTimeDays: 3,

        requirements: null,
        notes: null,

        displayOrder: 1,

        createdAt: timestamp,
        updatedAt: timestamp,
      },
    ],
  };
}

describe('catalogue API response mappers', () => {
  describe('mapCatalogueProductSummaryResponse', () => {
    it('maps a public product summary', () => {
      const response = mapCatalogueProductSummaryResponse(
        createProductSummary(),
      );

      expect(response).toEqual({
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
      });
    });

    it('derives sold and disables bag entry for an exhausted unique product', () => {
      const response = mapCatalogueProductSummaryResponse(
        createProductSummary({
          availability: 'exhausted',
        }),
      );

      expect(response.commercialState).toBe('sold');
      expect(response.canEnterBag).toBe(false);
    });

    it('does not expose persistence or internal domain fields', () => {
      const response = mapCatalogueProductSummaryResponse(
        createProductSummary(),
      );

      expect(response).not.toHaveProperty('id');
      expect(response).not.toHaveProperty('catalogueStatus');
      expect(response).not.toHaveProperty('createdAt');
      expect(response).not.toHaveProperty('updatedAt');

      expect(response.collection).not.toHaveProperty('id');
      expect(response.primaryImage).not.toHaveProperty('id');
      expect(response.primaryImage).not.toHaveProperty('createdAt');
    });

    it('maps absent collection and primary image as null', () => {
      const response = mapCatalogueProductSummaryResponse(
        createProductSummary({
          collection: null,
          primaryImage: null,
        }),
      );

      expect(response.collection).toBeNull();
      expect(response.primaryImage).toBeNull();
    });
  });

  describe('mapCatalogueProductDetailResponse', () => {
    it('maps a complete product aggregate', () => {
      const response = mapCatalogueProductDetailResponse(
        createProductAggregate(),
      );

      expect(response).toMatchObject({
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

        availability: 'available',
        commercialState: 'available',
        canEnterBag: true,

        collection: {
          slug: 'signature-solitaires',
          name: 'Signature Solitaires',
        },
      });

      expect(response.images).toHaveLength(2);

      expect(response.gemstoneGroups[0]).toMatchObject({
        role: 'primary',
        gemstoneType: 'diamond',
        origin: 'natural',

        caratClaim: {
          mode: 'exact',
          totalCaratWeight: 1.25,
        },
      });

      expect(response.certificates[0]).toMatchObject({
        scope: 'product',
        issuer: 'GIA',
        certificateNumber: 'GIA-JD-SOL-001',
        issuedAt: '2026-06-15T10:30:00.000Z',
      });

      expect(response.services).toHaveLength(2);

      expect(response.services[0]?.pricing).toEqual({
        mode: 'included',
        price: null,
      });

      expect(response.services[1]?.pricing).toEqual({
        mode: 'fixed',
        price: {
          minor: 150_000,
          currency: 'KES',
        },
      });
    });

    it('does not expose aggregate child IDs or timestamps', () => {
      const response = mapCatalogueProductDetailResponse(
        createProductAggregate(),
      );

      expect(response).not.toHaveProperty('id');
      expect(response).not.toHaveProperty('catalogueStatus');
      expect(response).not.toHaveProperty('collectionId');
      expect(response).not.toHaveProperty('createdAt');
      expect(response).not.toHaveProperty('updatedAt');

      expect(response.collection).not.toHaveProperty('id');
      expect(response.collection).not.toHaveProperty('createdAt');

      expect(response.images[0]).not.toHaveProperty('id');
      expect(response.images[0]).not.toHaveProperty('createdAt');

      expect(response.gemstoneGroups[0]).not.toHaveProperty('id');

      expect(response.certificates[0]).not.toHaveProperty('id');

      expect(response.services[0]).not.toHaveProperty('id');
    });
  });

  describe('mapCatalogueCollectionResponse', () => {
    it('maps a collection without exposing internal fields', () => {
      const aggregate = createProductAggregate();

      if (aggregate.collection === null) {
        throw new Error('Expected test collection');
      }

      const response = mapCatalogueCollectionResponse(aggregate.collection);

      expect(response).toEqual({
        slug: 'signature-solitaires',
        name: 'Signature Solitaires',
        description: 'Diamond-led pieces built around restrained settings.',
      });

      expect(response).not.toHaveProperty('id');
      expect(response).not.toHaveProperty('createdAt');
      expect(response).not.toHaveProperty('updatedAt');
    });
  });
});
