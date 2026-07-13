import type {
  CatalogueCollectionResponse,
  CatalogueListResponse,
} from '../types/catalogue';

export function useCatalogueCollections() {
  const config = useRuntimeConfig();

  return useFetch<
    CatalogueListResponse<CatalogueCollectionResponse>
  >('/catalogue/collections', {
    baseURL: config.public.apiBaseUrl,

    key: 'catalogue-collections',

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
