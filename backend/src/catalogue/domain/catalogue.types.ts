export const SUPPLY_MODES = ['unique', 'limited', 'reproducible'] as const;

export type SupplyMode = (typeof SUPPLY_MODES)[number];

export const CATALOGUE_STATUSES = ['draft', 'published', 'archived'] as const;

export type CatalogueStatus = (typeof CATALOGUE_STATUSES)[number];

export const PRODUCT_AVAILABILITIES = [
  'available',
  'unavailable',
  'exhausted',
] as const;

export type ProductAvailability = (typeof PRODUCT_AVAILABILITIES)[number];

export const PHOTOGRAPHY_TYPES = ['exact', 'representative'] as const;

export type PhotographyType = (typeof PHOTOGRAPHY_TYPES)[number];

export const GEMSTONE_ROLES = ['primary', 'accent'] as const;

export type GemstoneRole = (typeof GEMSTONE_ROLES)[number];

export const GEMSTONE_ORIGINS = ['natural', 'laboratory_grown'] as const;

export type GemstoneOrigin = (typeof GEMSTONE_ORIGINS)[number];

export const GEMSTONE_SPECIFICATION_MODES = [
  'exact',
  'approximate',
  'range',
] as const;

export type GemstoneSpecificationMode =
  (typeof GEMSTONE_SPECIFICATION_MODES)[number];

export const CERTIFICATION_SCOPES = ['product', 'per_unit'] as const;

export type CertificationScope = (typeof CERTIFICATION_SCOPES)[number];

export const PRODUCT_SERVICE_TYPES = [
  'resizing',
  'engraving',
  'private_viewing',
  'care',
  'personalization',
] as const;

export type ProductServiceType = (typeof PRODUCT_SERVICE_TYPES)[number];
