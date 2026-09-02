<script setup lang="ts">
import { computed } from 'vue';

import BaseButton from '../../components/base/BaseButton.vue';
import ProductCommercialState
  from '../../components/catalogue/ProductCommercialState.vue';
import ProductDetailSections
  from '../../components/catalogue/ProductDetailSections.vue';
import ProductImage
  from '../../components/catalogue/ProductImage.vue';
import ProductPrice
  from '../../components/catalogue/ProductPrice.vue';

import {
  useCatalogueProduct,
} from '../../composables/use-catalogue-product';

const route = useRoute();

const slug = computed(() => {
  const value = route.params.slug;

  return Array.isArray(value)
    ? value[0] ?? ''
    : String(value ?? '');
});

const {
  data,
  status,
  error,
  refresh,
} = useCatalogueProduct(slug);

const product = computed(
  () => data.value?.data ?? null,
);

const isPending = computed(
  () =>
    status.value === 'idle' ||
    status.value === 'pending',
);

function getErrorStatus(value: unknown): number | null {
  if (!value || typeof value !== 'object') {
    return null;
  }

  if (
    'statusCode' in value &&
    typeof value.statusCode === 'number'
  ) {
    return value.statusCode;
  }

  if (
    'status' in value &&
    typeof value.status === 'number'
  ) {
    return value.status;
  }

  return null;
}

const isNotFound = computed(
  () => getErrorStatus(error.value) === 404,
);

const orderedImages = computed(() =>
  [...(product.value?.images ?? [])].sort(
    (left, right) => left.sortOrder - right.sortOrder,
  ),
);

const primaryImage = computed(
  () =>
    orderedImages.value.find((image) => image.isPrimary) ??
    orderedImages.value[0] ??
    null,
);

const supportingImages = computed(() =>
  orderedImages.value.filter(
    (image) => image !== primaryImage.value,
  ),
);

const enquiryUrl = computed(() => {
  if (!product.value) {
    return 'mailto:concierge@jodiamonds.store';
  }

  const subject = encodeURIComponent(
    `Enquiry: ${product.value.name}`,
  );

  const body = encodeURIComponent(
    `I would like to enquire about ${product.value.name} (${product.value.slug}).`,
  );

  return `mailto:concierge@jodiamonds.store?subject=${subject}&body=${body}`;
});

const paymentUrl = computed(() =>
  product.value
    ? `/payment?reference=${encodeURIComponent(
        product.value.sku,
      )}`
    : '/payment',
);

const collectionUrl = computed(() =>
  product.value?.collection
    ? `/collection?collection=${encodeURIComponent(
        product.value.collection.slug,
      )}`
    : '/collection',
);

const supplyLabel = computed(() => {
  const supply = product.value?.supply;

  if (!supply) {
    return '';
  }

  switch (supply.mode) {
    case 'unique':
      return 'Unique piece';
    case 'limited':
      return `Edition of ${supply.editionSize}`;
    case 'reproducible':
      return 'Made to order';
  }
});

async function retryProduct(): Promise<void> {
  await refresh();
}

useSeoMeta({
  title: computed(
    () => product.value?.name ?? 'Piece',
  ),
  description: computed(
    () =>
      product.value?.shortDescription ??
      'Discover a JO.DIAMONDS piece.',
  ),
  ogTitle: computed(
    () => product.value?.name ?? 'JO.DIAMONDS piece',
  ),
  ogDescription: computed(
    () =>
      product.value?.shortDescription ??
      'Discover a JO.DIAMONDS piece.',
  ),
  ogType: 'website',
});
</script>

<template>
  <main class="piece-page">
    <section
      v-if="isPending"
      class="piece-page__status"
      aria-live="polite"
    >
      <p>Preparing the piece…</p>
    </section>

    <section
      v-else-if="error || !product"
      class="piece-page__status"
      aria-live="assertive"
    >
      <p class="piece-page__eyebrow">
        {{
          isNotFound
            ? 'Piece not found'
            : 'Catalogue unavailable'
        }}
      </p>

      <h1>
        {{
          isNotFound
            ? 'This piece is no longer in the collection.'
            : 'The piece could not be prepared.'
        }}
      </h1>

      <p>
        {{
          isNotFound
            ? 'Explore the current collection or contact our concierge for assistance.'
            : 'Please try again. If the problem continues, our concierge can assist you.'
        }}
      </p>

      <div class="piece-page__status-actions">
        <BaseButton
          v-if="!isNotFound"
          type="button"
          variant="solid"
          tone="light"
          @click="retryProduct"
        >
          Try again
        </BaseButton>

        <BaseButton
          to="/collection"
          variant="outline"
          tone="light"
        >
          View collection
        </BaseButton>
      </div>
    </section>

    <template v-else>
      <section class="piece-hero">
        <nav
          class="piece-hero__breadcrumbs"
          aria-label="Breadcrumb"
        >
          <NuxtLink to="/collection">
            The Collection
          </NuxtLink>
          <span aria-hidden="true">/</span>
          <NuxtLink :to="collectionUrl">
            {{ product.collection?.name ?? product.category }}
          </NuxtLink>
        </nav>

        <div class="piece-hero__layout">
          <div class="piece-hero__gallery">
            <div class="piece-hero__primary-image">
              <ProductImage
                :src="primaryImage?.url ?? null"
                :alt="primaryImage?.altText ?? product.name"
                eager
              />
            </div>

            <div
              v-if="supportingImages.length"
              class="piece-hero__supporting-images"
            >
              <div
                v-for="image in supportingImages"
                :key="`${image.url}-${image.sortOrder}`"
                class="piece-hero__supporting-image"
              >
                <ProductImage
                  :src="image.url"
                  :alt="image.altText"
                />
              </div>
            </div>
          </div>

          <article class="piece-hero__summary">
            <p class="piece-page__eyebrow">
              {{ product.collection?.name ?? product.category }}
            </p>

            <h1>{{ product.name }}</h1>

            <p class="piece-hero__short-description">
              {{ product.shortDescription }}
            </p>

            <ProductPrice :price="product.price" />

            <ProductCommercialState
              :state="product.commercialState"
            />

            <dl class="piece-hero__meta">
              <div>
                <dt>Reference</dt>
                <dd>{{ product.sku }}</dd>
              </div>
              <div>
                <dt>Edition</dt>
                <dd>{{ supplyLabel }}</dd>
              </div>
            </dl>

            <p class="piece-hero__description">
              {{ product.description }}
            </p>

            <p
              v-if="product.photographyType === 'representative'"
              class="piece-hero__photography-note"
            >
              Photography is representative. Stone character and
              hand-finished details vary between pieces.
            </p>

            <div class="piece-hero__actions">
              <BaseButton
                :href="enquiryUrl"
                variant="solid"
                tone="light"
                block
              >
                Enquire
              </BaseButton>

              <BaseButton
                :to="paymentUrl"
                variant="outline"
                tone="light"
                block
              >
                Private payment
              </BaseButton>
            </div>
          </article>
        </div>
      </section>

      <section
        v-if="product.designStory"
        class="piece-story"
        aria-labelledby="piece-story-title"
      >
        <p class="piece-page__eyebrow">
          Design story
        </p>
        <h2 id="piece-story-title">
          Conceived with intention
        </h2>
        <p>{{ product.designStory }}</p>
      </section>

      <ProductDetailSections :product="product" />
    </template>
  </main>
</template>

<style scoped>
.piece-page {
  min-height: 100vh;
  background: var(--colour-paper);
  color: var(--colour-text);
}

.piece-page__eyebrow {
  margin: 0;
  color: var(--colour-gold);
  font-size: var(--font-size-label);
  font-weight: 600;
  letter-spacing: var(--letter-spacing-label);
  text-transform: uppercase;
}

.piece-page__status {
  display: grid;
  min-height: 70vh;
  place-content: center;
  justify-items: center;
  gap: var(--space-5);
  width: min(calc(100% - 2rem), 44rem);
  margin-inline: auto;
  padding-block: 5rem;
  text-align: center;
}

.piece-page__status > p:not(.piece-page__eyebrow) {
  max-width: 35rem;
  margin: 0;
  color: var(--colour-text-muted);
  line-height: 1.7;
}

.piece-page__status h1 {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 7vw, 5rem);
  font-weight: 400;
  line-height: 0.95;
}

.piece-page__status-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--space-4);
}

.piece-hero {
  width: min(
    calc(100% - (2 * var(--page-gutter))),
    var(--container-wide)
  );
  margin-inline: auto;
  padding-block: clamp(2rem, 4vw, 4rem) clamp(4rem, 9vw, 8rem);
}

.piece-hero__breadcrumbs {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-3);
  margin-bottom: var(--space-6);
  color: var(--colour-text-muted);
  font-size: var(--font-size-caption);
  line-height: 1.4;
  letter-spacing: var(--letter-spacing-label);
  text-transform: uppercase;
}

.piece-hero__breadcrumbs a {
  display: inline-flex;
  max-width: 100%;
  min-height: 2.75rem;
  align-items: center;
  overflow-wrap: anywhere;
}

.piece-hero__breadcrumbs a:hover {
  color: var(--colour-gold);
}

.piece-hero__layout {
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(20rem, 0.85fr);
  align-items: start;
  gap: clamp(2.5rem, 7vw, 7rem);
}

.piece-hero__gallery {
  display: grid;
  gap: var(--space-4);
}

.piece-hero__primary-image {
  aspect-ratio: 4 / 5;
}

.piece-hero__supporting-images {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--space-4);
}

.piece-hero__supporting-image {
  aspect-ratio: 1 / 1;
}

.piece-hero__summary {
  position: sticky;
  top: 7rem;
  padding-top: clamp(1rem, 4vw, 4rem);
}

.piece-hero__summary h1 {
  margin: var(--space-4) 0 0;
  font-family: var(--font-display);
  font-size: clamp(2.625rem, 6vw, 5.75rem);
  font-weight: 400;
  line-height: 0.86;
  letter-spacing: -0.025em;
  overflow-wrap: anywhere;
}

.piece-hero__short-description {
  margin: var(--space-5) 0 var(--space-6);
  color: var(--colour-text-muted);
  font-family: var(--font-display);
  font-size: 1.15rem;
  line-height: 1.45;
}

.piece-hero__summary :deep(.product-price) {
  margin: 0 0 var(--space-3);
}

.piece-hero__summary :deep(.commercial-state) {
  margin: 0;
}

.piece-hero__meta {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  margin: var(--space-6) 0 0;
  border-block: var(--border-thin);
}

.piece-hero__meta div {
  padding-block: var(--space-4);
}

.piece-hero__meta div + div {
  padding-left: var(--space-5);
  border-left: var(--border-thin);
}

.piece-hero__meta dt,
.piece-hero__meta dd {
  margin: 0;
  font-size: 0.7rem;
  line-height: 1.5;
  overflow-wrap: anywhere;
}

.piece-hero__meta dt {
  color: var(--colour-text-muted);
}

.piece-hero__description {
  margin: var(--space-6) 0 0;
  font-size: 0.9rem;
  line-height: 1.8;
}

.piece-hero__photography-note {
  margin: var(--space-4) 0 0;
  color: var(--colour-text-muted);
  font-size: 0.7rem;
  line-height: 1.6;
}

.piece-hero__actions {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--space-3);
  margin-top: var(--space-6);
}

.piece-story {
  width: min(calc(100% - 2rem), 55rem);
  margin: 0 auto clamp(4rem, 9vw, 8rem);
  text-align: center;
}

.piece-story h2 {
  margin: var(--space-4) 0;
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 6vw, 5rem);
  font-weight: 400;
  line-height: 0.95;
}

.piece-story > p:last-child {
  margin: 0;
  color: var(--colour-text-muted);
  line-height: 1.8;
}

@media (max-width: 900px) {
  .piece-hero__layout {
    grid-template-columns: 1fr;
  }

  .piece-hero__summary {
    position: static;
    padding-top: 1rem;
  }
}

@media (max-width: 620px) {
  .piece-hero {
    width: calc(100% - 2rem);
    padding-top: 1.5rem;
  }

  .piece-hero__actions {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .piece-hero {
    width: calc(100% - 2rem);
  }

  .piece-hero__breadcrumbs {
    gap: 0.25rem 0.75rem;
    margin-bottom: 1rem;
  }

  .piece-hero__summary h1 {
    font-size: clamp(2.5rem, 14vw, 3.5rem);
  }

  .piece-hero__meta {
    grid-template-columns: 1fr;
  }

  .piece-hero__meta div + div {
    padding-left: 0;
    border-top: var(--border-thin);
    border-left: 0;
  }
}
</style>
