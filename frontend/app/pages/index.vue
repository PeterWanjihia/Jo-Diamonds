<script setup lang="ts">
import BrandManifesto from '../components/showroom/BrandManifesto.vue';
import CollectionShowcase from '../components/showroom/CollectionShowcase.vue';
import FeaturedMasterpiece from '../components/showroom/FeaturedMasterpiece.vue';
import HouseStandards from '../components/showroom/HouseStandards.vue';
import PrivateAssistance from '../components/showroom/PrivateAssistance.vue';
import PrivateListSignup from '../components/showroom/PrivateListSignup.vue';
import ShowroomHero from '../components/showroom/ShowroomHero.vue';

import { useShowroomData } from '../composables/use-showroom-data';

const {
  collections,
  featuredProduct,
  isPending,
  error,
  refresh,
} = useShowroomData();

useSeoMeta({
  title: 'The Showroom',

  description:
    'Exceptional jewellery selected for character, craftsmanship and lasting presence.',

  ogTitle: 'JO.DIAMONDS — Objects of Permanence',

  ogDescription:
    'Exceptional jewellery selected for character, craftsmanship and lasting presence.',

  ogType: 'website',
});
</script>

<template>
  <main>
    <ShowroomHero />

    <BrandManifesto />

    <!-- Catalogue loading state -->
    <section
      v-if="isPending"
      class="catalogue-status"
      aria-live="polite"
    >
      <div class="page-container">
        <p class="catalogue-status__eyebrow">
          The catalogue
        </p>

        <p class="catalogue-status__message">
          Preparing the showroom…
        </p>
      </div>
    </section>

    <!-- Catalogue error state -->
    <section
      v-else-if="error"
      class="catalogue-status"
      aria-live="assertive"
    >
      <div class="page-container">
        <p class="catalogue-status__eyebrow">
          The catalogue
        </p>

        <h2 class="catalogue-status__title">
          The showroom could not be prepared.
        </h2>

        <p class="catalogue-status__message">
          Confirm that the JO.DIAMONDS API is running,
          then try again.
        </p>

        <button
          class="catalogue-status__retry"
          type="button"
          @click="refresh"
        >
          Try again
        </button>
      </div>
    </section>

    <!-- Successful catalogue state -->
    <template v-else>
      <CollectionShowcase
        :collections="collections"
      />

      <FeaturedMasterpiece
        v-if="featuredProduct"
        :product="featuredProduct"
      />

      <section
        v-else
        class="catalogue-status"
      >
        <div class="page-container">
          <p class="catalogue-status__eyebrow">
            The catalogue
          </p>

          <h2 class="catalogue-status__title">
            No public pieces are available.
          </h2>

          <p class="catalogue-status__message">
            The collection is currently being prepared.
          </p>
        </div>
      </section>
    </template>

    <!-- Static Showroom sections -->
    <HouseStandards />

    <PrivateAssistance />

    <PrivateListSignup />
  </main>
</template>

<style scoped>
.catalogue-status {
  min-height: 28rem;

  padding-block: var(--space-9);

  background: var(--colour-ivory);
}

.catalogue-status__eyebrow {
  margin-bottom: var(--space-5);

  color: var(--colour-gold);

  font-size: var(--font-size-label);
  font-weight: 600;

  letter-spacing: var(--letter-spacing-label);
  text-transform: uppercase;
}

.catalogue-status__title {
  max-width: 14ch;

  font-family: var(--font-display);
  font-size: var(--font-size-heading-medium);
  font-weight: 400;

  line-height: var(--line-height-tight);
}

.catalogue-status__message {
  max-width: 34rem;

  margin-top: var(--space-5);

  color: var(--colour-text-muted);
}

.catalogue-status__retry {
  margin-top: var(--space-6);

  padding:
    var(--space-4)
    var(--space-6);

  background: var(--colour-ink);
  color: var(--colour-text-on-dark);

  font-size: var(--font-size-label);
  font-weight: 600;

  letter-spacing: var(--letter-spacing-label);
  text-transform: uppercase;
}
</style>