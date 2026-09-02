import {
  computed,
  toValue,
  type MaybeRefOrGetter,
} from 'vue';

import type {
  CatalogueProductDetailResponse,
  CatalogueResourceResponse,
} from '../types/catalogue';

export function useCatalogueProduct(
  slug: MaybeRefOrGetter<string>,
) {
  const config = useRuntimeConfig();

  const productPath = computed(
    () =>
      `/catalogue/products/${encodeURIComponent(
        toValue(slug),
      )}`,
  );

  return useFetch<
    CatalogueResourceResponse<CatalogueProductDetailResponse>
  >(productPath, {
    baseURL: config.public.apiBaseUrl,
    key: computed(
      () => `catalogue-product:${toValue(slug)}`,
    ),
    server: false,
    dedupe: 'defer',
  });
}
