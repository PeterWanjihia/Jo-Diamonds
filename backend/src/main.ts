import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  const host = process.env.HOST ?? '127.0.0.1';
  const port = Number(process.env.PORT ?? 4000);

  await app.listen(port, host);

  console.log(`JO.DIAMONDS API listening on http://${host}:${port}`);
}

void bootstrap();
