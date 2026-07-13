<script setup lang="ts">
import { computed } from 'vue';

import CollectionLandingCard
  from './CollectionLandingCard.vue';

import {
  collectionLandingEditorial,
  collectionLandingOrder,
  type CollectionLandingEditorial,
} from '../../config/collection-landing';

import type {
  CatalogueCollectionResponse,
} from '../../types/catalogue';

interface CollectionLandingCardModel {
  readonly collection:
    CatalogueCollectionResponse;

  readonly editorial:
    CollectionLandingEditorial;
}

const props = defineProps<{
  readonly collections:
    readonly CatalogueCollectionResponse[];
}>();

const cards = computed<
  readonly CollectionLandingCardModel[]
>(() => {
  const collectionsBySlug = new Map(
    props.collections.map(
      (collection) => [
        collection.slug,
        collection,
      ],
    ),
  );

  return collectionLandingOrder.flatMap(
    (slug) => {
      const collection =
        collectionsBySlug.get(slug);

      if (!collection) {
        return [];
      }

      return [
        {
          collection,

          editorial:
            collectionLandingEditorial[slug],
        },
      ];
    },
  );
});
</script>

<template>
  <section
    id="collections"
    class="collection-overview"
    aria-labelledby="collection-overview-title"
  >
    <div class="collection-overview__inner">
      <header class="collection-overview__header">
        <h2
          id="collection-overview-title"
          class="collection-overview__title"
        >
          The collections
        </h2>

        <NuxtLink
          class="collection-overview__all-link"
          to="/collection"
        >
          <span>Explore all collections</span>

          <svg
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path d="M4 12h15" />
            <path d="m14 7 5 5-5 5" />
          </svg>
        </NuxtLink>
      </header>

      <div
        v-if="cards.length > 0"
        class="collection-overview__grid"
      >
        <CollectionLandingCard
          v-for="card in cards"
          :key="card.collection.slug"
          :collection="card.collection"
          :editorial="card.editorial"
        />
      </div>

      <p
        v-else
        class="collection-overview__empty"
      >
        The collections are currently being prepared.
      </p>
    </div>
  </section>
</template>

<style scoped>
.collection-overview {
  scroll-margin-top: 6.5rem;

  border-bottom:
    1px solid
    rgb(25 23 19 / 9%);

  background:
    linear-gradient(
      90deg,
      #faf8f4 0%,
      #f7f3ed 50%,
      #faf8f4 100%
    );

  color: #191713;
}

.collection-overview__inner {
  width: min(
    calc(100% - (2 * var(--page-gutter))),
    var(--container-wide)
  );

  margin-inline: auto;

  padding-block:
    1.65rem
    1.55rem;
}

.collection-overview__header {
  display: flex;

  align-items: center;
  justify-content: space-between;

  gap: 2rem;

  margin-bottom: 1.1rem;
}

.collection-overview__title {
  margin: 0;

  font-family: var(--font-display);
  font-size: clamp(
    1.25rem,
    1.65vw,
    1.6rem
  );
  font-weight: 500;

  line-height: 1;
  letter-spacing: 0.025em;

  text-transform: uppercase;
}

.collection-overview__all-link {
  display: inline-flex;

  align-items: center;

  gap: 0.85rem;

  color: #181713;

  font-family: var(--font-interface);
  font-size: 0.55rem;
  font-weight: 600;

  line-height: 1;
  letter-spacing: 0.075em;

  text-transform: uppercase;
}

.collection-overview__all-link svg {
  width: 1.1rem;
  height: 1.1rem;

  stroke: currentColor;
  stroke-width: 1.25;
  stroke-linecap: round;
  stroke-linejoin: round;

  transition:
    transform 200ms ease;
}

.collection-overview__all-link:hover svg {
  transform:
    translateX(0.3rem);
}

.collection-overview__grid {
  display: grid;
  grid-template-columns:
    repeat(3, minmax(0, 1fr));

  gap: clamp(
    0.75rem,
    1.2vw,
    1rem
  );
}

.collection-overview__empty {
  margin: 0;

  padding-block: 5rem;

  color:
    rgb(25 23 19 / 60%);

  text-align: center;
}

@media (max-width: 900px) {
  .collection-overview__grid {
    grid-template-columns:
      repeat(2, minmax(0, 1fr));
  }

  .collection-overview__grid
  :deep(.collection-card:last-child) {
    grid-column: 1 / -1;
  }
}

@media (max-width: 620px) {
  .collection-overview {
    scroll-margin-top: 5rem;
  }

  .collection-overview__inner {
    width: calc(100% - 2rem);

    padding-block:
      1.75rem
      2rem;
  }

  .collection-overview__header {
    align-items: flex-start;

    margin-bottom: 1.25rem;
  }

  .collection-overview__all-link {
    display: none;
  }

  .collection-overview__grid {
    grid-template-columns: 1fr;

    gap: 0.85rem;
  }

  .collection-overview__grid
  :deep(.collection-card:last-child) {
    grid-column: auto;
  }
}
</style>