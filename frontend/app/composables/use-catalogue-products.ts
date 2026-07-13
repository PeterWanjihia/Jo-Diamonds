import type {
  CatalogueListResponse,
  CatalogueProductSummaryResponse,
} from '../types/catalogue';

export function useCatalogueProducts() {
  const config = useRuntimeConfig();

  return useFetch<
    CatalogueListResponse<CatalogueProductSummaryResponse>
  >('/catalogue/products', {
    baseURL: config.public.apiBaseUrl,

    key: 'catalogue-products',

    /*
     * GitHub Pages has no Nuxt server.
     *
     * Catalogue data is therefore loaded by the browser for
     * this first deployment architecture. Once the public API
     * is deployed, we may prerender selected catalogue data.
     */
    server: false,

    default: () => ({
      data: [],
      meta: {
        count: 0,
      },
    }),

    dedupe: 'defer',
  });
}
