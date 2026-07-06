import * as Joi from 'joi';

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
});
