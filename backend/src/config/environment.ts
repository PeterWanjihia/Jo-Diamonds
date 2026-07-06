export type ApplicationEnvironment =
  'development' | 'test' | 'staging' | 'production';

export interface EnvironmentVariables {
  NODE_ENV: ApplicationEnvironment;
  HOST: string;
  PORT: number;
  API_PREFIX: string;
  FRONTEND_ORIGIN: string;
  LOG_LEVEL: 'debug' | 'info' | 'warn' | 'error';
}
