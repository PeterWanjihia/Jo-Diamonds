<script setup lang="ts">
import CollectionShowcase from '../components/showroom/CollectionShowcase.vue';
import FeaturedMasterpiece from '../components/showroom/FeaturedMasterpiece.vue';

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
    <section class="showroom-foundation">
      <div class="page-container showroom-foundation__content">
        <p class="showroom-foundation__eyebrow">
          The House of JO.DIAMONDS
        </p>

        <h1 class="showroom-foundation__title">
          Objects of permanence.
        </h1>

        <p class="showroom-foundation__description">
          Exceptional jewellery selected for character,
          craftsmanship and lasting presence.
        </p>

        <a
          class="showroom-foundation__action"
          href="#collections"
        >
          Explore the collections

          <span aria-hidden="true">↓</span>
        </a>
      </div>
    </section>

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
  </main>
</template>

<style scoped>
.showroom-foundation {
  display: grid;
  min-height: 100svh;
  align-items: center;

  background:
    radial-gradient(
      circle at 72% 35%,
      rgb(255 255 255 / 12%),
      transparent 28%
    ),
    linear-gradient(
      135deg,
      #171715 0%,
      #0d0d0c 60%,
      #050505 100%
    );

  color: var(--colour-text-on-dark);
}

.showroom-foundation__content {
  padding-block: var(--space-9);
}

.showroom-foundation__eyebrow,
.catalogue-status__eyebrow {
  margin-bottom: var(--space-5);

  color: var(--colour-gold-soft);

  font-size: var(--font-size-label);
  font-weight: 600;

  letter-spacing: var(--letter-spacing-label);
  text-transform: uppercase;
}

.showroom-foundation__title {
  max-width: 11ch;

  font-family: var(--font-display);
  font-size: var(--font-size-heading-large);
  font-weight: 400;

  line-height: var(--line-height-tight);
  letter-spacing: var(--letter-spacing-display);
  text-transform: uppercase;
}

.showroom-foundation__description {
  max-width: 34rem;
  margin-top: var(--space-6);

  color: rgb(247 243 237 / 78%);

  font-size: var(--font-size-body-large);
}

.showroom-foundation__action {
  display: inline-flex;
  align-items: center;
  gap: var(--space-4);

  margin-top: var(--space-7);
  padding-bottom: var(--space-2);

  border-bottom:
    1px solid rgb(247 243 237 / 60%);

  font-size: var(--font-size-label);
  font-weight: 600;

  letter-spacing: var(--letter-spacing-label);
  text-transform: uppercase;
}

.catalogue-status {
  min-height: 28rem;
  padding-block: var(--space-9);

  background: var(--colour-ivory);
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
