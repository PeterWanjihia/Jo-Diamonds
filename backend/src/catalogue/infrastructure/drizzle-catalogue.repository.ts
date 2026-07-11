import { Inject, Injectable } from '@nestjs/common';
import { and, asc, desc, eq, inArray } from 'drizzle-orm';

import { DATABASE_CONNECTION } from '../../database';
import type { Database } from '../../database/database.types';
import {
  collections,
  productCertificates,
  productGemstoneGroups,
  productImages,
  productJewelleryDetails,
  productServices,
  products,
} from '../../database/schema';
import type {
  CatalogueCollection,
  CatalogueProductAggregate,
  CatalogueProductSummary,
  CatalogueRepository,
} from '../domain';
import {
  mapCatalogueCertificate,
  mapCatalogueCollection,
  mapCatalogueGemstoneGroup,
  mapCatalogueImage,
  mapCatalogueJewelleryDetails,
  mapCatalogueProduct,
  mapCatalogueProductSummary,
  mapCatalogueService,
  type CollectionRow,
  type ProductImageRow,
  type ProductRow,
} from './catalogue.persistence-mappers';

interface ProductWithCollectionRow {
  readonly product: ProductRow;
  readonly collection: CollectionRow | null;
}

@Injectable()
export class DrizzleCatalogueRepository implements CatalogueRepository {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly database: Database,
  ) {}

  async listPublicProductSummaries(): Promise<
    readonly CatalogueProductSummary[]
  > {
    const rows = await this.database
      .select({
        product: products,
        collection: collections,
      })
      .from(products)
      .leftJoin(collections, eq(products.collectionId, collections.id))
      .where(eq(products.catalogueStatus, 'published'))
      .orderBy(desc(products.isFeatured), asc(products.name), asc(products.id));

    return this.mapSummaryRows(rows);
  }

  async listPublicProductSummariesByCollectionSlug(
    collectionSlug: string,
  ): Promise<readonly CatalogueProductSummary[]> {
    const rows = await this.database
      .select({
        product: products,
        collection: collections,
      })
      .from(products)
      .innerJoin(collections, eq(products.collectionId, collections.id))
      .where(
        and(
          eq(products.catalogueStatus, 'published'),
          eq(collections.slug, collectionSlug),
        ),
      )
      .orderBy(desc(products.isFeatured), asc(products.name), asc(products.id));

    return this.mapSummaryRows(rows);
  }

  async findProductAggregateBySlug(
    slug: string,
  ): Promise<CatalogueProductAggregate | null> {
    const [rootRow] = await this.database
      .select({
        product: products,
        collection: collections,
      })
      .from(products)
      .leftJoin(collections, eq(products.collectionId, collections.id))
      .where(eq(products.slug, slug))
      .limit(1);

    if (!rootRow) {
      return null;
    }

    const productId = rootRow.product.id;

    const [
      imageRows,
      jewelleryDetailsRows,
      gemstoneGroupRows,
      certificateRows,
      serviceRows,
    ] = await Promise.all([
      this.database
        .select()
        .from(productImages)
        .where(eq(productImages.productId, productId))
        .orderBy(asc(productImages.sortOrder), asc(productImages.id)),

      this.database
        .select()
        .from(productJewelleryDetails)
        .where(eq(productJewelleryDetails.productId, productId))
        .limit(1),

      this.database
        .select()
        .from(productGemstoneGroups)
        .where(eq(productGemstoneGroups.productId, productId))
        .orderBy(
          asc(productGemstoneGroups.displayOrder),
          asc(productGemstoneGroups.id),
        ),

      this.database
        .select()
        .from(productCertificates)
        .where(eq(productCertificates.productId, productId))
        .orderBy(
          asc(productCertificates.displayOrder),
          asc(productCertificates.id),
        ),

      this.database
        .select()
        .from(productServices)
        .where(eq(productServices.productId, productId))
        .orderBy(asc(productServices.displayOrder), asc(productServices.id)),
    ]);

    const jewelleryDetailsRow = jewelleryDetailsRows[0] ?? null;

    return {
      product: mapCatalogueProduct(rootRow.product),

      collection:
        rootRow.collection === null
          ? null
          : mapCatalogueCollection(rootRow.collection),

      images: imageRows.map(mapCatalogueImage),

      jewelleryDetails:
        jewelleryDetailsRow === null
          ? null
          : mapCatalogueJewelleryDetails(jewelleryDetailsRow),

      gemstoneGroups: gemstoneGroupRows.map(mapCatalogueGemstoneGroup),

      certificates: certificateRows.map(mapCatalogueCertificate),

      services: serviceRows.map(mapCatalogueService),
    };
  }

  async listCollections(): Promise<readonly CatalogueCollection[]> {
    const rows = await this.database
      .select()
      .from(collections)
      .orderBy(asc(collections.name), asc(collections.id));

    return rows.map(mapCatalogueCollection);
  }

  async findCollectionBySlug(
    slug: string,
  ): Promise<CatalogueCollection | null> {
    const [row] = await this.database
      .select()
      .from(collections)
      .where(eq(collections.slug, slug))
      .limit(1);

    return row ? mapCatalogueCollection(row) : null;
  }

  private async mapSummaryRows(
    rows: readonly ProductWithCollectionRow[],
  ): Promise<readonly CatalogueProductSummary[]> {
    if (rows.length === 0) {
      return [];
    }

    const productIds = rows.map(({ product }) => product.id);

    const primaryImageRows = await this.database
      .select()
      .from(productImages)
      .where(
        and(
          inArray(productImages.productId, productIds),
          eq(productImages.isPrimary, true),
        ),
      )
      .orderBy(asc(productImages.sortOrder), asc(productImages.id));

    const primaryImageByProductId = this.indexPrimaryImages(primaryImageRows);

    return rows.map(({ product, collection }) =>
      mapCatalogueProductSummary(
        product,
        collection,
        primaryImageByProductId.get(product.id) ?? null,
      ),
    );
  }

  private indexPrimaryImages(
    rows: readonly ProductImageRow[],
  ): ReadonlyMap<string, ProductImageRow> {
    const primaryImageByProductId = new Map<string, ProductImageRow>();

    for (const row of rows) {
      if (!primaryImageByProductId.has(row.productId)) {
        primaryImageByProductId.set(row.productId, row);
      }
    }

    return primaryImageByProductId;
  }
}
