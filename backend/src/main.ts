import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';
import type { EnvironmentVariables } from './config/environment';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

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
  });

  await app.listen(port, host);

  console.log(
    `JO.DIAMONDS API listening at http://${host}:${port}/${apiPrefix}`,
  );
}

void bootstrap();
