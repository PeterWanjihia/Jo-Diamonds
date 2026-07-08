import type {
  collections,
  productCertificates,
  productGemstoneGroups,
  productJewelleryDetails,
  productServices,
} from '../schema';

type SeedCollection = Omit<
  typeof collections.$inferInsert,
  'createdAt' | 'updatedAt'
>;

type SeedJewelleryDetails = Omit<
  typeof productJewelleryDetails.$inferInsert,
  'productId'
>;

type SeedGemstoneGroup = Omit<
  typeof productGemstoneGroups.$inferInsert,
  'productId' | 'createdAt' | 'updatedAt'
>;

type SeedCertificate = Omit<
  typeof productCertificates.$inferInsert,
  'productId' | 'createdAt' | 'updatedAt'
>;

type SeedService = Omit<
  typeof productServices.$inferInsert,
  'productId' | 'createdAt' | 'updatedAt'
>;

export const collectionFixtures = [
  {
    id: '30000000-0000-4000-8000-000000000001',
    slug: 'signature-solitaires',
    name: 'Signature Solitaires',
    description:
      'Diamond-led pieces built around restrained settings and prominent centre stones.',
  },
  {
    id: '30000000-0000-4000-8000-000000000002',
    slug: 'modern-icons',
    name: 'Modern Icons',
    description:
      'Contemporary jewellery designed for repeat wear and enduring relevance.',
  },
  {
    id: '30000000-0000-4000-8000-000000000003',
    slug: 'heritage-halo',
    name: 'Heritage Halo',
    description:
      'Vintage-inspired halo jewellery with detailed settings and classic proportions.',
  },
] satisfies readonly SeedCollection[];

export const productCollectionIdBySku: Readonly<Record<string, string>> = {
  'JD-RNG-SOL-001': '30000000-0000-4000-8000-000000000001',
  'JD-NEC-EMR-001': '30000000-0000-4000-8000-000000000001',

  'JD-EAR-HAL-001': '30000000-0000-4000-8000-000000000002',
  'JD-BRC-TEN-001': '30000000-0000-4000-8000-000000000002',

  'JD-RNG-OVL-001': '30000000-0000-4000-8000-000000000003',
};

export const jewelleryDetailsBySku: Readonly<
  Record<string, SeedJewelleryDetails>
> = {
  'JD-RNG-SOL-001': {
    metalType: 'gold',
    metalPurity: '18K',
    metalColour: 'white',
    totalWeightGrams: 4.82,
    widthMm: 2.1,
    heightMm: 7.3,
    depthMm: 6.9,
    settingStyle: 'six-prong solitaire',
    sizeSystem: 'US',
    sizeValue: '6.5',
    resizable: true,
    resizeMin: '5.5',
    resizeMax: '7.5',
    resizeNotes: 'Resizing beyond this range requires workshop assessment.',
    adjustable: false,
    soldAs: 'single ring',
  },

  'JD-EAR-HAL-001': {
    metalType: 'gold',
    metalPurity: '18K',
    metalColour: 'white',
    totalWeightGrams: 3.2,
    widthMm: 8.4,
    heightMm: 8.4,
    depthMm: 5.2,
    settingStyle: 'halo prong setting',
    resizable: false,
    adjustable: false,
    backingType: 'push back',
    soldAs: 'pair',
  },

  'JD-NEC-EMR-001': {
    metalType: 'gold',
    metalPurity: '18K',
    metalColour: 'white',
    totalWeightGrams: 5.1,
    widthMm: 9.2,
    heightMm: 15,
    depthMm: 5.8,
    lengthMm: 450,
    settingStyle: 'four-prong pendant setting',
    resizable: false,
    adjustable: false,
    claspType: 'lobster clasp',
    soldAs: 'single necklace',
  },

  'JD-BRC-TEN-001': {
    metalType: 'platinum',
    metalPurity: '950',
    metalColour: 'white',
    totalWeightGrams: 18.5,
    widthMm: 3.1,
    lengthMm: 180,
    settingStyle: 'shared-prong line setting',
    resizable: false,
    adjustable: false,
    claspType: 'box clasp with safety latch',
    soldAs: 'single bracelet',
  },

  'JD-RNG-OVL-001': {
    metalType: 'gold',
    metalPurity: '18K',
    metalColour: 'rose',
    totalWeightGrams: 5.4,
    widthMm: 2.4,
    heightMm: 9.8,
    depthMm: 6.4,
    settingStyle: 'oval halo with detailed shoulders',
    sizeSystem: 'US',
    sizeValue: '6',
    resizable: true,
    resizeMin: '5',
    resizeMax: '7',
    resizeNotes: 'Major resizing may disturb the shoulder stones.',
    adjustable: false,
    soldAs: 'single ring',
  },
};

export const gemstoneGroupsBySku: Readonly<
  Record<string, readonly SeedGemstoneGroup[]>
> = {
  'JD-RNG-SOL-001': [
    {
      id: '40000000-0000-4000-8000-000000000001',
      role: 'primary',
      gemstoneType: 'diamond',
      origin: 'natural',
      specificationMode: 'exact',
      quantity: 1,
      shape: 'round',
      colour: 'G',
      clarity: 'VS1',
      cutGrade: 'excellent',
      treatment: 'none',
      totalCaratWeight: 1.25,
      notes: 'Single centre diamond.',
      displayOrder: 0,
    },
  ],

  'JD-EAR-HAL-001': [
    {
      id: '40000000-0000-4000-8000-000000000002',
      role: 'primary',
      gemstoneType: 'diamond',
      origin: 'laboratory_grown',
      specificationMode: 'approximate',
      quantity: 2,
      shape: 'round',
      colour: 'F-G',
      clarity: 'VS',
      cutGrade: 'excellent',
      treatment: 'none',
      totalCaratWeight: 1,
      notes: 'Approximate combined weight for the matched pair.',
      displayOrder: 0,
    },
  ],

  'JD-NEC-EMR-001': [
    {
      id: '40000000-0000-4000-8000-000000000003',
      role: 'primary',
      gemstoneType: 'diamond',
      origin: 'natural',
      specificationMode: 'exact',
      quantity: 1,
      shape: 'emerald',
      colour: 'G',
      clarity: 'VS1',
      treatment: 'none',
      totalCaratWeight: 1.5,
      notes: 'Single emerald-cut centre stone.',
      displayOrder: 0,
    },
  ],

  'JD-BRC-TEN-001': [
    {
      id: '40000000-0000-4000-8000-000000000004',
      role: 'primary',
      gemstoneType: 'diamond',
      origin: 'natural',
      specificationMode: 'approximate',
      quantity: 45,
      shape: 'round',
      colour: 'F-G',
      clarity: 'VS',
      treatment: 'none',
      totalCaratWeight: 7.5,
      notes: 'Approximate total weight across the bracelet.',
      displayOrder: 0,
    },
  ],

  'JD-RNG-OVL-001': [
    {
      id: '40000000-0000-4000-8000-000000000005',
      role: 'primary',
      gemstoneType: 'diamond',
      origin: 'natural',
      specificationMode: 'exact',
      quantity: 1,
      shape: 'oval',
      colour: 'G',
      clarity: 'VS2',
      treatment: 'none',
      totalCaratWeight: 1.2,
      notes: 'Oval centre diamond.',
      displayOrder: 0,
    },
    {
      id: '40000000-0000-4000-8000-000000000006',
      role: 'accent',
      gemstoneType: 'diamond',
      origin: 'natural',
      specificationMode: 'approximate',
      quantity: 20,
      shape: 'round',
      colour: 'G-H',
      clarity: 'VS-SI',
      treatment: 'none',
      totalCaratWeight: 0.42,
      notes: 'Halo and shoulder accent diamonds.',
      displayOrder: 1,
    },
  ],
};

export const certificatesBySku: Readonly<
  Record<string, readonly SeedCertificate[]>
> = {
  'JD-RNG-SOL-001': [
    {
      id: '50000000-0000-4000-8000-000000000001',
      scope: 'product',
      certificateType: 'diamond grading report',
      issuer: 'GIA',
      certificateNumber: 'GIA-JD-SOL-001',
      verificationUrl: 'https://www.gia.edu/report-check-landing',
      notes: 'Certificate applies to the exact centre diamond.',
      displayOrder: 0,
    },
  ],

  'JD-EAR-HAL-001': [
    {
      id: '50000000-0000-4000-8000-000000000002',
      scope: 'per_unit',
      certificateType: 'diamond grading report',
      issuer: 'IGI',
      certificateNumber: null,
      notes: 'Each physical pair receives its own certificate number.',
      displayOrder: 0,
    },
  ],

  'JD-NEC-EMR-001': [
    {
      id: '50000000-0000-4000-8000-000000000003',
      scope: 'product',
      certificateType: 'diamond grading report',
      issuer: 'GIA',
      certificateNumber: 'GIA-JD-EMR-001',
      verificationUrl: 'https://www.gia.edu/report-check-landing',
      notes: 'Certificate applies to the exact emerald-cut diamond.',
      displayOrder: 0,
    },
  ],

  'JD-BRC-TEN-001': [
    {
      id: '50000000-0000-4000-8000-000000000004',
      scope: 'per_unit',
      certificateType: 'diamond quality report',
      issuer: 'GIA',
      certificateNumber: null,
      notes: 'Certificate details are assigned to each produced bracelet.',
      displayOrder: 0,
    },
  ],

  'JD-RNG-OVL-001': [
    {
      id: '50000000-0000-4000-8000-000000000005',
      scope: 'product',
      certificateType: 'diamond grading report',
      issuer: 'GIA',
      certificateNumber: 'GIA-JD-OVL-001',
      verificationUrl: 'https://www.gia.edu/report-check-landing',
      notes: 'Certificate applies to the exact oval centre diamond.',
      displayOrder: 0,
    },
  ],
};

export const servicesBySku: Readonly<Record<string, readonly SeedService[]>> = {
  'JD-RNG-SOL-001': [
    {
      id: '60000000-0000-4000-8000-000000000001',
      serviceType: 'care',
      title: 'Complimentary annual inspection',
      description: 'Annual setting and prong inspection.',
      isAvailable: true,
      isIncluded: true,
      priceOnRequest: false,
      priceMinor: null,
      currency: 'KES',
      leadTimeDays: 0,
      displayOrder: 0,
    },
    {
      id: '60000000-0000-4000-8000-000000000002',
      serviceType: 'resizing',
      title: 'Ring resizing',
      description: 'Workshop resizing within the supported size range.',
      isAvailable: true,
      isIncluded: false,
      priceOnRequest: true,
      priceMinor: null,
      currency: 'KES',
      leadTimeDays: 7,
      displayOrder: 1,
    },
    {
      id: '60000000-0000-4000-8000-000000000003',
      serviceType: 'engraving',
      title: 'Inside-band engraving',
      description: 'Short text engraving inside the ring band.',
      isAvailable: true,
      isIncluded: false,
      priceOnRequest: false,
      priceMinor: 150_000,
      currency: 'KES',
      leadTimeDays: 3,
      displayOrder: 2,
    },
  ],

  'JD-EAR-HAL-001': [
    {
      id: '60000000-0000-4000-8000-000000000004',
      serviceType: 'care',
      title: 'Complimentary cleaning',
      description: 'Professional cleaning during the first year.',
      isAvailable: true,
      isIncluded: true,
      priceOnRequest: false,
      priceMinor: null,
      currency: 'KES',
      leadTimeDays: 0,
      displayOrder: 0,
    },
    {
      id: '60000000-0000-4000-8000-000000000005',
      serviceType: 'personalization',
      title: 'Alternative backing consultation',
      isAvailable: true,
      isIncluded: false,
      priceOnRequest: true,
      priceMinor: null,
      currency: 'KES',
      leadTimeDays: 5,
      displayOrder: 1,
    },
  ],

  'JD-NEC-EMR-001': [
    {
      id: '60000000-0000-4000-8000-000000000006',
      serviceType: 'care',
      title: 'Complimentary annual inspection',
      isAvailable: true,
      isIncluded: true,
      priceOnRequest: false,
      priceMinor: null,
      currency: 'KES',
      leadTimeDays: 0,
      displayOrder: 0,
    },
    {
      id: '60000000-0000-4000-8000-000000000007',
      serviceType: 'engraving',
      title: 'Pendant engraving',
      isAvailable: true,
      isIncluded: false,
      priceOnRequest: false,
      priceMinor: 180_000,
      currency: 'KES',
      leadTimeDays: 4,
      displayOrder: 1,
    },
  ],

  'JD-BRC-TEN-001': [
    {
      id: '60000000-0000-4000-8000-000000000008',
      serviceType: 'care',
      title: 'Complimentary clasp inspection',
      isAvailable: true,
      isIncluded: true,
      priceOnRequest: false,
      priceMinor: null,
      currency: 'KES',
      leadTimeDays: 0,
      displayOrder: 0,
    },
    {
      id: '60000000-0000-4000-8000-000000000009',
      serviceType: 'private_viewing',
      title: 'Private bracelet viewing',
      isAvailable: true,
      isIncluded: false,
      priceOnRequest: true,
      priceMinor: null,
      currency: 'KES',
      leadTimeDays: 2,
      displayOrder: 1,
    },
  ],

  'JD-RNG-OVL-001': [
    {
      id: '60000000-0000-4000-8000-000000000010',
      serviceType: 'care',
      title: 'Complimentary setting inspection',
      isAvailable: true,
      isIncluded: true,
      priceOnRequest: false,
      priceMinor: null,
      currency: 'KES',
      leadTimeDays: 0,
      displayOrder: 0,
    },
    {
      id: '60000000-0000-4000-8000-000000000011',
      serviceType: 'resizing',
      title: 'Specialist ring resizing',
      isAvailable: true,
      isIncluded: false,
      priceOnRequest: true,
      priceMinor: null,
      currency: 'KES',
      leadTimeDays: 10,
      requirements: 'The halo and shoulder stones must be inspected first.',
      displayOrder: 1,
    },
    {
      id: '60000000-0000-4000-8000-000000000012',
      serviceType: 'private_viewing',
      title: 'Private archived-piece consultation',
      isAvailable: false,
      isIncluded: false,
      priceOnRequest: true,
      priceMinor: null,
      currency: 'KES',
      leadTimeDays: 2,
      displayOrder: 2,
    },
  ],
};
