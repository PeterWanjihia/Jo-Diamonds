<script setup lang="ts">
import { computed } from 'vue';

import BaseTextLink from '../base/BaseTextLink.vue';
import CollectionEditorialCard
  from './CollectionEditorialCard.vue';

import {
  showroomCollectionEditorial,
  showroomCollectionOrder,
  type ShowroomCollectionEditorial,
} from '../../config/showroom-editorial';

import type {
  CatalogueCollectionResponse,
} from '../../types/catalogue';

interface ShowroomCollectionCard {
  readonly collection: CatalogueCollectionResponse;
  readonly editorial: ShowroomCollectionEditorial;
}

const props = defineProps<{
  readonly collections:
    readonly CatalogueCollectionResponse[];
}>();

const cards = computed<
  readonly ShowroomCollectionCard[]
>(() => {
  const collectionsBySlug = new Map(
    props.collections.map(
      (collection) => [
        collection.slug,
        collection,
      ],
    ),
  );

  return showroomCollectionOrder.flatMap(
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
            showroomCollectionEditorial[slug],
        },
      ];
    },
  );
});
</script>

<template>
  <section
    id="collections"
    class="collection-showcase"
    aria-labelledby="collection-showcase-title"
  >
    <div class="collection-showcase__inner">
      <header class="collection-showcase__header">
        <h2
          id="collection-showcase-title"
          class="collection-showcase__title"
        >
          Our signature collections
        </h2>

        <BaseTextLink
          to="/collection"
          tone="light"
          arrow="right"
          class="collection-showcase__all-link"
        >
          Explore all collections
        </BaseTextLink>
      </header>

      <div
        v-if="cards.length > 0"
        class="collection-showcase__grid"
      >
        <CollectionEditorialCard
          v-for="card in cards"
          :key="card.collection.slug"
          :collection="card.collection"
          :editorial="card.editorial"
        />
      </div>

      <p
        v-else
        class="collection-showcase__empty"
      >
        The signature collections are currently
        being prepared.
      </p>
    </div>
  </section>
</template>

<style scoped>
.collection-showcase {
  scroll-margin-top: 4.5rem;

  background: #f5f1ea;
  color: #171612;
}

.collection-showcase__inner {
  width: min(
    calc(100% - (2 * var(--page-gutter))),
    var(--container-wide)
  );

  margin-inline: auto;

  padding-block:
    clamp(2rem, 3vw, 3rem)
    1.25rem;
}

.collection-showcase__header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 2rem;

  margin-bottom: 1.25rem;
}

.collection-showcase__title {
  margin: 0;

  font-family: var(--font-interface);
  font-size: 0.6875rem;
  font-weight: 600;

  line-height: 1;
  letter-spacing: 0.09em;

  text-transform: uppercase;
}

.collection-showcase__all-link {
  min-height: 2rem;

  border-bottom: 0;

  font-size: 0.625rem;
  letter-spacing: 0.08em;
}

.collection-showcase__all-link:hover {
  border-bottom: 0;
}

.collection-showcase__grid {
  display: grid;
  grid-template-columns:
    repeat(3, minmax(0, 1fr));

  gap: clamp(
    1rem,
    1.8vw,
    1.5rem
  );
}

.collection-showcase__empty {
  padding-block: 5rem;

  color: rgb(23 22 18 / 64%);

  text-align: center;
}

@media (max-width: 900px) {
  .collection-showcase__grid {
    grid-template-columns:
      repeat(2, minmax(0, 1fr));
  }


  .collection-showcase__grid
    :deep(.collection-card:last-child) {
      grid-column: 1 / -1;
  }
}

@media (max-width: 700px) {
  .collection-showcase {
    scroll-margin-top: 4rem;
  }

  .collection-showcase__inner {
    width: calc(100% - 2rem);

    padding-block:
      2rem
      2.75rem;
  }

  .collection-showcase__header {
    align-items: flex-start;
  }

  .collection-showcase__all-link {
    display: none;
  }

  .collection-showcase__grid {
    grid-template-columns: 1fr;

    gap: 1rem;
  }
}
</style>
