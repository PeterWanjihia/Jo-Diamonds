<script setup lang="ts">
import { computed } from 'vue';

import ProductSummaryCard
  from '../../components/catalogue/ProductSummaryCard.vue';

import CollectionFeaturedPiece
  from '../../components/collection/CollectionFeaturedPiece.vue';

import CollectionHero
  from '../../components/collection/CollectionHero.vue';

import CollectionOverview
  from '../../components/collection/CollectionOverview.vue';

import CollectionTrustStrip
  from '../../components/collection/CollectionTrustStrip.vue';

import CollectionCraftFeature
  from '../../components/collection/CollectionCraftFeature.vue';

import CollectionPrivateExperience
  from '../../components/collection/CollectionPrivateExperience.vue';

import CollectionServiceStrip
  from '../../components/collection/CollectionServiceStrip.vue';

import {
  useShowroomData,
} from '../../composables/use-showroom-data';

import {
  collectionLandingOrder,
} from '../../config/collection-landing';

const route = useRoute();

const {
  products,
  collections,
  featuredProduct,
  isPending,
  error,
  refresh,
} = useShowroomData();

const selectedCollectionSlug = computed(() => {
  const queryValue = route.query.collection;
  const candidate = Array.isArray(queryValue)
    ? queryValue[0]
    : queryValue;

  if (
    typeof candidate === 'string' &&
    (collectionLandingOrder as readonly string[])
      .includes(candidate)
  ) {
    return candidate;
  }

  return null;
});

const selectedCollection = computed(() =>
  selectedCollectionSlug.value
    ? collections.value.find(
        (collection) =>
          collection.slug === selectedCollectionSlug.value,
      ) ?? null
    : null,
);

const visibleProducts = computed(() => {
  if (!selectedCollectionSlug.value) {
    return products.value;
  }

  return products.value.filter(
    (product) =>
      product.collection?.slug ===
      selectedCollectionSlug.value,
  );
});

const collectionFeaturedProduct = computed(
  () =>
    visibleProducts.value.find(
      (product) => product.isFeatured,
    ) ??
    visibleProducts.value[0] ??
    featuredProduct.value,
);

const piecesTitle = computed(
  () =>
    selectedCollection.value
      ? `${selectedCollection.value.name} pieces`
      : 'The pieces',
);

useSeoMeta({
  title: 'The Collection',

  description:
    'Explore exceptional diamonds selected for their character, craftsmanship and lasting presence.',

  ogTitle:
    'The Collection · JO.DIAMONDS',

  ogDescription:
    'Explore exceptional diamonds selected for their character, craftsmanship and lasting presence.',

  ogType: 'website',
});
</script>

<template>
  <main class="collection-page">
    <CollectionHero />

    <CollectionTrustStrip />

    <section
      v-if="isPending"
      class="collection-page__status"
      aria-live="polite"
    >
      <p>
        Preparing the collections…
      </p>
    </section>

    <section
      v-else-if="error"
      class="collection-page__status"
      aria-live="assertive"
    >
      <div class="collection-page__status-content">
        <p>
          The collections could not be prepared.
        </p>

        <button
          class="collection-page__retry"
          type="button"
          @click="refresh"
        >
          Try again
        </button>
      </div>
    </section>

    <template v-else>
      <CollectionOverview
        :collections="collections"
      />

      <section
        class="collection-page__pieces"
        aria-labelledby="collection-pieces-title"
      >
        <header class="collection-page__pieces-heading">
          <div>
            <p>Discover</p>
            <h2 id="collection-pieces-title">
              {{ piecesTitle }}
            </h2>
          </div>

          <NuxtLink
            v-if="selectedCollectionSlug"
            to="/collection"
          >
            View all pieces
          </NuxtLink>
        </header>

        <div
          v-if="visibleProducts.length"
          class="collection-page__pieces-grid"
        >
          <ProductSummaryCard
            v-for="product in visibleProducts"
            :key="product.slug"
            :product="product"
          />
        </div>

        <div
          v-else
          class="collection-page__pieces-empty"
        >
          <p>
            No pieces from this collection are currently
            available online.
          </p>

          <NuxtLink to="/collection">
            Explore all available pieces
          </NuxtLink>
        </div>
      </section>

      <CollectionFeaturedPiece
        v-if="collectionFeaturedProduct"
        :product="collectionFeaturedProduct"
      />

    </template>
    <CollectionCraftFeature />
    <CollectionPrivateExperience />

    <CollectionServiceStrip />

  </main>
</template>

<style scoped>
.collection-page {
  min-height: 100vh;

  background: #f8f5ef;
}

.collection-page__status {
  display: grid;

  min-height: 18rem;

  place-items: center;

  padding: 2rem;

  background: #f8f5ef;

  text-align: center;
}

.collection-page__status-content {
  display: grid;

  justify-items: center;

  gap: 1rem;
}

.collection-page__status p {
  margin: 0;

  color:
    rgb(25 23 19 / 65%);

  font-family: var(--font-interface);
  font-size: 0.75rem;

  line-height: 1.5;
}

.collection-page__retry {
  min-height: 2.75rem;

  padding:
    0
    1.25rem;

  border:
    1px solid
    #171612;

  border-radius: 0;

  background: #171612;
  color: #f8f5ef;

  font-family: var(--font-interface);
  font-size: 0.6rem;
  font-weight: 600;

  line-height: 1;
  letter-spacing: 0.08em;

  text-transform: uppercase;

  cursor: pointer;

  transition:
    background-color 180ms ease,
    border-color 180ms ease;
}

.collection-page__retry:hover {
  border-color: #2d2a25;

  background: #2d2a25;
}

.collection-page__retry:focus-visible {
  outline:
    2px solid
    #a47b3f;

  outline-offset: 3px;
}

.collection-page__pieces {
  width: min(
    calc(100% - (2 * var(--page-gutter))),
    var(--container-wide)
  );
  margin-inline: auto;
  padding-block: clamp(4rem, 8vw, 7rem);
}

.collection-page__pieces-heading {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: var(--space-5);
  margin-bottom: clamp(2rem, 5vw, 4rem);
}

.collection-page__pieces-heading p {
  margin: 0 0 var(--space-3);
  color: var(--colour-gold);
  font-size: var(--font-size-label);
  font-weight: 600;
  letter-spacing: var(--letter-spacing-label);
  text-transform: uppercase;
}

.collection-page__pieces-heading h2 {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(2.75rem, 6vw, 5rem);
  font-weight: 400;
  line-height: 0.9;
}

.collection-page__pieces-heading > a,
.collection-page__pieces-empty a {
  display: inline-flex;
  max-width: 100%;
  min-height: 2.75rem;
  align-items: center;
  padding-bottom: 0.25rem;
  border-bottom: 1px solid currentColor;
  font-size: var(--font-size-label);
  font-weight: 600;
  letter-spacing: var(--letter-spacing-label);
  text-transform: uppercase;
  overflow-wrap: anywhere;
}

.collection-page__pieces-heading > a:hover,
.collection-page__pieces-empty a:hover {
  color: var(--colour-gold);
}

.collection-page__pieces-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: clamp(2rem, 4vw, 4rem);
}

.collection-page__pieces-empty {
  display: grid;
  min-height: 16rem;
  place-content: center;
  justify-items: center;
  gap: var(--space-5);
  border-block: var(--border-thin);
  text-align: center;
}

.collection-page__pieces-empty p {
  margin: 0;
  color: var(--colour-text-muted);
}

@media (max-width: 900px) {
  .collection-page__pieces-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 620px) {
  .collection-page__pieces {
    width: calc(100% - 2rem);
  }

  .collection-page__pieces-heading {
    align-items: flex-start;
    flex-direction: column;
  }

  .collection-page__pieces-grid {
    grid-template-columns: 1fr;
  }
}
</style>