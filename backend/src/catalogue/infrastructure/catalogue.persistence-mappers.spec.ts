import {
  mapCatalogueGemstoneGroup,
  mapCatalogueProduct,
  mapCatalogueProductSummary,
  mapCatalogueService,
  mapCatalogueSupply,
  type CollectionRow,
  type GemstoneGroupRow,
  type ProductImageRow,
  type ProductRow,
  type ProductServiceRow,
} from './catalogue.persistence-mappers';

const timestamp = new Date('2026-07-01T00:00:00.000Z');

function createProductRow(overrides: Partial<ProductRow> = {}): ProductRow {
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

    priceMinor: 45_000_000,
    currency: 'KES',

    supplyMode: 'unique',
    editionSize: 1,

    catalogueStatus: 'published',
    availability: 'available',
    photographyType: 'exact',

    isFeatured: true,

    createdAt: timestamp,
    updatedAt: timestamp,

    ...overrides,
  };
}

function createCollectionRow(
  overrides: Partial<CollectionRow> = {},
): CollectionRow {
  return {
    id: '20000000-0000-4000-8000-000000000001',
    slug: 'signature-solitaires',
    name: 'Signature Solitaires',
    description: 'A collection of refined solitaire jewellery.',
    createdAt: timestamp,
    updatedAt: timestamp,
    ...overrides,
  };
}

function createImageRow(
  overrides: Partial<ProductImageRow> = {},
): ProductImageRow {
  return {
    id: '30000000-0000-4000-8000-000000000001',
    productId: '10000000-0000-4000-8000-000000000001',
    url: '/images/classic-round-solitaire-ring.webp',
    altText: 'Classic round solitaire diamond ring',
    sortOrder: 0,
    isPrimary: true,
    createdAt: timestamp,
    updatedAt: timestamp,
    ...overrides,
  } as ProductImageRow;
}

function createGemstoneGroupRow(
  overrides: Partial<GemstoneGroupRow> = {},
): GemstoneGroupRow {
  return {
    id: '40000000-0000-4000-8000-000000000001',
    productId: '10000000-0000-4000-8000-000000000001',

    role: 'primary',
    gemstoneType: 'diamond',
    origin: 'natural',

    quantity: 1,

    shape: 'round',
    colour: 'G',
    clarity: 'VS1',
    cutGrade: 'excellent',
    treatment: 'none',

    specificationMode: 'exact',
    totalCaratWeight: 1.25,
    minimumTotalCaratWeight: null,
    maximumTotalCaratWeight: null,

    notes: null,
    displayOrder: 0,

    createdAt: timestamp,
    updatedAt: timestamp,

    ...overrides,
  };
}

function createProductServiceRow(
  overrides: Partial<ProductServiceRow> = {},
): ProductServiceRow {
  return {
    id: '50000000-0000-4000-8000-000000000001',
    productId: '10000000-0000-4000-8000-000000000001',

    serviceType: 'care',

    title: 'Complimentary annual inspection',
    description: 'An annual jewellery condition inspection.',

    isAvailable: true,

    isIncluded: true,
    priceOnRequest: false,
    priceMinor: null,
    currency: 'KES',

    leadTimeDays: 0,

    requirements: null,
    notes: null,

    displayOrder: 0,

    createdAt: timestamp,
    updatedAt: timestamp,

    ...overrides,
  };
}

describe('catalogue persistence mappers', () => {
  describe('mapCatalogueSupply', () => {
    it('maps a valid unique supply configuration', () => {
      expect(mapCatalogueSupply('unique', 1)).toEqual({
        mode: 'unique',
        editionSize: 1,
      });
    });

    it('maps a valid limited supply configuration', () => {
      expect(mapCatalogueSupply('limited', 25)).toEqual({
        mode: 'limited',
        editionSize: 25,
      });
    });

    it('maps a valid reproducible supply configuration', () => {
      expect(mapCatalogueSupply('reproducible', null)).toEqual({
        mode: 'reproducible',
        editionSize: null,
      });
    });

    it.each([null, 2, 25])(
      'rejects unique supply with edition size %s',
      (editionSize) => {
        expect(() => mapCatalogueSupply('unique', editionSize)).toThrow(
          'Invalid persisted catalogue data: unique product must have edition size 1',
        );
      },
    );

    it.each([null, 0, 1])(
      'rejects limited supply with edition size %s',
      (editionSize) => {
        expect(() => mapCatalogueSupply('limited', editionSize)).toThrow(
          'Invalid persisted catalogue data: limited product must have edition size greater than 1',
        );
      },
    );

    it('rejects reproducible supply with an edition size', () => {
      expect(() => mapCatalogueSupply('reproducible', 100)).toThrow(
        'Invalid persisted catalogue data: reproducible product cannot have an edition size',
      );
    });
  });

  describe('mapCatalogueGemstoneGroup', () => {
    it('maps an exact carat claim', () => {
      const result = mapCatalogueGemstoneGroup(createGemstoneGroupRow());

      expect(result.caratClaim).toEqual({
        mode: 'exact',
        totalCaratWeight: 1.25,
      });
    });

    it('maps an approximate carat claim', () => {
      const result = mapCatalogueGemstoneGroup(
        createGemstoneGroupRow({
          specificationMode: 'approximate',
          totalCaratWeight: 0.75,
        }),
      );

      expect(result.caratClaim).toEqual({
        mode: 'approximate',
        totalCaratWeight: 0.75,
      });
    });

    it('maps a range carat claim', () => {
      const result = mapCatalogueGemstoneGroup(
        createGemstoneGroupRow({
          specificationMode: 'range',
          totalCaratWeight: null,
          minimumTotalCaratWeight: 0.9,
          maximumTotalCaratWeight: 1.1,
        }),
      );

      expect(result.caratClaim).toEqual({
        mode: 'range',
        minimumTotalCaratWeight: 0.9,
        maximumTotalCaratWeight: 1.1,
      });
    });

    it('rejects an exact claim containing range values', () => {
      const row = createGemstoneGroupRow({
        specificationMode: 'exact',
        totalCaratWeight: 1.25,
        minimumTotalCaratWeight: 1,
        maximumTotalCaratWeight: 1.5,
      });

      expect(() => mapCatalogueGemstoneGroup(row)).toThrow(
        `Invalid persisted catalogue data: exact gemstone group "${row.id}" has an invalid carat claim`,
      );
    });

    it('rejects a range claim whose minimum exceeds its maximum', () => {
      const row = createGemstoneGroupRow({
        specificationMode: 'range',
        totalCaratWeight: null,
        minimumTotalCaratWeight: 1.5,
        maximumTotalCaratWeight: 1,
      });

      expect(() => mapCatalogueGemstoneGroup(row)).toThrow(
        `Invalid persisted catalogue data: range gemstone group "${row.id}" has an invalid carat claim`,
      );
    });

    it('rejects a range claim containing a total carat value', () => {
      const row = createGemstoneGroupRow({
        specificationMode: 'range',
        totalCaratWeight: 1.25,
        minimumTotalCaratWeight: 1,
        maximumTotalCaratWeight: 1.5,
      });

      expect(() => mapCatalogueGemstoneGroup(row)).toThrow(
        `Invalid persisted catalogue data: range gemstone group "${row.id}" has an invalid carat claim`,
      );
    });
  });

  describe('mapCatalogueService', () => {
    it('maps an included service', () => {
      const result = mapCatalogueService(
        createProductServiceRow({
          isIncluded: true,
          priceOnRequest: false,
          priceMinor: null,
        }),
      );

      expect(result.pricing).toEqual({
        mode: 'included',
        price: null,
      });
    });

    it('maps a fixed-price service', () => {
      const result = mapCatalogueService(
        createProductServiceRow({
          isIncluded: false,
          priceOnRequest: false,
          priceMinor: 150_000,
          currency: 'KES',
        }),
      );

      expect(result.pricing).toEqual({
        mode: 'fixed',
        price: {
          minor: 150_000,
          currency: 'KES',
        },
      });
    });

    it('maps a price-on-request service', () => {
      const result = mapCatalogueService(
        createProductServiceRow({
          isIncluded: false,
          priceOnRequest: true,
          priceMinor: null,
        }),
      );

      expect(result.pricing).toEqual({
        mode: 'on_request',
        price: null,
      });
    });

    it.each([
      {
        isIncluded: true,
        priceOnRequest: true,
        priceMinor: null,
      },
      {
        isIncluded: true,
        priceOnRequest: false,
        priceMinor: 100_000,
      },
      {
        isIncluded: false,
        priceOnRequest: true,
        priceMinor: 100_000,
      },
      {
        isIncluded: false,
        priceOnRequest: false,
        priceMinor: null,
      },
    ])('rejects invalid service pricing %#', (invalidPricing) => {
      const row = createProductServiceRow(invalidPricing);

      expect(() => mapCatalogueService(row)).toThrow(
        `Invalid persisted catalogue data: product service "${row.id}" has an invalid pricing configuration`,
      );
    });
  });

  describe('mapCatalogueProduct', () => {
    it('maps a database product row into a domain product', () => {
      const result = mapCatalogueProduct(
        createProductRow({
          supplyMode: 'limited',
          editionSize: 25,
        }),
      );

      expect(result).toMatchObject({
        id: '10000000-0000-4000-8000-000000000001',
        slug: 'classic-round-solitaire-ring',
        sku: 'JD-RNG-SOL-001',

        price: {
          minor: 45_000_000,
          currency: 'KES',
        },

        supply: {
          mode: 'limited',
          editionSize: 25,
        },

        catalogueStatus: 'published',
        availability: 'available',
        photographyType: 'exact',
      });
    });

    it('rejects a product row with invalid supply data', () => {
      const row = createProductRow({
        supplyMode: 'unique',
        editionSize: 5,
      });

      expect(() => mapCatalogueProduct(row)).toThrow(
        'Invalid persisted catalogue data: unique product must have edition size 1',
      );
    });
  });

  describe('mapCatalogueProductSummary', () => {
    it('maps collection and primary-image relationships', () => {
      const result = mapCatalogueProductSummary(
        createProductRow({
          collectionId: '20000000-0000-4000-8000-000000000001',
        }),
        createCollectionRow(),
        createImageRow(),
      );

      expect(result.collection).toEqual({
        id: '20000000-0000-4000-8000-000000000001',
        slug: 'signature-solitaires',
        name: 'Signature Solitaires',
      });

      expect(result.primaryImage).toEqual({
        id: '30000000-0000-4000-8000-000000000001',
        url: '/images/classic-round-solitaire-ring.webp',
        altText: 'Classic round solitaire diamond ring',
        sortOrder: 0,
        isPrimary: true,
        createdAt: timestamp,
      });
    });

    it('maps absent collection and image relationships as null', () => {
      const result = mapCatalogueProductSummary(createProductRow(), null, null);

      expect(result.collection).toBeNull();
      expect(result.primaryImage).toBeNull();
    });
  });
});
