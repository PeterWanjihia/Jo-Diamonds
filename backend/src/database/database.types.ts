import type { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import type postgres from 'postgres';

import * as schema from './schema';

export type PostgresClient = ReturnType<typeof postgres>;

export type Database = PostgresJsDatabase<typeof schema>;
