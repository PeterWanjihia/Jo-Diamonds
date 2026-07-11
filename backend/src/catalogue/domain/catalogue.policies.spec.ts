import type { CatalogueProduct } from './catalogue.models';
import {
  assessBagEligibility,
  canEnterBag,
  deriveCommercialState,
  isPubliclyVisible,
} from './catalogue.policies';
import type { CatalogueStatus, ProductAvailability } from './catalogue.types';

const catalogueTimestamp = new Date('2026-07-01T00:00:00.000Z');

function createProduct(
  overrides: Partial<CatalogueProduct> = {},
): CatalogueProduct {
  return {
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

    createdAt: catalogueTimestamp,
    updatedAt: catalogueTimestamp,

    ...overrides,
  };
}

describe('catalogue policies', () => {
  describe('isPubliclyVisible', () => {
    it.each([
      ['draft', false],
      ['published', true],
      ['archived', false],
    ] satisfies readonly [CatalogueStatus, boolean][])(
      'returns %s visibility as %s',
      (catalogueStatus, expectedVisibility) => {
        const product = createProduct({
          catalogueStatus,
        });

        expect(isPubliclyVisible(product)).toBe(expectedVisibility);
      },
    );

    it('keeps published exhausted products publicly visible', () => {
      const product = createProduct({
        catalogueStatus: 'published',
        availability: 'exhausted',
      });

      expect(isPubliclyVisible(product)).toBe(true);
    });

    it('keeps published unavailable products publicly visible', () => {
      const product = createProduct({
        catalogueStatus: 'published',
        availability: 'unavailable',
      });

      expect(isPubliclyVisible(product)).toBe(true);
    });
  });

  describe('assessBagEligibility', () => {
    it('allows published and available products', () => {
      const product = createProduct({
        catalogueStatus: 'published',
        availability: 'available',
      });

      expect(assessBagEligibility(product)).toEqual({
        allowed: true,
        reason: null,
      });

      expect(canEnterBag(product)).toBe(true);
    });

    it.each([
      ['draft', 'available', 'not_published'],
      ['draft', 'unavailable', 'not_published'],
      ['draft', 'exhausted', 'not_published'],

      ['archived', 'available', 'archived'],
      ['archived', 'unavailable', 'archived'],
      ['archived', 'exhausted', 'archived'],

      ['published', 'unavailable', 'unavailable'],
      ['published', 'exhausted', 'exhausted'],
    ] satisfies readonly [
      CatalogueStatus,
      ProductAvailability,
      'not_published' | 'archived' | 'unavailable' | 'exhausted',
    ][])(
      'rejects %s and %s products with reason %s',
      (catalogueStatus, availability, expectedReason) => {
        const product = createProduct({
          catalogueStatus,
          availability,
        });

        expect(assessBagEligibility(product)).toEqual({
          allowed: false,
          reason: expectedReason,
        });

        expect(canEnterBag(product)).toBe(false);
      },
    );
  });

  describe('deriveCommercialState', () => {
    it('returns draft regardless of availability or supply mode', () => {
      const product = createProduct({
        catalogueStatus: 'draft',
        availability: 'exhausted',
        supply: {
          mode: 'limited',
          editionSize: 25,
        },
      });

      expect(deriveCommercialState(product)).toBe('draft');
    });

    it('returns archived regardless of availability or supply mode', () => {
      const product = createProduct({
        catalogueStatus: 'archived',
        availability: 'available',
        supply: {
          mode: 'reproducible',
          editionSize: null,
        },
      });

      expect(deriveCommercialState(product)).toBe('archived');
    });

    it.each([
      {
        mode: 'unique',
        editionSize: 1,
      },
      {
        mode: 'limited',
        editionSize: 25,
      },
      {
        mode: 'reproducible',
        editionSize: null,
      },
    ] as const)(
      'returns available for an available $mode product',
      (supply) => {
        const product = createProduct({
          catalogueStatus: 'published',
          availability: 'available',
          supply,
        });

        expect(deriveCommercialState(product)).toBe('available');
      },
    );

    it.each([
      {
        mode: 'unique',
        editionSize: 1,
      },
      {
        mode: 'limited',
        editionSize: 25,
      },
    ] as const)(
      'returns unavailable for an unavailable $mode product',
      (supply) => {
        const product = createProduct({
          catalogueStatus: 'published',
          availability: 'unavailable',
          supply,
        });

        expect(deriveCommercialState(product)).toBe('unavailable');
      },
    );

    it('returns temporarily unavailable for a reproducible product', () => {
      const product = createProduct({
        catalogueStatus: 'published',
        availability: 'unavailable',
        supply: {
          mode: 'reproducible',
          editionSize: null,
        },
      });

      expect(deriveCommercialState(product)).toBe('temporarily_unavailable');
    });

    it('returns sold for an exhausted unique product', () => {
      const product = createProduct({
        catalogueStatus: 'published',
        availability: 'exhausted',
        supply: {
          mode: 'unique',
          editionSize: 1,
        },
      });

      expect(deriveCommercialState(product)).toBe('sold');
    });

    it('returns edition sold out for an exhausted limited product', () => {
      const product = createProduct({
        catalogueStatus: 'published',
        availability: 'exhausted',
        supply: {
          mode: 'limited',
          editionSize: 25,
        },
      });

      expect(deriveCommercialState(product)).toBe('edition_sold_out');
    });

    it('identifies exhausted reproducible products as inconsistent', () => {
      const product = createProduct({
        catalogueStatus: 'published',
        availability: 'exhausted',
        supply: {
          mode: 'reproducible',
          editionSize: null,
        },
      });

      expect(deriveCommercialState(product)).toBe('inconsistent');
    });
  });
});
