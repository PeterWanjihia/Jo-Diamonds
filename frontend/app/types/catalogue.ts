export type CatalogueAvailability =
  | 'available'
  | 'unavailable'
  | 'exhausted';

export type CatalogueCommercialState =
  | 'available'
  | 'sold'
  | 'edition_sold_out'
  | 'temporarily_unavailable'
  | 'draft'
  | 'archived'
  | 'inconsistent';

export type CataloguePhotographyType =
  | 'exact'
  | 'representative';

export interface CataloguePriceResponse {
  readonly minor: number;
  readonly currency: string;
}

export type CatalogueSupplyResponse =
  | {
      readonly mode: 'unique';
      readonly editionSize: 1;
    }
  | {
      readonly mode: 'limited';
      readonly editionSize: number;
    }
  | {
      readonly mode: 'reproducible';
      readonly editionSize: null;
    };

export interface CatalogueCollectionReferenceResponse {
  readonly slug: string;
  readonly name: string;
}

export interface CatalogueCollectionResponse {
  readonly slug: string;
  readonly name: string;
  readonly description: string | null;
}

export interface CatalogueImageResponse {
  readonly url: string;
  readonly altText: string;
  readonly sortOrder: number;
  readonly isPrimary: boolean;
}

export interface CatalogueProductSummaryResponse {
  readonly slug: string;
  readonly sku: string;

  readonly name: string;
  readonly shortDescription: string;
  readonly category: string;

  readonly collection:
    | CatalogueCollectionReferenceResponse
    | null;

  readonly price: CataloguePriceResponse;
  readonly supply: CatalogueSupplyResponse;

  readonly availability: CatalogueAvailability;
  readonly commercialState: CatalogueCommercialState;
  readonly canEnterBag: boolean;

  readonly photographyType: CataloguePhotographyType;
  readonly isFeatured: boolean;

  readonly primaryImage: CatalogueImageResponse | null;
}

export interface CatalogueResourceResponse<T> {
  readonly data: T;
}

export interface CatalogueListResponse<T> {
  readonly data: readonly T[];

  readonly meta: {
    readonly count: number;
  };
}
