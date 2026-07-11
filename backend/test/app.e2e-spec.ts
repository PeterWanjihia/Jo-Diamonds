import { HttpStatus } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import {
  FastifyAdapter,
  type NestFastifyApplication,
} from '@nestjs/platform-fastify';

import { AppModule } from '../src/app.module';

interface RootResponseBody {
  readonly service: string;
  readonly status: string;
  readonly message: string;
}

interface HealthResponseBody {
  readonly status: string;
  readonly timestamp: string;
}

function parseJson<T>(body: string): T {
  const parsed: unknown = JSON.parse(body);

  return parsed as T;
}

describe('AppController e2e', () => {
  let application: NestFastifyApplication | undefined;

  beforeAll(async () => {
    const testingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    application = testingModule.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter(),
    );

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

  it('GET / returns the API status', async () => {
    const response = await getApplication().inject({
      method: 'GET',
      url: '/',
    });

    expect(response.statusCode).toBe(HttpStatus.OK);

    expect(parseJson<RootResponseBody>(response.body)).toEqual({
      service: 'JO.DIAMONDS API',
      status: 'ok',
      message: 'Hello World!',
    });
  });

  it('GET /health returns the health status', async () => {
    const response = await getApplication().inject({
      method: 'GET',
      url: '/health',
    });

    expect(response.statusCode).toBe(HttpStatus.OK);

    const body = parseJson<HealthResponseBody>(response.body);

    expect(body.status).toBe('ok');
    expect(typeof body.timestamp).toBe('string');
    expect(Number.isNaN(Date.parse(body.timestamp))).toBe(false);
  });
});
