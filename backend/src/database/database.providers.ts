import type { FactoryProvider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

import type { EnvironmentVariables } from '../config/environment';
import { DATABASE_CLIENT, DATABASE_CONNECTION } from './database.constants';
import type { Database, PostgresClient } from './database.types';
import * as schema from './schema';

const DATABASE_POOL_MAX_CONNECTIONS = 5;
const DATABASE_CONNECT_TIMEOUT_SECONDS = 10;

export const databaseClientProvider: FactoryProvider<PostgresClient> = {
  provide: DATABASE_CLIENT,
  inject: [ConfigService],
  useFactory: (
    configService: ConfigService<EnvironmentVariables, true>,
  ): PostgresClient => {
    const databaseUrl = configService.get('DATABASE_URL', {
      infer: true,
    });

    return postgres(databaseUrl, {
      max: DATABASE_POOL_MAX_CONNECTIONS,
      connect_timeout: DATABASE_CONNECT_TIMEOUT_SECONDS,
      connection: {
        application_name: 'jdiamonds-api',
      },
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
