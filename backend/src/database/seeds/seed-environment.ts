import { environmentSchema } from '../../config/environment.schema';

type SeedNodeEnvironment = 'development' | 'test';

interface ValidatedSeedEnvironment {
  NODE_ENV: SeedNodeEnvironment;
  DATABASE_URL: string;
}

export interface SeedEnvironment {
  nodeEnv: SeedNodeEnvironment;
  databaseUrl: string;
}

function isValidatedSeedEnvironment(
  value: unknown,
): value is ValidatedSeedEnvironment {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  if (!('NODE_ENV' in value) || !('DATABASE_URL' in value)) {
    return false;
  }

  return (
    (value.NODE_ENV === 'development' || value.NODE_ENV === 'test') &&
    typeof value.DATABASE_URL === 'string'
  );
}

export function resolveSeedEnvironment(
  environment: NodeJS.ProcessEnv,
): SeedEnvironment {
  const requestedNodeEnv = environment.NODE_ENV ?? 'development';

  if (requestedNodeEnv !== 'development' && requestedNodeEnv !== 'test') {
    throw new Error(
      `Database seeding is allowed only in development or test; received "${requestedNodeEnv}"`,
    );
  }

  const validationResult: {
    error?: {
      details: Array<{
        message: string;
      }>;
    };
    value: unknown;
  } = environmentSchema.validate(environment, {
    abortEarly: false,
    allowUnknown: true,
  });

  if (validationResult.error) {
    const messages = validationResult.error.details
      .map((detail) => detail.message)
      .join('; ');

    throw new Error(`Invalid seed environment: ${messages}`);
  }

  if (!isValidatedSeedEnvironment(validationResult.value)) {
    throw new Error(
      'Validated seed environment did not contain a valid NODE_ENV and DATABASE_URL',
    );
  }

  return {
    nodeEnv: validationResult.value.NODE_ENV,
    databaseUrl: validationResult.value.DATABASE_URL,
  };
}
