import type { productImages, products } from '../schema';

type SeedProduct = Omit<
  typeof products.$inferInsert,
  'createdAt' | 'updatedAt' | 'status'
>;

type SeedProductImage = Omit<
  typeof productImages.$inferInsert,
  'productId' | 'createdAt'
>;

export interface CatalogueFixture {
  product: SeedProduct;
  images: readonly SeedProductImage[];
}

export const catalogueSeedTimestamp = new Date('2026-07-01T00:00:00.000Z');

export const catalogueFixtures = [
  {
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
      collectionId: null,

      priceMinor: 45_000_000,
      currency: 'KES',

      supplyMode: 'unique',
      editionSize: 1,
      catalogueStatus: 'published',
      availability: 'available',
      photographyType: 'exact',

      isFeatured: true,
    },
    images: [
      {
        id: '20000000-0000-4000-8000-000000000001',
        url: '/images/catalogue/seed/classic-round-solitaire-ring-01.webp',
        altText: 'Classic round solitaire diamond ring',
        sortOrder: 0,
        isPrimary: true,
      },
      {
        id: '20000000-0000-4000-8000-000000000002',
        url: '/images/catalogue/seed/classic-round-solitaire-ring-02.webp',
        altText: 'Side profile of classic solitaire diamond ring',
        sortOrder: 1,
        isPrimary: false,
      },
    ],
  },
  {
    product: {
      id: '10000000-0000-4000-8000-000000000002',
      slug: 'halo-diamond-stud-earrings',
      sku: 'JD-EAR-HAL-001',
      name: 'Halo Diamond Stud Earrings',

      shortDescription:
        'Matched diamond stud earrings framed by delicate halos.',
      description:
        'Matched diamond studs surrounded by a delicate halo for additional brilliance.',
      designStory: null,

      category: 'earrings',
      collectionId: null,

      priceMinor: 28_500_000,
      currency: 'KES',

      supplyMode: 'reproducible',
      editionSize: null,
      catalogueStatus: 'published',
      availability: 'available',
      photographyType: 'representative',

      isFeatured: false,
    },
    images: [
      {
        id: '20000000-0000-4000-8000-000000000003',
        url: '/images/catalogue/seed/halo-diamond-stud-earrings-01.webp',
        altText: 'Pair of halo diamond stud earrings',
        sortOrder: 0,
        isPrimary: true,
      },
      {
        id: '20000000-0000-4000-8000-000000000004',
        url: '/images/catalogue/seed/halo-diamond-stud-earrings-02.webp',
        altText: 'Close view of halo diamond stud setting',
        sortOrder: 1,
        isPrimary: false,
      },
    ],
  },
  {
    product: {
      id: '10000000-0000-4000-8000-000000000003',
      slug: 'emerald-cut-diamond-pendant',
      sku: 'JD-NEC-EMR-001',
      name: 'Emerald-Cut Diamond Pendant',

      shortDescription:
        'An emerald-cut diamond pendant in a minimal polished setting.',
      description:
        'An emerald-cut centre stone suspended from a minimal polished pendant setting.',
      designStory: null,

      category: 'necklaces',
      collectionId: null,

      priceMinor: 52_000_000,
      currency: 'KES',

      supplyMode: 'unique',
      editionSize: 1,
      catalogueStatus: 'published',
      availability: 'exhausted',
      photographyType: 'exact',

      isFeatured: false,
    },
    images: [
      {
        id: '20000000-0000-4000-8000-000000000005',
        url: '/images/catalogue/seed/emerald-cut-diamond-pendant-01.webp',
        altText: 'Emerald-cut diamond pendant necklace',
        sortOrder: 0,
        isPrimary: true,
      },
      {
        id: '20000000-0000-4000-8000-000000000006',
        url: '/images/catalogue/seed/emerald-cut-diamond-pendant-02.webp',
        altText: 'Close view of emerald-cut pendant setting',
        sortOrder: 1,
        isPrimary: false,
      },
    ],
  },
  {
    product: {
      id: '10000000-0000-4000-8000-000000000004',
      slug: 'diamond-tennis-bracelet',
      sku: 'JD-BRC-TEN-001',
      name: 'Diamond Tennis Bracelet',

      shortDescription:
        'A fluid diamond tennis bracelet with balanced stone spacing.',
      description:
        'A continuous line bracelet intended for balanced stone spacing and fluid movement.',
      designStory: null,

      category: 'bracelets',
      collectionId: null,

      priceMinor: 68_000_000,
      currency: 'KES',

      supplyMode: 'limited',
      editionSize: 25,
      catalogueStatus: 'draft',
      availability: 'unavailable',
      photographyType: 'representative',

      isFeatured: false,
    },
    images: [
      {
        id: '20000000-0000-4000-8000-000000000007',
        url: '/images/catalogue/seed/diamond-tennis-bracelet-01.webp',
        altText: 'Diamond tennis bracelet',
        sortOrder: 0,
        isPrimary: true,
      },
      {
        id: '20000000-0000-4000-8000-000000000008',
        url: '/images/catalogue/seed/diamond-tennis-bracelet-02.webp',
        altText: 'Close view of diamond tennis bracelet links',
        sortOrder: 1,
        isPrimary: false,
      },
    ],
  },
  {
    product: {
      id: '10000000-0000-4000-8000-000000000005',
      slug: 'vintage-oval-halo-ring',
      sku: 'JD-RNG-OVL-001',
      name: 'Vintage Oval Halo Ring',

      shortDescription: 'An oval halo ring with vintage-inspired shoulders.',
      description:
        'An oval centre stone framed by a vintage-inspired halo and detailed shoulders.',
      designStory: null,

      category: 'rings',
      collectionId: null,

      priceMinor: 57_500_000,
      currency: 'KES',

      supplyMode: 'unique',
      editionSize: 1,
      catalogueStatus: 'archived',
      availability: 'unavailable',
      photographyType: 'exact',

      isFeatured: false,
    },
    images: [
      {
        id: '20000000-0000-4000-8000-000000000009',
        url: '/images/catalogue/seed/vintage-oval-halo-ring-01.webp',
        altText: 'Vintage oval halo diamond ring',
        sortOrder: 0,
        isPrimary: true,
      },
      {
        id: '20000000-0000-4000-8000-000000000010',
        url: '/images/catalogue/seed/vintage-oval-halo-ring-02.webp',
        altText: 'Side profile of vintage oval halo ring',
        sortOrder: 1,
        isPrimary: false,
      },
    ],
  },
] satisfies readonly CatalogueFixture[];
