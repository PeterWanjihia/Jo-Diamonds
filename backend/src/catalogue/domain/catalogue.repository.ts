import type {
  CatalogueCollection,
  CatalogueProductAggregate,
  CatalogueProductSummary,
} from './catalogue.models';

export interface CatalogueRepository {
  listPublicProductSummaries(): Promise<readonly CatalogueProductSummary[]>;

  listPublicProductSummariesByCollectionSlug(
    collectionSlug: string,
  ): Promise<readonly CatalogueProductSummary[]>;

  findProductAggregateBySlug(
    slug: string,
  ): Promise<CatalogueProductAggregate | null>;

  listCollections(): Promise<readonly CatalogueCollection[]>;

  findCollectionBySlug(slug: string): Promise<CatalogueCollection | null>;
}
