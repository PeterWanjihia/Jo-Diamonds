import { computed } from 'vue';

import { useCatalogueCollections } from './use-catalogue-collections';
import { useCatalogueProducts } from './use-catalogue-products';

export function useShowroomData() {
  const productsRequest = useCatalogueProducts();
  const collectionsRequest = useCatalogueCollections();

  const products = computed(
    () => productsRequest.data.value.data,
  );

  const collections = computed(
    () => collectionsRequest.data.value.data,
  );

  const featuredProduct = computed(() => {
    const featured = products.value.find(
      (product) => product.isFeatured,
    );

    return featured ?? products.value[0] ?? null;
  });

  /*
   * The catalogue requests use server: false.
   *
   * During server rendering, their initial status is "idle".
   * Once the browser starts the request, it becomes "pending".
   *
   * Treating both states as loading ensures that the server and
   * browser produce the same initial HTML during hydration.
   */
  const isPending = computed(() => {
    const productStatus = productsRequest.status.value;
    const collectionStatus =
      collectionsRequest.status.value;

    return (
      productStatus === 'idle' ||
      productStatus === 'pending' ||
      collectionStatus === 'idle' ||
      collectionStatus === 'pending'
    );
  });

  const error = computed(
    () =>
      productsRequest.error.value ??
      collectionsRequest.error.value,
  );

  async function refresh(): Promise<void> {
    await Promise.all([
      productsRequest.refresh(),
      collectionsRequest.refresh(),
    ]);
  }

  return {
    products,
    collections,
    featuredProduct,
    isPending,
    error,
    refresh,
  };
}
