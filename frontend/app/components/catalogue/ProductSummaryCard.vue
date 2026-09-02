<script setup lang="ts">
import { computed } from 'vue';

import type {
  CatalogueProductSummaryResponse,
} from '../../types/catalogue';

import ProductCommercialState
  from './ProductCommercialState.vue';
import ProductImage from './ProductImage.vue';
import ProductPrice from './ProductPrice.vue';

const props = defineProps<{
  readonly product: CatalogueProductSummaryResponse;
}>();

const productUrl = computed(
  () => `/pieces/${props.product.slug}`,
);
</script>

<template>
  <article class="product-card">
    <NuxtLink
      :to="productUrl"
      class="product-card__media"
      :aria-label="`View ${product.name}`"
    >
      <ProductImage
        :src="product.primaryImage?.url ?? null"
        :alt="product.primaryImage?.altText ?? product.name"
      />
    </NuxtLink>

    <div class="product-card__content">
      <p class="product-card__collection">
        {{ product.collection?.name ?? product.category }}
      </p>

      <h3>
        <NuxtLink :to="productUrl">
          {{ product.name }}
        </NuxtLink>
      </h3>

      <p class="product-card__description">
        {{ product.shortDescription }}
      </p>

      <div class="product-card__commerce">
        <ProductPrice :price="product.price" />
        <ProductCommercialState
          :state="product.commercialState"
        />
      </div>
    </div>
  </article>
</template>

<style scoped>
.product-card {
  display: flex;
  min-width: 0;
  flex-direction: column;
}

.product-card__media {
  display: block;
  width: 100%;
  aspect-ratio: 4 / 5;
  overflow: hidden;
  background: var(--colour-surface);
}

.product-card__media:focus-visible {
  outline-offset: -3px;
}

.product-card__content {
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: var(--space-5) var(--space-2) 0;
}

.product-card__collection {
  margin: 0;
  color: var(--colour-gold);
  font-size: var(--font-size-caption);
  font-weight: 600;
  letter-spacing: var(--letter-spacing-label);
  text-transform: uppercase;
}

.product-card h3 {
  margin: var(--space-3) 0 0;
  font-family: var(--font-display);
  font-size: clamp(1.65rem, 3vw, 2.35rem);
  font-weight: 500;
  line-height: 1;
  overflow-wrap: anywhere;
}

.product-card h3 a {
  transition: color var(--duration-fast) var(--ease-standard);
}

.product-card h3 a:hover {
  color: var(--colour-gold);
}

.product-card__description {
  margin: var(--space-3) 0 0;
  color: var(--colour-text-muted);
  font-size: 0.75rem;
  line-height: 1.6;
}

.product-card__commerce {
  display: grid;
  gap: var(--space-2);
  margin-top: auto;
  padding-top: var(--space-5);
}

.product-card__commerce :deep(.product-price) {
  margin: 0;
  font-size: 1.35rem;
}

.product-card__commerce :deep(.commercial-state) {
  margin: 0;
  font-size: 0.6875rem;
}
</style>
