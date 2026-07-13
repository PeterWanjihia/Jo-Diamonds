import type {
  CatalogueCommercialState,
} from '../types/catalogue';

const publicLabels: Record<
  CatalogueCommercialState,
  string
> = {
  available: 'Available',
  sold: 'Sold',
  edition_sold_out: 'Edition sold out',
  temporarily_unavailable: 'Temporarily unavailable',

  draft: 'Unavailable',
  archived: 'Unavailable',
  inconsistent: 'Unavailable',
};

export function getCommercialStateLabel(
  state: CatalogueCommercialState,
): string {
  return publicLabels[state];
}

export function isPositiveCommercialState(
  state: CatalogueCommercialState,
): boolean {
  return state === 'available';
}
