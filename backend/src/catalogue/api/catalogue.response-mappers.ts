import type {
  CatalogueCertificate,
  CatalogueCollection,
  CatalogueCollectionReference,
  CatalogueGemstoneCaratClaim,
  CatalogueGemstoneGroup,
  CatalogueImage,
  CatalogueJewelleryDetails,
  CataloguePrice,
  CatalogueProductAggregate,
  CatalogueProductService,
  CatalogueProductSummary,
  CatalogueServicePricing,
  CatalogueSupply,
} from '../domain';
import { canEnterBag, deriveCommercialState } from '../domain';
import type {
  CatalogueCertificateResponse,
  CatalogueCollectionReferenceResponse,
  CatalogueCollectionResponse,
  CatalogueGemstoneCaratClaimResponse,
  CatalogueGemstoneGroupResponse,
  CatalogueImageResponse,
  CatalogueJewelleryDetailsResponse,
  CataloguePriceResponse,
  CatalogueProductDetailResponse,
  CatalogueProductServiceResponse,
  CatalogueProductSummaryResponse,
  CatalogueServicePricingResponse,
  CatalogueSupplyResponse,
} from './catalogue.response-types';

function mapPrice(price: CataloguePrice): CataloguePriceResponse {
  return {
    minor: price.minor,
    currency: price.currency,
  };
}

function mapSupply(supply: CatalogueSupply): CatalogueSupplyResponse {
  switch (supply.mode) {
    case 'unique':
      return {
        mode: 'unique',
        editionSize: 1,
      };

    case 'limited':
      return {
        mode: 'limited',
        editionSize: supply.editionSize,
      };

    case 'reproducible':
      return {
        mode: 'reproducible',
        editionSize: null,
      };
  }
}

function mapCollectionReference(
  collection: CatalogueCollectionReference,
): CatalogueCollectionReferenceResponse {
  return {
    slug: collection.slug,
    name: collection.name,
  };
}

export function mapCatalogueCollectionResponse(
  collection: CatalogueCollection,
): CatalogueCollectionResponse {
  return {
    slug: collection.slug,
    name: collection.name,
    description: collection.description,
  };
}

function mapImage(image: CatalogueImage): CatalogueImageResponse {
  return {
    url: image.url,
    altText: image.altText,
    sortOrder: image.sortOrder,
    isPrimary: image.isPrimary,
  };
}

function mapJewelleryDetails(
  details: CatalogueJewelleryDetails,
): CatalogueJewelleryDetailsResponse {
  return {
    metalType: details.metalType,
    metalPurity: details.metalPurity,
    metalColour: details.metalColour,

    totalWeightGrams: details.totalWeightGrams,

    widthMm: details.widthMm,
    heightMm: details.heightMm,
    depthMm: details.depthMm,
    lengthMm: details.lengthMm,

    settingStyle: details.settingStyle,

    sizeSystem: details.sizeSystem,
    sizeValue: details.sizeValue,

    resizable: details.resizable,
    resizeMin: details.resizeMin,
    resizeMax: details.resizeMax,
    resizeNotes: details.resizeNotes,

    adjustable: details.adjustable,

    claspType: details.claspType,
    backingType: details.backingType,
    soldAs: details.soldAs,
  };
}

function mapGemstoneCaratClaim(
  claim: CatalogueGemstoneCaratClaim,
): CatalogueGemstoneCaratClaimResponse {
  switch (claim.mode) {
    case 'exact':
      return {
        mode: 'exact',
        totalCaratWeight: claim.totalCaratWeight,
      };

    case 'approximate':
      return {
        mode: 'approximate',
        totalCaratWeight: claim.totalCaratWeight,
      };

    case 'range':
      return {
        mode: 'range',
        minimumTotalCaratWeight: claim.minimumTotalCaratWeight,
        maximumTotalCaratWeight: claim.maximumTotalCaratWeight,
      };
  }
}

function mapGemstoneGroup(
  gemstone: CatalogueGemstoneGroup,
): CatalogueGemstoneGroupResponse {
  return {
    role: gemstone.role,
    gemstoneType: gemstone.gemstoneType,
    origin: gemstone.origin,

    quantity: gemstone.quantity,

    shape: gemstone.shape,
    colour: gemstone.colour,
    clarity: gemstone.clarity,
    cutGrade: gemstone.cutGrade,
    treatment: gemstone.treatment,

    caratClaim: mapGemstoneCaratClaim(gemstone.caratClaim),

    notes: gemstone.notes,
    displayOrder: gemstone.displayOrder,
  };
}

function mapCertificate(
  certificate: CatalogueCertificate,
): CatalogueCertificateResponse {
  return {
    scope: certificate.scope,

    certificateType: certificate.certificateType,
    issuer: certificate.issuer,

    certificateNumber: certificate.certificateNumber,
    verificationUrl: certificate.verificationUrl,
    documentUrl: certificate.documentUrl,

    issuedAt:
      certificate.issuedAt === null ? null : certificate.issuedAt.toISOString(),

    notes: certificate.notes,
    displayOrder: certificate.displayOrder,
  };
}

function mapServicePricing(
  pricing: CatalogueServicePricing,
): CatalogueServicePricingResponse {
  switch (pricing.mode) {
    case 'included':
      return {
        mode: 'included',
        price: null,
      };

    case 'fixed':
      return {
        mode: 'fixed',
        price: mapPrice(pricing.price),
      };

    case 'on_request':
      return {
        mode: 'on_request',
        price: null,
      };
  }
}

function mapProductService(
  service: CatalogueProductService,
): CatalogueProductServiceResponse {
  return {
    serviceType: service.serviceType,

    title: service.title,
    description: service.description,

    isAvailable: service.isAvailable,
    pricing: mapServicePricing(service.pricing),

    leadTimeDays: service.leadTimeDays,

    requirements: service.requirements,
    notes: service.notes,

    displayOrder: service.displayOrder,
  };
}

export function mapCatalogueProductSummaryResponse(
  product: CatalogueProductSummary,
): CatalogueProductSummaryResponse {
  return {
    slug: product.slug,
    sku: product.sku,

    name: product.name,
    shortDescription: product.shortDescription,
    category: product.category,

    collection:
      product.collection === null
        ? null
        : mapCollectionReference(product.collection),

    price: mapPrice(product.price),
    supply: mapSupply(product.supply),

    availability: product.availability,
    commercialState: deriveCommercialState(product),
    canEnterBag: canEnterBag(product),

    photographyType: product.photographyType,
    isFeatured: product.isFeatured,

    primaryImage:
      product.primaryImage === null ? null : mapImage(product.primaryImage),
  };
}

export function mapCatalogueProductDetailResponse(
  aggregate: CatalogueProductAggregate,
): CatalogueProductDetailResponse {
  const { product } = aggregate;

  return {
    slug: product.slug,
    sku: product.sku,

    name: product.name,
    shortDescription: product.shortDescription,
    description: product.description,
    designStory: product.designStory,

    category: product.category,

    collection:
      aggregate.collection === null
        ? null
        : mapCatalogueCollectionResponse(aggregate.collection),

    price: mapPrice(product.price),
    supply: mapSupply(product.supply),

    availability: product.availability,
    commercialState: deriveCommercialState(product),
    canEnterBag: canEnterBag(product),

    photographyType: product.photographyType,
    isFeatured: product.isFeatured,

    images: aggregate.images.map(mapImage),

    jewelleryDetails:
      aggregate.jewelleryDetails === null
        ? null
        : mapJewelleryDetails(aggregate.jewelleryDetails),

    gemstoneGroups: aggregate.gemstoneGroups.map(mapGemstoneGroup),

    certificates: aggregate.certificates.map(mapCertificate),

    services: aggregate.services.map(mapProductService),
  };
}
