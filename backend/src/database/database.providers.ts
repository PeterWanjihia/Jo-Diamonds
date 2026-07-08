import type { FactoryProvider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { drizzle } from 'drizzle-orm/postgres-js';

import type { EnvironmentVariables } from '../config/environment';
import { createPostgresClient } from './database.client';
import { DATABASE_CLIENT, DATABASE_CONNECTION } from './database.constants';
import type { Database, PostgresClient } from './database.types';
import * as schema from './schema';

export const databaseClientProvider: FactoryProvider<PostgresClient> = {
  provide: DATABASE_CLIENT,
  inject: [ConfigService],
  useFactory: (
    configService: ConfigService<EnvironmentVariables, true>,
  ): PostgresClient => {
    const databaseUrl = configService.get('DATABASE_URL', {
      infer: true,
    });

    return createPostgresClient(databaseUrl, {
      applicationName: 'jdiamonds-api',
      maxConnections: 5,
    });
  },
};

export const databaseConnectionProvider: FactoryProvider<Database> = {
  provide: DATABASE_CONNECTION,
  inject: [DATABASE_CLIENT],
  useFactory: (client: PostgresClient): Database =>
    drizzle({
      client,
      schema,
    }),
};
