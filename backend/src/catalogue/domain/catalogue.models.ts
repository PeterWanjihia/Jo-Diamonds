import type {
  CatalogueStatus,
  CertificationScope,
  GemstoneOrigin,
  GemstoneRole,
  PhotographyType,
  ProductAvailability,
  ProductServiceType,
} from './catalogue.types';

export interface CataloguePrice {
  readonly minor: number;
  readonly currency: string;
}

export type CatalogueSupply =
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

export interface CatalogueCollectionReference {
  readonly id: string;
  readonly slug: string;
  readonly name: string;
}

export interface CatalogueCollection extends CatalogueCollectionReference {
  readonly description: string;

  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export interface CatalogueImage {
  readonly id: string;

  readonly url: string;
  readonly altText: string;

  readonly sortOrder: number;
  readonly isPrimary: boolean;

  readonly createdAt: Date;
}

export interface CatalogueJewelleryDetails {
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

export type CatalogueGemstoneCaratClaim =
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

export interface CatalogueGemstoneGroup {
  readonly id: string;

  readonly role: GemstoneRole;
  readonly gemstoneType: string;
  readonly origin: GemstoneOrigin;

  readonly quantity: number;

  readonly shape: string | null;
  readonly colour: string | null;
  readonly clarity: string | null;
  readonly cutGrade: string | null;
  readonly treatment: string | null;

  readonly caratClaim: CatalogueGemstoneCaratClaim;

  readonly notes: string | null;
  readonly displayOrder: number;

  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export interface CatalogueCertificate {
  readonly id: string;

  readonly scope: CertificationScope;

  readonly certificateType: string;
  readonly issuer: string;

  readonly certificateNumber: string | null;
  readonly verificationUrl: string | null;
  readonly documentUrl: string | null;

  readonly issuedAt: Date | null;
  readonly notes: string | null;

  readonly displayOrder: number;

  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export type CatalogueServicePricing =
  | {
      readonly mode: 'included';
      readonly price: null;
    }
  | {
      readonly mode: 'fixed';
      readonly price: CataloguePrice;
    }
  | {
      readonly mode: 'on_request';
      readonly price: null;
    };

export interface CatalogueService {
  readonly id: string;

  readonly serviceType: ProductServiceType;

  readonly title: string;
  readonly description: string | null;

  readonly isAvailable: boolean;
  readonly pricing: CatalogueServicePricing;

  readonly leadTimeDays: number | null;

  readonly requirements: string | null;
  readonly notes: string | null;

  readonly displayOrder: number;

  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export interface CatalogueProduct {
  readonly id: string;

  readonly slug: string;
  readonly sku: string;

  readonly name: string;
  readonly shortDescription: string;
  readonly description: string;
  readonly designStory: string | null;

  readonly category: string;
  readonly collectionId: string | null;

  readonly price: CataloguePrice;
  readonly supply: CatalogueSupply;

  readonly catalogueStatus: CatalogueStatus;
  readonly availability: ProductAvailability;
  readonly photographyType: PhotographyType;

  readonly isFeatured: boolean;

  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export interface CatalogueProductSummary {
  readonly id: string;

  readonly slug: string;
  readonly sku: string;

  readonly name: string;
  readonly shortDescription: string;
  readonly category: string;

  readonly collection: CatalogueCollectionReference | null;

  readonly price: CataloguePrice;
  readonly supply: CatalogueSupply;

  readonly catalogueStatus: CatalogueStatus;
  readonly availability: ProductAvailability;
  readonly photographyType: PhotographyType;

  readonly isFeatured: boolean;

  readonly primaryImage: CatalogueImage | null;
}

export interface CatalogueProductAggregate {
  readonly product: CatalogueProduct;

  readonly collection: CatalogueCollection | null;

  readonly images: readonly CatalogueImage[];

  readonly jewelleryDetails: CatalogueJewelleryDetails | null;

  readonly gemstoneGroups: readonly CatalogueGemstoneGroup[];

  readonly certificates: readonly CatalogueCertificate[];

  readonly services: readonly CatalogueService[];
}
