<script setup lang="ts">
import type {
  CatalogueCollectionResponse,
} from '../../types/catalogue';

defineProps<{
  readonly collections:
    readonly CatalogueCollectionResponse[];
}>();
</script>

<template>
  <section
    id="collections"
    class="collections"
  >
    <div class="page-container">
      <div class="collections__heading">
        <div>
          <p class="collections__eyebrow">
            The collections
          </p>

          <h2 class="collections__title">
            Signatures of the house
          </h2>
        </div>

        <p class="collections__introduction">
          Distinct expressions united by proportion,
          restraint and enduring presence.
        </p>
      </div>

      <div class="collections__grid">
        <article
          v-for="(collection, index) in collections"
          :key="collection.slug"
          class="collection-card"
        >
          <div
            class="collection-card__visual"
            :data-position="index + 1"
          >
            <span aria-hidden="true">
              {{ String(index + 1).padStart(2, '0') }}
            </span>
          </div>

          <div class="collection-card__content">
            <p class="collection-card__label">
              Collection
            </p>

            <h3 class="collection-card__title">
              {{ collection.name }}
            </h3>

            <p
              v-if="collection.description"
              class="collection-card__description"
            >
              {{ collection.description }}
            </p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.collections {
  padding-block:
    clamp(var(--space-8), 10vw, var(--space-10));

  background: var(--colour-ivory);
}

.collections__heading {
  display: grid;
  grid-template-columns:
    minmax(0, 1fr)
    minmax(18rem, 0.55fr);

  align-items: end;
  gap: var(--space-8);
}

.collections__eyebrow,
.collection-card__label {
  color: var(--colour-gold);

  font-size: var(--font-size-label);
  font-weight: 600;

  letter-spacing: var(--letter-spacing-label);
  text-transform: uppercase;
}

.collections__title {
  max-width: 12ch;
  margin-top: var(--space-4);

  font-family: var(--font-display);
  font-size: var(--font-size-heading-medium);
  font-weight: 400;

  line-height: var(--line-height-tight);
}

.collections__introduction,
.collection-card__description {
  color: var(--colour-text-muted);
}

.collections__grid {
  display: grid;
  grid-template-columns:
    repeat(3, minmax(0, 1fr));

  gap: var(--space-5);

  margin-top: var(--space-8);
}

.collection-card {
  background: var(--colour-paper);
}

.collection-card__visual {
  display: grid;
  min-height: 22rem;
  place-items: end start;

  padding: var(--space-5);

  background:
    radial-gradient(
      circle at 70% 30%,
      rgb(255 255 255 / 14%),
      transparent 30%
    ),
    linear-gradient(
      145deg,
      var(--colour-ink-soft),
      var(--colour-ink)
    );

  color: var(--colour-gold-soft);

  font-family: var(--font-display);
  font-size: 3.5rem;
}

.collection-card__visual[data-position='2'] {
  background:
    radial-gradient(
      circle at 35% 25%,
      #fff,
      transparent 30%
    ),
    linear-gradient(
      145deg,
      #e8e0d5,
      #c8b9a5
    );

  color: var(--colour-text);
}

.collection-card__content {
  padding: var(--space-6);
}

.collection-card__title {
  margin-top: var(--space-3);

  font-family: var(--font-display);
  font-size: var(--font-size-heading-small);
  font-weight: 400;

  line-height: var(--line-height-heading);
}

.collection-card__description {
  margin-top: var(--space-4);
}

@media (max-width: 900px) {
  .collections__heading {
    grid-template-columns: 1fr;
    gap: var(--space-5);
  }

  .collections__grid {
    grid-template-columns:
      repeat(2, minmax(0, 1fr));
  }

  .collection-card:last-child {
    grid-column: 1 / -1;
  }
}

@media (max-width: 620px) {
  .collections__grid {
    grid-template-columns: 1fr;
  }

  .collection-card:last-child {
    grid-column: auto;
  }
}
</style>
