export type ApplicationEnvironment =
  | 'development'
  | 'test'
  | 'staging'
  | 'production';

export interface EnvironmentVariables {
  NODE_ENV: ApplicationEnvironment;

  HOST: string;
  PORT: number;
  API_PREFIX: string;

  FRONTEND_ORIGIN: string;

  LOG_LEVEL:
    | 'debug'
    | 'info'
    | 'warn'
    | 'error';

  DATABASE_URL: string;
  TEST_DATABASE_URL?: string;

  /*
   * Controls whether this deployment may create
   * Stripe Checkout Sessions.
   */
  PAYMENTS_ENABLED: boolean;

  /*
   * Optional because the backend is allowed to run
   * while payments are disabled.
   *
   * Joi guarantees that it exists when
   * PAYMENTS_ENABLED is true.
   */
  STRIPE_SECRET_KEY?: string;
}
