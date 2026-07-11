import type {
  CatalogueCommercialState,
  CertificationScope,
  GemstoneOrigin,
  GemstoneRole,
  PhotographyType,
  ProductAvailability,
  ProductServiceType,
} from '../domain';

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
  readonly description: string;
}

export interface CatalogueImageResponse {
  readonly url: string;
  readonly altText: string;
  readonly sortOrder: number;
  readonly isPrimary: boolean;
}

export interface CatalogueJewelleryDetailsResponse {
  readonly metalType: string | null;
  readonly metalPurity: string | null;
  readonly metalColour: string | null;

  readonly totalWeightGrams: number | null;

  readonly widthMm: number | null;
  readonly heightMm: number | null;
  readonly depthMm: number | null;
  readonly lengthMm: number | null;

  readonly settingStyle: string | null;

  readonly sizeSystem: string | null;
  readonly sizeValue: string | null;

  readonly resizable: boolean;
  readonly resizeMin: string | null;
  readonly resizeMax: string | null;
  readonly resizeNotes: string | null;

  readonly adjustable: boolean;

  readonly claspType: string | null;
  readonly backingType: string | null;
  readonly soldAs: string | null;
}

export type CatalogueGemstoneCaratClaimResponse =
  | {
      readonly mode: 'exact';
      readonly totalCaratWeight: number;
    }
  | {
      readonly mode: 'approximate';
      readonly totalCaratWeight: number;
    }
  | {
      readonly mode: 'range';
      readonly minimumTotalCaratWeight: number;
      readonly maximumTotalCaratWeight: number;
    };

export interface CatalogueGemstoneGroupResponse {
  readonly role: GemstoneRole;
  readonly gemstoneType: string;
  readonly origin: GemstoneOrigin;

  readonly quantity: number;

  readonly shape: string | null;
  readonly colour: string | null;
  readonly clarity: string | null;
  readonly cutGrade: string | null;
  readonly treatment: string | null;

  readonly caratClaim: CatalogueGemstoneCaratClaimResponse;

  readonly notes: string | null;
  readonly displayOrder: number;
}

export interface CatalogueCertificateResponse {
  readonly scope: CertificationScope;

  readonly certificateType: string;
  readonly issuer: string;

  readonly certificateNumber: string | null;
  readonly verificationUrl: string | null;
  readonly documentUrl: string | null;

  readonly issuedAt: string | null;
  readonly notes: string | null;

  readonly displayOrder: number;
}

export type CatalogueServicePricingResponse =
  | {
      readonly mode: 'included';
      readonly price: null;
    }
  | {
      readonly mode: 'fixed';
      readonly price: CataloguePriceResponse;
    }
  | {
      readonly mode: 'on_request';
      readonly price: null;
    };

export interface CatalogueProductServiceResponse {
  readonly serviceType: ProductServiceType;

  readonly title: string;
  readonly description: string | null;

  readonly isAvailable: boolean;
  readonly pricing: CatalogueServicePricingResponse;

  readonly leadTimeDays: number | null;

  readonly requirements: string | null;
  readonly notes: string | null;

  readonly displayOrder: number;
}

export interface CatalogueProductSummaryResponse {
  readonly slug: string;
  readonly sku: string;

  readonly name: string;
  readonly shortDescription: string;
  readonly category: string;

  readonly collection: CatalogueCollectionReferenceResponse | null;

  readonly price: CataloguePriceResponse;
  readonly supply: CatalogueSupplyResponse;

  readonly availability: ProductAvailability;
  readonly commercialState: CatalogueCommercialState;
  readonly canEnterBag: boolean;

  readonly photographyType: PhotographyType;
  readonly isFeatured: boolean;

  readonly primaryImage: CatalogueImageResponse | null;
}

export interface CatalogueProductDetailResponse {
  readonly slug: string;
  readonly sku: string;

  readonly name: string;
  readonly shortDescription: string;
  readonly description: string;
  readonly designStory: string | null;

  readonly category: string;
  readonly collection: CatalogueCollectionResponse | null;

  readonly price: CataloguePriceResponse;
  readonly supply: CatalogueSupplyResponse;

  readonly availability: ProductAvailability;
  readonly commercialState: CatalogueCommercialState;
  readonly canEnterBag: boolean;

  readonly photographyType: PhotographyType;
  readonly isFeatured: boolean;

  readonly images: readonly CatalogueImageResponse[];

  readonly jewelleryDetails: CatalogueJewelleryDetailsResponse | null;

  readonly gemstoneGroups: readonly CatalogueGemstoneGroupResponse[];

  readonly certificates: readonly CatalogueCertificateResponse[];

  readonly services: readonly CatalogueProductServiceResponse[];
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
