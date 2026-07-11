import { Controller, Get, Param, UseFilters } from '@nestjs/common';

import { CatalogueService } from '../application';
import { CatalogueExceptionFilter } from './catalogue-exception.filter';
import { CatalogueSlugParamsDto } from './catalogue-slug.params.dto';
import {
  mapCatalogueCollectionResponse,
  mapCatalogueProductDetailResponse,
  mapCatalogueProductSummaryResponse,
} from './catalogue.response-mappers';
import type {
  CatalogueCollectionResponse,
  CatalogueListResponse,
  CatalogueProductDetailResponse,
  CatalogueProductSummaryResponse,
  CatalogueResourceResponse,
} from './catalogue.response-types';

@UseFilters(CatalogueExceptionFilter)
@Controller('catalogue')
export class CatalogueController {
  constructor(private readonly catalogueService: CatalogueService) {}

  @Get('products')
  async listProducts(): Promise<
    CatalogueListResponse<CatalogueProductSummaryResponse>
  > {
    const products = await this.catalogueService.listPublicProducts();

    const data = products.map(mapCatalogueProductSummaryResponse);

    return {
      data,
      meta: {
        count: data.length,
      },
    };
  }

  @Get('products/:slug')
  async getProduct(
    @Param() params: CatalogueSlugParamsDto,
  ): Promise<CatalogueResourceResponse<CatalogueProductDetailResponse>> {
    const aggregate = await this.catalogueService.getPublicProductBySlug(
      params.slug,
    );

    return {
      data: mapCatalogueProductDetailResponse(aggregate),
    };
  }

  @Get('collections')
  async listCollections(): Promise<
    CatalogueListResponse<CatalogueCollectionResponse>
  > {
    const collections = await this.catalogueService.listCollections();

    const data = collections.map(mapCatalogueCollectionResponse);

    return {
      data,
      meta: {
        count: data.length,
      },
    };
  }

  @Get('collections/:slug/products')
  async listCollectionProducts(
    @Param() params: CatalogueSlugParamsDto,
  ): Promise<CatalogueListResponse<CatalogueProductSummaryResponse>> {
    const products =
      await this.catalogueService.listPublicProductsByCollectionSlug(
        params.slug,
      );

    const data = products.map(mapCatalogueProductSummaryResponse);

    return {
      data,
      meta: {
        count: data.length,
      },
    };
  }

  @Get('collections/:slug')
  async getCollection(
    @Param() params: CatalogueSlugParamsDto,
  ): Promise<CatalogueResourceResponse<CatalogueCollectionResponse>> {
    const collection = await this.catalogueService.getCollectionBySlug(
      params.slug,
    );

    return {
      data: mapCatalogueCollectionResponse(collection),
    };
  }
}
