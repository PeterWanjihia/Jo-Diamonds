const validEnvironments = new Set([
  'development',
  'test',
  'staging',
  'production',
]);

function parseAbsoluteUrl(
  value: string,
  variableName: string,
): URL {
  try {
    return new URL(value);
  } catch {
    throw new Error(
      `${variableName} must be a valid absolute URL: "${value}"`,
    );
  }
}

export default defineNitroPlugin(() => {
  const config = useRuntimeConfig();

  const environment = config.public.appEnvironment;
  const apiBaseUrl = config.public.apiBaseUrl;
  const siteUrl = config.public.siteUrl;

  if (!validEnvironments.has(environment)) {
    throw new Error(
      `Invalid NUXT_PUBLIC_APP_ENVIRONMENT: "${environment}"`,
    );
  }

  const parsedApiUrl = parseAbsoluteUrl(
    apiBaseUrl,
    'NUXT_PUBLIC_API_BASE_URL',
  );

  const parsedSiteUrl = parseAbsoluteUrl(
    siteUrl,
    'NUXT_PUBLIC_SITE_URL',
  );

  if (
    ['staging', 'production'].includes(environment) &&
    parsedApiUrl.protocol !== 'https:'
  ) {
    throw new Error(
      'Staging and production API URLs must use HTTPS.',
    );
  }

  if (
    ['staging', 'production'].includes(environment) &&
    parsedSiteUrl.protocol !== 'https:'
  ) {
    throw new Error(
      'Staging and production site URLs must use HTTPS.',
    );
  }
});
