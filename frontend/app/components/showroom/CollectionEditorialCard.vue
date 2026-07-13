<script setup lang="ts">
import type {
  ShowroomCollectionEditorial,
} from '../../config/showroom-editorial';

import type {
  CatalogueCollectionResponse,
} from '../../types/catalogue';

defineProps<{
  readonly collection: CatalogueCollectionResponse;
  readonly editorial: ShowroomCollectionEditorial;
}>();
</script>

<template>
  <article
    class="collection-card"
    :class="[
      `collection-card--${editorial.tone}`,
      `collection-card--overlay-${editorial.overlayStrength}`,
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
        width="1200"
        height="900"
        loading="lazy"
        decoding="async"
        :style="{
          objectPosition: editorial.objectPosition,
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
          {{ collection.description }}
        </p>

        <span class="collection-card__action">
          <span>Explore</span>

          <svg
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path d="M5 12h14" />
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

  background: #ded7cb;
}

.collection-card__link {
  position: relative;

  display: block;

  min-height: clamp(
    18rem,
    27vw,
    25rem
  );

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

.collection-card--overlay-strong
.collection-card__overlay {
  background:
    linear-gradient(
      180deg,
      transparent 30%,
      rgb(9 8 7 / 20%) 55%,
      rgb(9 8 7 / 88%) 100%
    );
}

.collection-card--overlay-soft
.collection-card__overlay {
  background:
    linear-gradient(
      180deg,
      transparent 42%,
      rgb(244 238 228 / 14%) 61%,
      rgb(244 238 228 / 76%) 100%
    );
}

.collection-card__content {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;

  z-index: 1;

  padding:
    clamp(1.25rem, 2vw, 1.75rem);
}

.collection-card--light {
  color: #f8f5ef;
}

.collection-card--dark {
  color: #171612;
}

.collection-card__title {
  margin: 0;

  font-family: var(--font-display);
  font-size: clamp(
    1.2rem,
    1.6vw,
    1.55rem
  );
  font-weight: 500;

  line-height: 1;
  letter-spacing: 0.035em;

  text-transform: uppercase;
}

.collection-card__description {
  max-width: 25rem;

  margin-top: 0.5rem;

  font-family: var(--font-interface);
  font-size: 0.75rem;
  font-weight: 400;

  line-height: 1.45;
}

.collection-card--light
.collection-card__description {
  color: rgb(248 245 239 / 82%);
}

.collection-card--dark
.collection-card__description {
  color: rgb(23 22 18 / 78%);
}

.collection-card__action {
  display: inline-flex;
  align-items: center;
  gap: 0.7rem;

  margin-top: 0.85rem;

  font-family: var(--font-interface);
  font-size: 0.625rem;
  font-weight: 600;

  line-height: 1;
  letter-spacing: 0.09em;

  text-transform: uppercase;
}

.collection-card__action svg {
  width: 1rem;
  height: 1rem;

  stroke: currentColor;
  stroke-width: 1.35;
  stroke-linecap: round;
  stroke-linejoin: round;

  transition:
    transform 250ms
    ease;
}

.collection-card__link:hover
.collection-card__image {
  transform: scale(1.035);
}

.collection-card__link:hover
.collection-card__action svg {
  transform: translateX(0.3rem);
}

.collection-card__link:focus-visible {
  outline:
    2px solid
    var(--colour-gold);

  outline-offset: -3px;
}

@media (max-width: 700px) {
  .collection-card__link {
    min-height: 25rem;
  }

  .collection-card__content {
    padding: 1.5rem;
  }

  .collection-card__description {
    max-width: 21rem;
  }
}
</style>
