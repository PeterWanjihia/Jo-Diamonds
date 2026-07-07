import { defineConfig } from 'drizzle-kit';

const developmentDatabaseUrl =
  'postgres://jdiamonds:jdiamonds@127.0.0.1:5432/jdiamonds_dev';

export default defineConfig({
  schema: './src/database/schema/index.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL ?? developmentDatabaseUrl,
  },
  strict: true,
  verbose: true,
});
