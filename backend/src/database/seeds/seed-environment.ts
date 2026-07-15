export type SeedNodeEnvironment =
  | 'development'
  | 'test'
  | 'production';

export interface SeedEnvironment {
  nodeEnv: SeedNodeEnvironment;
  databaseUrl: string;
}

function isSeedNodeEnvironment(
  value: string,
): value is SeedNodeEnvironment {
  return (
    value === 'development' ||
    value === 'test' ||
    value === 'production'
  );
}

export function resolveSeedEnvironment(
  environment: NodeJS.ProcessEnv,
): SeedEnvironment {
  const nodeEnv = environment.NODE_ENV ?? 'development';
  const databaseUrl = environment.DATABASE_URL;

  if (!isSeedNodeEnvironment(nodeEnv)) {
    throw new Error(
      `Unsupported database seed environment "${nodeEnv}"`,
    );
  }

  if (!databaseUrl || databaseUrl.trim().length === 0) {
    throw new Error(
      'DATABASE_URL is required when running database seeds',
    );
  }

  let parsedDatabaseUrl: URL;

  try {
    parsedDatabaseUrl = new URL(databaseUrl);
  } catch {
    throw new Error('DATABASE_URL is not a valid URL');
  }

  if (
    parsedDatabaseUrl.protocol !== 'postgres:' &&
    parsedDatabaseUrl.protocol !== 'postgresql:'
  ) {
    throw new Error(
      `DATABASE_URL must use postgres: or postgresql:; received "${parsedDatabaseUrl.protocol}"`,
    );
  }

  return {
    nodeEnv,
    databaseUrl,
  };
}
