import { Inject, Injectable } from '@nestjs/common';

import { CATALOGUE_REPOSITORY } from '../catalogue.constants';
import type {
  CatalogueBagEligibility,
  CatalogueCollection,
  CatalogueCommercialState,
  CatalogueProductAggregate,
  CatalogueProductSummary,
  CatalogueRepository,
} from '../domain';
import {
  assessBagEligibility,
  deriveCommercialState,
  isPubliclyVisible,
} from '../domain';
import {
  CatalogueCollectionNotFoundError,
  CatalogueProductNotFoundError,
} from './catalogue.errors';

@Injectable()
export class CatalogueService {
  constructor(
    @Inject(CATALOGUE_REPOSITORY)
    private readonly catalogueRepository: CatalogueRepository,
  ) {}

  async listPublicProducts(): Promise<readonly CatalogueProductSummary[]> {
    const products =
      await this.catalogueRepository.listPublicProductSummaries();

    return products.filter(isPubliclyVisible);
  }

  async getPublicProductBySlug(
    slug: string,
  ): Promise<CatalogueProductAggregate> {
    const aggregate =
      await this.catalogueRepository.findProductAggregateBySlug(slug);

    if (aggregate === null || !isPubliclyVisible(aggregate.product)) {
      throw new CatalogueProductNotFoundError(slug);
    }

    return aggregate;
  }

  async listCollections(): Promise<readonly CatalogueCollection[]> {
    return this.catalogueRepository.listCollections();
  }

  async getCollectionBySlug(slug: string): Promise<CatalogueCollection> {
    const collection =
      await this.catalogueRepository.findCollectionBySlug(slug);

    if (collection === null) {
      throw new CatalogueCollectionNotFoundError(slug);
    }

    return collection;
  }

  async listPublicProductsByCollectionSlug(
    collectionSlug: string,
  ): Promise<readonly CatalogueProductSummary[]> {
    const collection =
      await this.catalogueRepository.findCollectionBySlug(collectionSlug);

    if (collection === null) {
      throw new CatalogueCollectionNotFoundError(collectionSlug);
    }

    const products =
      await this.catalogueRepository.listPublicProductSummariesByCollectionSlug(
        collectionSlug,
      );

    return products.filter(isPubliclyVisible);
  }

  async assessProductBagEligibilityBySlug(
    slug: string,
  ): Promise<CatalogueBagEligibility> {
    const aggregate =
      await this.catalogueRepository.findProductAggregateBySlug(slug);

    if (aggregate === null) {
      throw new CatalogueProductNotFoundError(slug);
    }

    return assessBagEligibility(aggregate.product);
  }

  async deriveProductCommercialStateBySlug(
    slug: string,
  ): Promise<CatalogueCommercialState> {
    const aggregate =
      await this.catalogueRepository.findProductAggregateBySlug(slug);

    if (aggregate === null) {
      throw new CatalogueProductNotFoundError(slug);
    }

    return deriveCommercialState(aggregate.product);
  }
}
