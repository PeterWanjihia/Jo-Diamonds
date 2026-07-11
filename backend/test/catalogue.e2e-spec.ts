import { HttpStatus } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import {
  FastifyAdapter,
  type NestFastifyApplication,
} from '@nestjs/platform-fastify';

import { AppModule } from '../src/app.module';
import { createValidationPipe } from '../src/common/validation/create-validation-pipe';

interface ProductSummaryBody {
  readonly slug: string;
  readonly availability: string;
  readonly commercialState: string;
  readonly canEnterBag: boolean;
}

interface ProductListBody {
  readonly data: readonly ProductSummaryBody[];

  readonly meta: {
    readonly count: number;
  };
}

interface ProductDetailBody {
  readonly data: {
    readonly slug: string;
    readonly availability: string;
    readonly commercialState: string;
    readonly canEnterBag: boolean;

    readonly images: readonly unknown[];
    readonly gemstoneGroups: readonly unknown[];
    readonly certificates: readonly unknown[];
    readonly services: readonly unknown[];
  };
}

interface CollectionListBody {
  readonly data: readonly {
    readonly slug: string;
    readonly name: string;
  }[];

  readonly meta: {
    readonly count: number;
  };
}

interface ErrorBody {
  readonly statusCode: number;
  readonly error: string;
  readonly message: string | readonly string[];
}

function parseJson<T>(body: string): T {
  const parsed: unknown = JSON.parse(body);

  return parsed as T;
}

describe('Catalogue API e2e', () => {
  let application: NestFastifyApplication | undefined;

  beforeAll(async () => {
    const testingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    application = testingModule.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter(),
    );

    application.setGlobalPrefix('v1');
    application.useGlobalPipes(createValidationPipe());

    await application.init();
    await application.getHttpAdapter().getInstance().ready();
  });

  afterAll(async () => {
    await application?.close();
  });

  function getApplication(): NestFastifyApplication {
    if (!application) {
      throw new Error('Expected the Nest application to be initialized');
    }

    return application;
  }

  it('lists the three published catalogue products', async () => {
    const response = await getApplication().inject({
      method: 'GET',
      url: '/v1/catalogue/products',
    });

    expect(response.statusCode).toBe(HttpStatus.OK);

    const body = parseJson<ProductListBody>(response.body);

    expect(body.meta.count).toBe(3);

    expect(body.data.map((product) => product.slug)).toEqual([
      'classic-round-solitaire-ring',
      'emerald-cut-diamond-pendant',
      'halo-diamond-stud-earrings',
    ]);
  });

  it('returns a complete public product detail response', async () => {
    const response = await getApplication().inject({
      method: 'GET',
      url: '/v1/catalogue/products/classic-round-solitaire-ring',
    });

    expect(response.statusCode).toBe(HttpStatus.OK);

    const body = parseJson<ProductDetailBody>(response.body);

    expect(body.data).toMatchObject({
      slug: 'classic-round-solitaire-ring',
      availability: 'available',
      commercialState: 'available',
      canEnterBag: true,
    });

    expect(body.data.images).toHaveLength(2);
    expect(body.data.gemstoneGroups).toHaveLength(1);
    expect(body.data.certificates).toHaveLength(1);
    expect(body.data.services).toHaveLength(3);
  });

  it('returns a sold published product but disables bag entry', async () => {
    const response = await getApplication().inject({
      method: 'GET',
      url: '/v1/catalogue/products/emerald-cut-diamond-pendant',
    });

    expect(response.statusCode).toBe(HttpStatus.OK);

    const body = parseJson<ProductDetailBody>(response.body);

    expect(body.data).toMatchObject({
      slug: 'emerald-cut-diamond-pendant',
      availability: 'exhausted',
      commercialState: 'sold',
      canEnterBag: false,
    });
  });

  it('hides draft products from the public API', async () => {
    const response = await getApplication().inject({
      method: 'GET',
      url: '/v1/catalogue/products/diamond-tennis-bracelet',
    });

    expect(response.statusCode).toBe(HttpStatus.NOT_FOUND);

    expect(parseJson<ErrorBody>(response.body)).toEqual({
      statusCode: HttpStatus.NOT_FOUND,
      error: 'Not Found',
      message: 'Catalogue product not found.',
    });
  });

  it('hides archived products from the public API', async () => {
    const response = await getApplication().inject({
      method: 'GET',
      url: '/v1/catalogue/products/vintage-oval-halo-ring',
    });

    expect(response.statusCode).toBe(HttpStatus.NOT_FOUND);

    expect(parseJson<ErrorBody>(response.body)).toEqual({
      statusCode: HttpStatus.NOT_FOUND,
      error: 'Not Found',
      message: 'Catalogue product not found.',
    });
  });

  it('returns 404 for an unknown product', async () => {
    const response = await getApplication().inject({
      method: 'GET',
      url: '/v1/catalogue/products/missing-product',
    });

    expect(response.statusCode).toBe(HttpStatus.NOT_FOUND);

    expect(parseJson<ErrorBody>(response.body)).toMatchObject({
      statusCode: HttpStatus.NOT_FOUND,
      error: 'Not Found',
    });
  });

  it('rejects malformed product slugs', async () => {
    const response = await getApplication().inject({
      method: 'GET',
      url: '/v1/catalogue/products/INVALID_SLUG',
    });

    expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);

    expect(
      parseJson<{
        readonly code: string;
        readonly message: string;
        readonly errors: readonly string[];
      }>(response.body),
    ).toEqual({
      code: 'VALIDATION_ERROR',
      message: 'Request validation failed.',
      errors: [
        'slug: slug must contain lowercase letters, numbers, and single hyphens only',
      ],
    });
  });

  it('lists catalogue collections', async () => {
    const response = await getApplication().inject({
      method: 'GET',
      url: '/v1/catalogue/collections',
    });

    expect(response.statusCode).toBe(HttpStatus.OK);

    const body = parseJson<CollectionListBody>(response.body);

    expect(body.meta.count).toBe(3);

    expect(body.data.map((collection) => collection.slug)).toEqual([
      'heritage-halo',
      'modern-icons',
      'signature-solitaires',
    ]);
  });

  it('lists only published products in Signature Solitaires', async () => {
    const response = await getApplication().inject({
      method: 'GET',
      url: '/v1/catalogue/collections/signature-solitaires/products',
    });

    expect(response.statusCode).toBe(HttpStatus.OK);

    const body = parseJson<ProductListBody>(response.body);

    expect(body.meta.count).toBe(2);

    expect(body.data.map((product) => product.slug)).toEqual([
      'classic-round-solitaire-ring',
      'emerald-cut-diamond-pendant',
    ]);
  });

  it('excludes the draft bracelet from Modern Icons', async () => {
    const response = await getApplication().inject({
      method: 'GET',
      url: '/v1/catalogue/collections/modern-icons/products',
    });

    expect(response.statusCode).toBe(HttpStatus.OK);

    const body = parseJson<ProductListBody>(response.body);

    expect(body.meta.count).toBe(1);

    expect(body.data.map((product) => product.slug)).toEqual([
      'halo-diamond-stud-earrings',
    ]);
  });

  it('returns an empty list for a collection with no public products', async () => {
    const response = await getApplication().inject({
      method: 'GET',
      url: '/v1/catalogue/collections/heritage-halo/products',
    });

    expect(response.statusCode).toBe(HttpStatus.OK);

    const body = parseJson<ProductListBody>(response.body);

    expect(body).toEqual({
      data: [],
      meta: {
        count: 0,
      },
    });
  });

  it('returns 404 for an unknown collection', async () => {
    const response = await getApplication().inject({
      method: 'GET',
      url: '/v1/catalogue/collections/missing-collection',
    });

    expect(response.statusCode).toBe(HttpStatus.NOT_FOUND);

    expect(parseJson<ErrorBody>(response.body)).toEqual({
      statusCode: HttpStatus.NOT_FOUND,
      error: 'Not Found',
      message: 'Catalogue collection not found.',
    });
  });
});
