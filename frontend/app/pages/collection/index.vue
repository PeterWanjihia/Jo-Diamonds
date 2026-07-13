<script setup lang="ts">
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

const {
  collections,
  featuredProduct,
  isPending,
  error,
  refresh,
} = useShowroomData();

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

      <CollectionFeaturedPiece
        v-if="featuredProduct"
        :product="featuredProduct"
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
  min-height: 2.5rem;

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
</style>