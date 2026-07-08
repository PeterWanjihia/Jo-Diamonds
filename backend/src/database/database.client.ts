import postgres from 'postgres';

import type { PostgresClient } from './database.types';

const DEFAULT_MAX_CONNECTIONS = 5;
const CONNECT_TIMEOUT_SECONDS = 10;

interface CreatePostgresClientOptions {
  applicationName: string;
  maxConnections?: number;
}

export function createPostgresClient(
  databaseUrl: string,
  options: CreatePostgresClientOptions,
): PostgresClient {
  return postgres(databaseUrl, {
    max: options.maxConnections ?? DEFAULT_MAX_CONNECTIONS,
    connect_timeout: CONNECT_TIMEOUT_SECONDS,
    connection: {
      application_name: options.applicationName,
    },
  });
}
