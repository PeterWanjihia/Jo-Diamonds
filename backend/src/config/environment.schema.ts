import * as Joi from 'joi';

const postgresConnectionUrl = Joi.string().uri({
  scheme: ['postgres', 'postgresql'],
});

const developmentDatabaseUrl =
  'postgres://jdiamonds:jdiamonds@127.0.0.1:5432/jdiamonds_dev';

const testDatabaseUrl =
  'postgres://jdiamonds:jdiamonds@127.0.0.1:5433/jdiamonds_test';

export const environmentSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'test', 'staging', 'production')
    .default('development'),

  HOST: Joi.string()
    .ip({ version: ['ipv4'] })
    .default('127.0.0.1'),

  PORT: Joi.number().integer().min(1).max(65535).default(4000),

  API_PREFIX: Joi.string()
    .pattern(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
    .default('v1'),

  FRONTEND_ORIGIN: Joi.when('NODE_ENV', {
    is: Joi.valid('staging', 'production'),
    then: Joi.string()
      .uri({ scheme: ['https'] })
      .required(),
    otherwise: Joi.string()
      .uri({ scheme: ['http', 'https'] })
      .default('http://localhost:3000'),
  }),

  LOG_LEVEL: Joi.string()
    .valid('debug', 'info', 'warn', 'error')
    .default('debug'),

  DATABASE_URL: Joi.when('NODE_ENV', {
    switch: [
      {
        is: 'test',
        then: postgresConnectionUrl.default(testDatabaseUrl),
      },
      {
        is: Joi.valid('staging', 'production'),
        then: postgresConnectionUrl.required(),
      },
    ],
    otherwise: postgresConnectionUrl.default(developmentDatabaseUrl),
  }),

  TEST_DATABASE_URL: Joi.when('NODE_ENV', {
    is: 'test',
    then: postgresConnectionUrl.default(testDatabaseUrl),
    otherwise: postgresConnectionUrl.optional(),
  }),
});
