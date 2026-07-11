import type {
  collections,
  productCertificates,
  productGemstoneGroups,
  productImages,
  productJewelleryDetails,
  productServices,
  products,
} from '../../database/schema';
import type {
  CatalogueCertificate,
  CatalogueCollection,
  CatalogueCollectionReference,
  CatalogueGemstoneCaratClaim,
  CatalogueGemstoneGroup,
  CatalogueImage,
  CatalogueJewelleryDetails,
  CatalogueProduct,
  CatalogueProductSummary,
  CatalogueProductService,
  CatalogueServicePricing,
  CatalogueSupply,
} from '../domain';

export type ProductRow = typeof products.$inferSelect;
export type CollectionRow = typeof collections.$inferSelect;
export type ProductImageRow = typeof productImages.$inferSelect;
export type JewelleryDetailsRow = typeof productJewelleryDetails.$inferSelect;
export type GemstoneGroupRow = typeof productGemstoneGroups.$inferSelect;
export type CertificateRow = typeof productCertificates.$inferSelect;
export type ProductServiceRow = typeof productServices.$inferSelect;

function persistenceInvariant(message: string): never {
  throw new Error(`Invalid persisted catalogue data: ${message}`);
}

export function mapCatalogueSupply(
  supplyMode: ProductRow['supplyMode'],
  editionSize: ProductRow['editionSize'],
): CatalogueSupply {
  switch (supplyMode) {
    case 'unique': {
      if (editionSize !== 1) {
        return persistenceInvariant(
          `unique product must have edition size 1; received ${String(
            editionSize,
          )}`,
        );
      }

      return {
        mode: 'unique',
        editionSize: 1,
      };
    }

    case 'limited': {
      if (editionSize === null || editionSize <= 1) {
        return persistenceInvariant(
          `limited product must have edition size greater than 1; received ${String(
            editionSize,
          )}`,
        );
      }

      return {
        mode: 'limited',
        editionSize,
      };
    }

    case 'reproducible': {
      if (editionSize !== null) {
        return persistenceInvariant(
          `reproducible product cannot have an edition size; received ${editionSize}`,
        );
      }

      return {
        mode: 'reproducible',
        editionSize: null,
      };
    }
  }
}

export function mapCatalogueCollection(
  row: CollectionRow,
): CatalogueCollection {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    description: row.description,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  };
}

export function mapCatalogueCollectionReference(
  row: CollectionRow,
): CatalogueCollectionReference {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
  };
}

export function mapCatalogueImage(row: ProductImageRow): CatalogueImage {
  return {
    id: row.id,
    url: row.url,
    altText: row.altText,
    sortOrder: row.sortOrder,
    isPrimary: row.isPrimary,
    createdAt: row.createdAt,
  };
}

export function mapCatalogueJewelleryDetails(
  row: JewelleryDetailsRow,
): CatalogueJewelleryDetails {
  return {
    metalType: row.metalType,
    metalPurity: row.metalPurity,
    metalColour: row.metalColour,

    totalWeightGrams: row.totalWeightGrams,

    widthMm: row.widthMm,
    heightMm: row.heightMm,
    depthMm: row.depthMm,
    lengthMm: row.lengthMm,

    settingStyle: row.settingStyle,

    sizeSystem: row.sizeSystem,
    sizeValue: row.sizeValue,

    resizable: row.resizable,
    resizeMin: row.resizeMin,
    resizeMax: row.resizeMax,
    resizeNotes: row.resizeNotes,

    adjustable: row.adjustable,

    claspType: row.claspType,
    backingType: row.backingType,
    soldAs: row.soldAs,
  };
}

function mapGemstoneCaratClaim(
  row: GemstoneGroupRow,
): CatalogueGemstoneCaratClaim {
  switch (row.specificationMode) {
    case 'exact':
    case 'approximate': {
      if (
        row.totalCaratWeight === null ||
        row.minimumTotalCaratWeight !== null ||
        row.maximumTotalCaratWeight !== null
      ) {
        return persistenceInvariant(
          `${row.specificationMode} gemstone group "${row.id}" has an invalid carat claim`,
        );
      }

      return {
        mode: row.specificationMode,
        totalCaratWeight: row.totalCaratWeight,
      };
    }

    case 'range': {
      if (
        row.totalCaratWeight !== null ||
        row.minimumTotalCaratWeight === null ||
        row.maximumTotalCaratWeight === null ||
        row.minimumTotalCaratWeight > row.maximumTotalCaratWeight
      ) {
        return persistenceInvariant(
          `range gemstone group "${row.id}" has an invalid carat claim`,
        );
      }

      return {
        mode: 'range',
        minimumTotalCaratWeight: row.minimumTotalCaratWeight,
        maximumTotalCaratWeight: row.maximumTotalCaratWeight,
      };
    }
  }
}

export function mapCatalogueGemstoneGroup(
  row: GemstoneGroupRow,
): CatalogueGemstoneGroup {
  return {
    id: row.id,

    role: row.role,
    gemstoneType: row.gemstoneType,
    origin: row.origin,

    quantity: row.quantity,

    shape: row.shape,
    colour: row.colour,
    clarity: row.clarity,
    cutGrade: row.cutGrade,
    treatment: row.treatment,

    caratClaim: mapGemstoneCaratClaim(row),

    notes: row.notes,
    displayOrder: row.displayOrder,

    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  };
}

export function mapCatalogueCertificate(
  row: CertificateRow,
): CatalogueCertificate {
  return {
    id: row.id,

    scope: row.scope,

    certificateType: row.certificateType,
    issuer: row.issuer,

    certificateNumber: row.certificateNumber,
    verificationUrl: row.verificationUrl,
    documentUrl: row.documentUrl,

    issuedAt: row.issuedAt,
    notes: row.notes,

    displayOrder: row.displayOrder,

    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  };
}

function mapServicePricing(row: ProductServiceRow): CatalogueServicePricing {
  if (row.isIncluded && !row.priceOnRequest && row.priceMinor === null) {
    return {
      mode: 'included',
      price: null,
    };
  }

  if (!row.isIncluded && row.priceOnRequest && row.priceMinor === null) {
    return {
      mode: 'on_request',
      price: null,
    };
  }

  if (!row.isIncluded && !row.priceOnRequest && row.priceMinor !== null) {
    return {
      mode: 'fixed',
      price: {
        minor: row.priceMinor,
        currency: row.currency,
      },
    };
  }

  return persistenceInvariant(
    `product service "${row.id}" has an invalid pricing configuration`,
  );
}

export function mapCatalogueService(
  row: ProductServiceRow,
): CatalogueProductService {
  return {
    id: row.id,

    serviceType: row.serviceType,

    title: row.title,
    description: row.description,

    isAvailable: row.isAvailable,
    pricing: mapServicePricing(row),

    leadTimeDays: row.leadTimeDays,

    requirements: row.requirements,
    notes: row.notes,

    displayOrder: row.displayOrder,

    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  };
}

export function mapCatalogueProduct(row: ProductRow): CatalogueProduct {
  return {
    id: row.id,

    slug: row.slug,
    sku: row.sku,

    name: row.name,
    shortDescription: row.shortDescription,
    description: row.description,
    designStory: row.designStory,

    category: row.category,
    collectionId: row.collectionId,

    price: {
      minor: row.priceMinor,
      currency: row.currency,
    },

    supply: mapCatalogueSupply(row.supplyMode, row.editionSize),

    catalogueStatus: row.catalogueStatus,
    availability: row.availability,
    photographyType: row.photographyType,

    isFeatured: row.isFeatured,

    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  };
}

export function mapCatalogueProductSummary(
  productRow: ProductRow,
  collectionRow: CollectionRow | null,
  primaryImageRow: ProductImageRow | null,
): CatalogueProductSummary {
  const product = mapCatalogueProduct(productRow);

  return {
    id: product.id,

    slug: product.slug,
    sku: product.sku,

    name: product.name,
    shortDescription: product.shortDescription,
    category: product.category,

    collection:
      collectionRow === null
        ? null
        : mapCatalogueCollectionReference(collectionRow),

    price: product.price,
    supply: product.supply,

    catalogueStatus: product.catalogueStatus,
    availability: product.availability,
    photographyType: product.photographyType,

    isFeatured: product.isFeatured,

    primaryImage:
      primaryImageRow === null ? null : mapCatalogueImage(primaryImageRow),
  };
}
