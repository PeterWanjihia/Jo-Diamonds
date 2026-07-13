<script setup lang="ts">
import { computed } from 'vue';

import BaseButton from '../base/BaseButton.vue';

import {
  fallbackFeaturedEditorial,
  showroomFeaturedEditorial,
} from '../../config/showroom-featured';

import type {
  CatalogueProductSummaryResponse,
} from '../../types/catalogue';

const props = defineProps<{
  readonly product: CatalogueProductSummaryResponse;
}>();

const editorial = computed(
  () =>
    showroomFeaturedEditorial[
      props.product.slug
    ] ?? fallbackFeaturedEditorial,
);

const formattedPrice = computed(() =>
  new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: editorial.value.currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(
    editorial.value.priceMinor / 100,
  ),
);

const productUrl = computed(
  () => `/pieces/${props.product.slug}`,
);

const viewingUrl = computed(
  () =>
    `mailto:concierge@jodiamonds.store?subject=${encodeURIComponent(
      `Private viewing request: ${editorial.value.displayName}`,
    )}`,
);

const availabilityLabel = computed(() => {
  if (
    props.product.commercialState === 'available'
  ) {
    return 'One piece available';
  }

  return props.product.commercialState
    .replaceAll('_', ' ')
    .replace(/\b\w/g, (character) =>
      character.toUpperCase(),
    );
});
</script>

<template>
  <section
    class="featured-masterpiece"
    aria-labelledby="featured-masterpiece-title"
  >
    <div class="featured-masterpiece__container">
      <article class="featured-masterpiece__card">
        <div class="featured-masterpiece__media">
          <p class="featured-masterpiece__eyebrow">
            Featured masterpiece
          </p>

          <img
            class="featured-masterpiece__image"
            :src="editorial.image"
            :alt="editorial.alt"
            width="1400"
            height="900"
            loading="lazy"
            decoding="async"
            :style="{
              objectPosition:
                editorial.objectPosition,
            }"
          >

          <a
            class="featured-masterpiece__zoom"
            :href="editorial.image"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open featured piece image"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <circle
                cx="10"
                cy="10"
                r="5.5"
              />

              <path d="m14.5 14.5 4.5 4.5" />
              <path d="M7.5 10h5" />
              <path d="M10 7.5v5" />
            </svg>
          </a>
        </div>

        <div class="featured-masterpiece__details">
          <header>
            <h2
              id="featured-masterpiece-title"
              class="featured-masterpiece__title"
            >
              {{ editorial.displayName }}
            </h2>

            <p class="featured-masterpiece__subtitle">
              {{ editorial.subtitle }}
            </p>
          </header>

          <ul class="featured-masterpiece__specifications">
            <li
              v-for="specification in editorial.specifications"
              :key="`${specification.primary}-${specification.secondary}`"
              class="featured-masterpiece__specification"
            >
              <svg
                v-if="specification.icon === 'diamond'"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="m3.5 9 4-5h9l4 5-8.5 11z"
                />

                <path d="M3.5 9h17" />
                <path
                  d="m7.5 4 2.2 5L12 4l2.3 5 2.2-5"
                />
                <path d="m7.5 9 4.5 11 4.5-11" />
              </svg>

              <svg
                v-else-if="specification.icon === 'quality'"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <circle
                  cx="9"
                  cy="9"
                  r="4.5"
                />

                <circle
                  cx="15"
                  cy="15"
                  r="4.5"
                />

                <path d="m6 12 6-6" />
                <path d="m12 18 6-6" />
              </svg>

              <svg
                v-else
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M9.2 14.8 7 17a3 3 0 0 1-4.2-4.2l3.1-3.1a3 3 0 0 1 4.2 0"
                />

                <path
                  d="m14.8 9.2 2.2-2.2a3 3 0 1 1 4.2 4.2l-3.1 3.1a3 3 0 0 1-4.2 0"
                />

                <path d="m8.5 15.5 7-7" />
              </svg>

              <span class="featured-masterpiece__specification-primary">
                {{ specification.primary }}
              </span>

              <span
                class="featured-masterpiece__specification-divider"
                aria-hidden="true"
              >
                ·
              </span>

              <span class="featured-masterpiece__specification-secondary">
                {{ specification.secondary }}
              </span>
            </li>
          </ul>

          <div class="featured-masterpiece__commerce">
            <p class="featured-masterpiece__price">
              {{ formattedPrice }}
            </p>

            <p class="featured-masterpiece__availability">
              {{ availabilityLabel }}
            </p>
          </div>

          <div class="featured-masterpiece__actions">
            <BaseButton
              :to="productUrl"
              variant="solid"
              tone="light"
              size="compact"
            >
              View the piece
            </BaseButton>

            <BaseButton
              :href="viewingUrl"
              variant="outline"
              tone="light"
              size="compact"
            >
              Arrange a viewing
            </BaseButton>
          </div>

          <ul
            class="featured-masterpiece__assurances"
            aria-label="Featured piece services"
          >
            <li>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path d="m4 7 8-4 8 4-8 4z" />
                <path d="M4 7v10l8 4 8-4V7" />
                <path d="M12 11v10" />
                <path d="m8 5 8 4" />
              </svg>

              <span>Insured delivery</span>
            </li>

            <li>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M6.2 7.2A7.5 7.5 0 1 1 4.5 12"
                />

                <path d="M3 6.5h4.5V11" />
                <path d="M12 8.5v4l2.5 1.5" />
              </svg>

              <span>30 day returns</span>
            </li>

            <li>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path d="M6 3h10l3 3v15H6z" />
                <path d="M16 3v4h3" />

                <circle
                  cx="12"
                  cy="13"
                  r="3"
                />

                <path
                  d="m10.5 15.5-.5 3 2-1 2 1-.5-3"
                />
              </svg>

              <span>Certificate included</span>
            </li>

            <li>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M5 19c1-4 3.5-7 7.5-8.5"
                />

                <path
                  d="M12.5 10.5c.5-3 2.5-5.5 6.5-6.5-.2 4-2.2 7-6.5 8.5"
                />

                <path
                  d="M9 13c2.5.5 4.5 2.5 5 6"
                />

                <path d="M4 20h16" />
              </svg>

              <span>Hand-finished in our atelier</span>
            </li>
          </ul>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.featured-masterpiece {
  background: #f5f1ea;
  color: #191713;
}

/*
 * Use exactly the same width system as the collection cards.
 * This fixes the visible left-edge misalignment.
 */
.featured-masterpiece__container {
  width: min(
    calc(100% - (2 * var(--page-gutter))),
    var(--container-wide)
  );

  margin-inline: auto;
  padding-bottom: 1rem;
}

.featured-masterpiece__card {
  display: grid;
  grid-template-columns:
    minmax(0, 1.04fr)
    minmax(0, 0.96fr);

  /*
   * The reference is a restrained horizontal card,
   * not a near-square product section.
   */
  height: clamp(
    19.5rem,
    24vw,
    21rem
  );

  overflow: hidden;

  border:
    1px solid
    rgb(24 22 18 / 14%);

  background: #f7f3ed;
}

/* Image panel */

.featured-masterpiece__media {
  position: relative;

  min-width: 0;
  min-height: 0;

  overflow: hidden;

  border-right:
    1px solid
    rgb(24 22 18 / 11%);

  background: #e9e3da;
}

.featured-masterpiece__image {
  display: block;

  width: 100%;
  height: 100%;

  object-fit: cover;
}

.featured-masterpiece__eyebrow {
  position: absolute;
  top: 0.85rem;
  left: 1rem;

  z-index: 2;

  margin: 0;

  color: rgb(25 23 19 / 86%);

  font-family: var(--font-interface);
  font-size: 0.54rem;
  font-weight: 600;

  line-height: 1;
  letter-spacing: 0.085em;

  text-transform: uppercase;
}

.featured-masterpiece__zoom {
  position: absolute;
  bottom: 1rem;
  left: 1rem;

  display: grid;

  width: 2.3rem;
  height: 2.3rem;

  place-items: center;

  border:
    1px solid
    rgb(25 23 19 / 18%);

  border-radius: 50%;

  background:
    rgb(249 247 242 / 92%);

  color: #25221d;

  backdrop-filter: blur(4px);

  transition:
    background-color 180ms ease,
    transform 180ms ease;
}

.featured-masterpiece__zoom:hover {
  background: #fff;
  transform: scale(1.04);
}

.featured-masterpiece__zoom svg {
  width: 0.95rem;
  height: 0.95rem;

  stroke: currentColor;
  stroke-width: 1.35;
  stroke-linecap: round;
  stroke-linejoin: round;
}

/* Details panel */

.featured-masterpiece__details {
  display: flex;

  min-width: 0;
  min-height: 0;

  flex-direction: column;
  justify-content: center;

  padding:
    1.4rem
    clamp(1.75rem, 2.7vw, 2.75rem);
}

.featured-masterpiece__title {
  margin: 0;

  font-family: var(--font-display);
  font-size: clamp(
    1.95rem,
    2.35vw,
    2.45rem
  );
  font-weight: 500;

  line-height: 0.95;
  letter-spacing: 0.025em;

  text-transform: uppercase;
}

.featured-masterpiece__subtitle {
  margin-top: 0.25rem;

  color: rgb(25 23 19 / 76%);

  font-family: var(--font-display);
  font-size: 0.925rem;
  font-weight: 500;

  line-height: 1.2;
}

/* Jewellery specification rows */

.featured-masterpiece__specifications {
  display: grid;
  gap: 0.35rem;

  margin: 0.75rem 0 0;
  padding: 0;

  list-style: none;
}

.featured-masterpiece__specification {
  display: flex;

  min-width: 0;

  align-items: center;

  color: rgb(25 23 19 / 68%);

  font-family: var(--font-interface);
  font-size: 0.61rem;

  line-height: 1.2;
}

.featured-masterpiece__specification svg {
  width: 0.85rem;
  height: 0.85rem;

  flex: 0 0 auto;

  margin-right: 0.45rem;

  stroke: currentColor;
  stroke-width: 1.25;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.featured-masterpiece__specification-primary {
  color: rgb(25 23 19 / 82%);
}

.featured-masterpiece__specification-divider {
  margin-inline: 0.45rem;

  color: rgb(25 23 19 / 33%);
}

.featured-masterpiece__specification-secondary {
  min-width: 0;

  overflow: hidden;

  color: rgb(25 23 19 / 68%);

  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Price */

.featured-masterpiece__commerce {
  margin-top: 0.75rem;
}

.featured-masterpiece__price {
  margin: 0;

  font-family: var(--font-display);
  font-size: 1.55rem;
  font-weight: 600;

  line-height: 1;
}

.featured-masterpiece__availability {
  margin-top: 0.2rem;

  color: rgb(25 23 19 / 66%);

  font-family: var(--font-interface);
  font-size: 0.575rem;
}

/* Actions */

.featured-masterpiece__actions {
  display: grid;
  grid-template-columns:
    repeat(2, minmax(0, 1fr));

  gap: 0.7rem;

  margin-top: 0.8rem;
}

.featured-masterpiece__actions
:deep(.base-button) {
  width: 100%;
  min-height: 2.45rem;

  padding-inline: 0.65rem;

  font-size: 0.54rem;
  letter-spacing: 0.075em;

  transform: none;
}

.featured-masterpiece__actions
:deep(.base-button:hover) {
  transform: none;
}

/* Bottom assurance row */

.featured-masterpiece__assurances {
  display: grid;
  grid-template-columns:
    repeat(4, max-content);

  align-items: center;
  justify-content: space-between;

  gap: 0.5rem;

  margin: 0.85rem 0 0;
  padding: 0;

  list-style: none;
}

.featured-masterpiece__assurances li {
  display: inline-flex;

  min-width: 0;

  align-items: center;
  gap: 0.3rem;

  color: rgb(25 23 19 / 61%);

  font-family: var(--font-interface);
  font-size: 0.47rem;

  line-height: 1.15;
  white-space: nowrap;
}

.featured-masterpiece__assurances svg {
  width: 0.82rem;
  height: 0.82rem;

  flex: 0 0 auto;

  stroke: currentColor;
  stroke-width: 1.2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

/* Smaller desktop */

@media (max-width: 1120px) {
  .featured-masterpiece__card {
    grid-template-columns:
      minmax(0, 1fr)
      minmax(0, 1fr);
  }

  .featured-masterpiece__details {
    padding-inline: 1.5rem;
  }

  .featured-masterpiece__assurances {
    grid-template-columns:
      repeat(2, max-content);

    justify-content: start;

    column-gap: 1.5rem;
    row-gap: 0.5rem;
  }
}

/* Tablet */

@media (max-width: 850px) {
  .featured-masterpiece__card {
    height: auto;

    grid-template-columns: 1fr;
  }

  .featured-masterpiece__media {
    min-height: 0;

    aspect-ratio: 16 / 10;

    border-right: 0;

    border-bottom:
      1px solid
      rgb(24 22 18 / 11%);
  }

  .featured-masterpiece__details {
    padding:
      2.25rem
      clamp(1.5rem, 7vw, 3.5rem);
  }

  .featured-masterpiece__assurances {
    grid-template-columns:
      repeat(4, max-content);

    justify-content: space-between;
  }
}

/* Mobile */

@media (max-width: 620px) {
  .featured-masterpiece__container {
    width: calc(100% - 2rem);
  }

  .featured-masterpiece__media {
    aspect-ratio: 1 / 1;
  }

  .featured-masterpiece__details {
    padding:
      2rem
      1.25rem;
  }

  .featured-masterpiece__title {
    font-size: 2.1rem;
  }

  .featured-masterpiece__specification {
    align-items: flex-start;
  }

  .featured-masterpiece__specification-secondary {
    white-space: normal;
  }

  .featured-masterpiece__actions {
    grid-template-columns: 1fr;
  }

  .featured-masterpiece__assurances {
    grid-template-columns:
      repeat(2, minmax(0, 1fr));

    justify-content: stretch;

    gap:
      0.75rem
      1rem;
  }

  .featured-masterpiece__assurances li {
    white-space: normal;
  }
}

@media (max-width: 390px) {
  .featured-masterpiece__assurances {
    grid-template-columns: 1fr;
  }
}
</style>