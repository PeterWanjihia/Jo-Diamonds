import { randomUUID } from 'node:crypto';

import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  type NestFastifyApplication,
} from '@nestjs/platform-fastify';

import { AppModule } from './app.module';
import type { EnvironmentVariables } from './config/environment';

const MAX_REQUEST_BODY_BYTES = 64 * 1024;
const REQUEST_TIMEOUT_MS = 10_000;
const HANDLER_TIMEOUT_MS = 15_000;
const REQUEST_ID_RESPONSE_HEADER = 'X-Request-Id';

async function bootstrap(): Promise<void> {
  const fastifyAdapter = new FastifyAdapter({
    bodyLimit: MAX_REQUEST_BODY_BYTES,
    requestTimeout: REQUEST_TIMEOUT_MS,
    handlerTimeout: HANDLER_TIMEOUT_MS,
    requestIdHeader: false,
    requestIdLogLabel: 'requestId',
    genReqId: (): string => `req_${randomUUID()}`,
  });

  fastifyAdapter
    .getInstance()
    .addHook('onRequest', (request, reply, done): void => {
      reply.header(REQUEST_ID_RESPONSE_HEADER, request.id);
      done();
    });

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    fastifyAdapter,
    {
      rawBody: true,
    },
  );

  const config =
    app.get<ConfigService<EnvironmentVariables, true>>(ConfigService);

  const host = config.get('HOST', { infer: true });
  const port = config.get('PORT', { infer: true });
  const apiPrefix = config.get('API_PREFIX', { infer: true });
  const frontendOrigin = config.get('FRONTEND_ORIGIN', {
    infer: true,
  });

  app.setGlobalPrefix(apiPrefix);

  app.enableCors({
    origin: frontendOrigin,
    methods: ['GET', 'HEAD', 'POST', 'OPTIONS'],
    credentials: false,
    exposedHeaders: [REQUEST_ID_RESPONSE_HEADER],
  });

  await app.listen(port, host);

  console.log(
    `JO.DIAMONDS API listening at http://${host}:${port}/${apiPrefix}`,
  );
}

void bootstrap();
