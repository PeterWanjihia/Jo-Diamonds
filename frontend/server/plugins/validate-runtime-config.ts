const validEnvironments = new Set([
  'development',
  'test',
  'staging',
  'production',
]);

export default defineNitroPlugin(() => {
  const config = useRuntimeConfig();

  const environment = config.public.appEnvironment;
  const apiBaseUrl = config.public.apiBaseUrl;

  if (!validEnvironments.has(environment)) {
    throw new Error(
      `Invalid NUXT_PUBLIC_APP_ENVIRONMENT: "${environment}"`,
    );
  }

  let parsedApiUrl: URL;

  try {
    parsedApiUrl = new URL(apiBaseUrl);
  } catch {
    throw new Error(
      `NUXT_PUBLIC_API_BASE_URL must be a valid absolute URL: "${apiBaseUrl}"`,
    );
  }

  if (
    ['staging', 'production'].includes(environment) &&
    parsedApiUrl.protocol !== 'https:'
  ) {
    throw new Error(
      'Staging and production API URLs must use HTTPS.',
    );
  }
});
