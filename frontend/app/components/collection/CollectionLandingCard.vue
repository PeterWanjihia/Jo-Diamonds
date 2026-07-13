<script setup lang="ts">
import type {
  CollectionLandingEditorial,
} from '../../config/collection-landing';

import type {
  CatalogueCollectionResponse,
} from '../../types/catalogue';

defineProps<{
  readonly collection:
    CatalogueCollectionResponse;

  readonly editorial:
    CollectionLandingEditorial;
}>();
</script>

<template>
  <article
    class="collection-card"
    :class="[
      `collection-card--${editorial.tone}`,
    ]"
  >
    <NuxtLink
      class="collection-card__link"
      :to="{
        path: '/collection',
        query: {
          collection: collection.slug,
        },
      }"
      :aria-label="`Explore the ${collection.name} collection`"
    >
      <img
        class="collection-card__image"
        :src="editorial.image"
        :alt="editorial.alt"
        width="1600"
        height="1200"
        loading="lazy"
        decoding="async"
        :style="{
          objectPosition:
            editorial.objectPosition,
        }"
      >

      <span
        class="collection-card__overlay"
        aria-hidden="true"
      />

      <div class="collection-card__content">
        <h3 class="collection-card__title">
          {{ collection.name }}
        </h3>

        <p class="collection-card__description">
          {{ editorial.description }}
        </p>

        <span class="collection-card__action">
          <span>Explore</span>

          <svg
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path d="M4 12h15" />
            <path d="m14 7 5 5-5 5" />
          </svg>
        </span>
      </div>
    </NuxtLink>
  </article>
</template>

<style scoped>
.collection-card {
  position: relative;

  min-width: 0;

  overflow: hidden;

  border-radius: 0.125rem;

  background: #ded8ce;
}

.collection-card__link {
  position: relative;

  display: block;

  width: 100%;

  aspect-ratio: 4 / 3;

  overflow: hidden;

  color: inherit;
}

.collection-card__image {
  position: absolute;
  inset: 0;

  display: block;

  width: 100%;
  height: 100%;

  object-fit: cover;

  transition:
    transform 700ms
    cubic-bezier(0.22, 1, 0.36, 1);
}

.collection-card__overlay {
  position: absolute;
  inset: 0;

  pointer-events: none;
}

.collection-card--dark
.collection-card__overlay {
  background:
    linear-gradient(
      135deg,
      rgb(5 5 4 / 71%) 0%,
      rgb(5 5 4 / 38%) 42%,
      rgb(5 5 4 / 3%) 72%
    ),
    linear-gradient(
      180deg,
      rgb(0 0 0 / 12%) 0%,
      transparent 55%,
      rgb(0 0 0 / 20%) 100%
    );
}

.collection-card--light
.collection-card__overlay {
  background:
    linear-gradient(
      135deg,
      rgb(247 242 234 / 76%) 0%,
      rgb(247 242 234 / 36%) 43%,
      transparent 72%
    );
}

.collection-card__content {
  position: relative;

  z-index: 1;

  display: flex;
  flex-direction: column;

  width: min(
    76%,
    18rem
  );

  min-height: 100%;

  padding:
    clamp(
      1.25rem,
      2.25vw,
      1.8rem
    );
}

.collection-card--dark {
  color: #f7f2e9;
}

.collection-card--light {
  color: #1c1915;
}

.collection-card__title {
  max-width: 12rem;

  margin: 0;

  color: #b99155;

  font-family: var(--font-display);
  font-size: clamp(
    1.25rem,
    1.7vw,
    1.65rem
  );
  font-weight: 500;

  line-height: 0.98;
  letter-spacing: 0.025em;

  text-transform: uppercase;
}

.collection-card--dark
.collection-card__title {
  color: #d1aa6b;
}

.collection-card__description {
  max-width: 13rem;

  margin:
    0.7rem
    0
    0;

  font-family: var(--font-interface);
  font-size: 0.62rem;
  font-weight: 400;

  line-height: 1.55;
}

.collection-card--dark
.collection-card__description {
  color:
    rgb(247 242 233 / 81%);
}

.collection-card--light
.collection-card__description {
  color:
    rgb(28 25 21 / 75%);
}

.collection-card__action {
  display: inline-flex;

  width: fit-content;

  align-items: center;

  gap: 0.7rem;

  margin-top: 1.4rem;

  font-family: var(--font-interface);
  font-size: 0.55rem;
  font-weight: 600;

  line-height: 1;
  letter-spacing: 0.075em;

  text-transform: uppercase;
}

.collection-card__action svg {
  width: 1rem;
  height: 1rem;

  stroke: currentColor;
  stroke-width: 1.25;
  stroke-linecap: round;
  stroke-linejoin: round;

  transition:
    transform 200ms ease;
}

.collection-card__link:hover
.collection-card__image {
  transform: scale(1.035);
}

.collection-card__link:hover
.collection-card__action svg {
  transform:
    translateX(0.3rem);
}

.collection-card__link:focus-visible {
  outline:
    2px solid
    #b99155;

  outline-offset: -3px;
}

@media (max-width: 900px) {
  .collection-card__content {
    width: min(
      70%,
      18rem
    );
  }
}

@media (max-width: 620px) {
  .collection-card__link {
    min-height: 22rem;

    aspect-ratio: auto;
  }

  .collection-card__content {
    width: min(
      78%,
      19rem
    );

    padding: 1.5rem;
  }

  .collection-card__title {
    font-size: 1.55rem;
  }

  .collection-card__description {
    font-size: 0.65rem;
  }
}
</style>