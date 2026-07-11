import type { CatalogueProduct } from './catalogue.models';

type PublicVisibilitySubject = Pick<CatalogueProduct, 'catalogueStatus'>;

type BagEligibilitySubject = Pick<
  CatalogueProduct,
  'catalogueStatus' | 'availability'
>;

type CommercialStateSubject = Pick<
  CatalogueProduct,
  'catalogueStatus' | 'availability' | 'supply'
>;

export type CatalogueBagIneligibilityReason =
  'not_published' | 'archived' | 'unavailable' | 'exhausted';

export type CatalogueBagEligibility =
  | {
      readonly allowed: true;
      readonly reason: null;
    }
  | {
      readonly allowed: false;
      readonly reason: CatalogueBagIneligibilityReason;
    };

export type CatalogueCommercialState =
  | 'draft'
  | 'archived'
  | 'available'
  | 'unavailable'
  | 'temporarily_unavailable'
  | 'sold'
  | 'edition_sold_out'
  | 'inconsistent';

export function isPubliclyVisible(product: PublicVisibilitySubject): boolean {
  return product.catalogueStatus === 'published';
}

export function assessBagEligibility(
  product: BagEligibilitySubject,
): CatalogueBagEligibility {
  if (product.catalogueStatus === 'draft') {
    return {
      allowed: false,
      reason: 'not_published',
    };
  }

  if (product.catalogueStatus === 'archived') {
    return {
      allowed: false,
      reason: 'archived',
    };
  }

  if (product.availability === 'unavailable') {
    return {
      allowed: false,
      reason: 'unavailable',
    };
  }

  if (product.availability === 'exhausted') {
    return {
      allowed: false,
      reason: 'exhausted',
    };
  }

  return {
    allowed: true,
    reason: null,
  };
}

export function canEnterBag(product: BagEligibilitySubject): boolean {
  return assessBagEligibility(product).allowed;
}

export function deriveCommercialState(
  product: CommercialStateSubject,
): CatalogueCommercialState {
  if (product.catalogueStatus === 'draft') {
    return 'draft';
  }

  if (product.catalogueStatus === 'archived') {
    return 'archived';
  }

  if (product.availability === 'available') {
    return 'available';
  }

  if (product.availability === 'unavailable') {
    if (product.supply.mode === 'reproducible') {
      return 'temporarily_unavailable';
    }

    return 'unavailable';
  }

  switch (product.supply.mode) {
    case 'unique':
      return 'sold';

    case 'limited':
      return 'edition_sold_out';

    case 'reproducible':
      return 'inconsistent';
  }
}
