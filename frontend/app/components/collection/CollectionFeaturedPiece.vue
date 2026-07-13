<script setup lang="ts">
import { computed } from 'vue';

import BaseTextLink from '../base/BaseTextLink.vue';

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

const emit = defineEmits<{
  play: [];
}>();

const editorial = computed(
  () =>
    showroomFeaturedEditorial[
      props.product.slug
    ] ?? fallbackFeaturedEditorial,
);

const productUrl = computed(
  () => `/pieces/${props.product.slug}`,
);

const formattedPrice = computed(() => {
  const amount =
    props.product.price.minor / 100;

  const currency =
    props.product.price.currency.toUpperCase();

  if (currency === 'KES') {
    const formattedAmount =
      new Intl.NumberFormat('en-KE', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(amount);

    return `KSh ${formattedAmount}`;
  }

  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
});

const availabilityLabel = computed(() => {
  if (
    props.product.commercialState === 'available'
    && props.product.supply.mode === 'unique'
  ) {
    return 'One piece available';
  }

  if (
    props.product.commercialState === 'available'
    && props.product.supply.mode === 'limited'
  ) {
    return `${props.product.supply.editionSize}-piece edition`;
  }

  if (
    props.product.commercialState === 'available'
  ) {
    return 'Available to order';
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
    class="collection-featured"
    aria-labelledby="collection-featured-title"
  >
    <div class="collection-featured__inner">
      <article class="collection-featured__details">
        <p class="collection-featured__eyebrow">
          Featured piece
        </p>

        <h2
          id="collection-featured-title"
          class="collection-featured__title"
        >
          {{ editorial.displayName }}
        </h2>

        <p class="collection-featured__subtitle">
          {{ editorial.subtitle }}
        </p>

        <div class="collection-featured__specifications">
          <div class="collection-featured__specification">
            <svg
              viewBox="0 0 32 32"
              fill="none"
              aria-hidden="true"
            >
              <path d="m5 12 5-7h12l5 7-11 15z" />
              <path d="M5 12h22" />
              <path d="m10 5 3 7L16 5l3 7 3-7" />
              <path d="m10 12 6 15 6-15" />
            </svg>

            <ul>
              <li>2.10 ct</li>
              <li>G colour</li>
              <li>VS1 clarity</li>
            </ul>
          </div>

          <div class="collection-featured__specification">
            <svg
              viewBox="0 0 32 32"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M12.5 20.5 9 24a4 4 0 0 1-5.7-5.7l4.4-4.4a4 4 0 0 1 5.7 0"
              />

              <path
                d="m19.5 11.5 3.5-3.5a4 4 0 1 1 5.7 5.7l-4.4 4.4a4 4 0 0 1-5.7 0"
              />

              <path d="m11 21 10-10" />
            </svg>

            <ul>
              <li>Platinum 950</li>
              <li>Four-prong setting</li>
            </ul>
          </div>
        </div>

        <div class="collection-featured__commerce">
          <p class="collection-featured__price">
            {{ formattedPrice }}
          </p>

          <p
            class="collection-featured__availability"
            :class="{
              'collection-featured__availability--available':
                product.commercialState === 'available',
            }"
          >
            <span
              class="collection-featured__availability-dot"
              aria-hidden="true"
            />

            {{ availabilityLabel }}
          </p>
        </div>

        <BaseTextLink
          :to="productUrl"
          tone="light"
          arrow="right"
          class="collection-featured__link"
        >
          View the Aurelia
        </BaseTextLink>
      </article>

      <div class="collection-featured__media">
        <img
          class="collection-featured__image"
          :src="editorial.image"
          :alt="editorial.alt"
          width="1600"
          height="900"
          loading="lazy"
          decoding="async"
          :style="{
            objectPosition:
              editorial.objectPosition,
          }"
        >

        <span
          class="collection-featured__media-wash"
          aria-hidden="true"
        />

        <button
          class="collection-featured__play"
          type="button"
          :aria-label="`Play a presentation of ${editorial.displayName}`"
          @click="emit('play')"
        >
          <svg
            viewBox="0 0 32 32"
            aria-hidden="true"
          >
            <path d="m12 8 12 8-12 8z" />
          </svg>
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.collection-featured {
  background:
    linear-gradient(
      90deg,
      #faf8f4 0%,
      #f7f3ed 50%,
      #faf8f4 100%
    );

  color: #191713;
}

.collection-featured__inner {
  display: grid;
  grid-template-columns:
    minmax(15rem, 0.34fr)
    minmax(0, 0.66fr);

  width: min(
    calc(100% - (2 * var(--page-gutter))),
    var(--container-wide)
  );

  min-height: clamp(
    17rem,
    22vw,
    21rem
  );

  margin-inline: auto;

  padding-block:
    0
    1rem;
}

/* Details */

.collection-featured__details {
  display: flex;
  flex-direction: column;

  min-width: 0;

  justify-content: center;

  padding:
    1.5rem
    clamp(1.5rem, 3vw, 2.75rem)
    1.5rem
    clamp(1rem, 2vw, 1.5rem);
}

.collection-featured__eyebrow {
  margin: 0;

  color: #a47b3f;

  font-family: var(--font-interface);
  font-size: 0.52rem;
  font-weight: 600;

  line-height: 1;
  letter-spacing: 0.085em;

  text-transform: uppercase;
}

.collection-featured__title {
  margin:
    0.55rem
    0
    0;

  font-family: var(--font-display);
  font-size: clamp(
    1.8rem,
    2.4vw,
    2.45rem
  );
  font-weight: 500;

  line-height: 0.95;
  letter-spacing: 0.025em;

  text-transform: uppercase;
}

.collection-featured__subtitle {
  margin:
    0.35rem
    0
    0;

  color:
    rgb(25 23 19 / 78%);

  font-family: var(--font-display);
  font-size: 0.9rem;
  font-weight: 500;

  line-height: 1.25;
}

.collection-featured__specifications {
  display: grid;

  gap: 0.55rem;

  margin-top: 1rem;
}

.collection-featured__specification {
  display: grid;
  grid-template-columns:
    1rem
    minmax(0, 1fr);

  align-items: center;

  gap: 0.55rem;
}

.collection-featured__specification svg {
  width: 0.95rem;
  height: 0.95rem;

  stroke: #292722;
  stroke-width: 1.25;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.collection-featured__specification ul {
  display: flex;
  flex-wrap: wrap;

  align-items: center;

  gap: 0;

  margin: 0;
  padding: 0;

  list-style: none;
}

.collection-featured__specification li {
  color:
    rgb(25 23 19 / 75%);

  font-family: var(--font-interface);
  font-size: 0.54rem;
  font-weight: 400;

  line-height: 1.4;
}

.collection-featured__specification
li:not(:last-child)::after {
  content: '•';

  display: inline-block;

  margin-inline: 0.55rem;

  color:
    rgb(25 23 19 / 58%);
}

.collection-featured__commerce {
  margin-top: 0.85rem;
}

.collection-featured__price {
  margin: 0;

  font-family: var(--font-interface);
  font-size: 0.9rem;
  font-weight: 500;

  line-height: 1.2;
}

.collection-featured__availability {
  display: flex;

  align-items: center;

  gap: 0.4rem;

  margin:
    0.3rem
    0
    0;

  color:
    rgb(25 23 19 / 65%);

  font-family: var(--font-interface);
  font-size: 0.52rem;
  font-weight: 400;

  line-height: 1.2;
}

.collection-featured__availability-dot {
  width: 0.38rem;
  height: 0.38rem;

  flex: 0 0 auto;

  border-radius: 50%;

  background: #77736c;
}

.collection-featured__availability--available {
  color: #456441;
}

.collection-featured__availability--available
.collection-featured__availability-dot {
  background: #2e7a31;
}

.collection-featured__link {
  width: fit-content;
  min-height: 2rem;

  margin-top: 0.75rem;

  border-bottom: 0;

  font-size: 0.55rem;
  font-weight: 600;

  letter-spacing: 0.075em;
}

.collection-featured__link:hover {
  border-bottom: 0;
}

/* Media */

.collection-featured__media {
  position: relative;

  min-width: 0;
  min-height: inherit;

  overflow: hidden;

  border-radius: 0.125rem;

  background: #ebe6df;
}

.collection-featured__image {
  position: absolute;
  inset: 0;

  display: block;

  width: 100%;
  height: 100%;

  object-fit: cover;

  transition:
    transform 800ms
    cubic-bezier(0.22, 1, 0.36, 1);
}

.collection-featured__media-wash {
  position: absolute;
  inset: 0;

  background:
    linear-gradient(
      90deg,
      rgb(247 243 237 / 12%) 0%,
      transparent 25%,
      transparent 75%,
      rgb(247 243 237 / 12%) 100%
    );

  pointer-events: none;
}

.collection-featured__media:hover
.collection-featured__image {
  transform: scale(1.018);
}

.collection-featured__play {
  position: absolute;
  right: clamp(1.25rem, 2.5vw, 2.25rem);
  bottom: clamp(1.25rem, 2.5vw, 2.25rem);

  display: grid;

  width: 3.75rem;
  height: 3.75rem;

  place-items: center;

  padding: 0;

  border:
    1px solid
    rgb(25 23 19 / 52%);

  border-radius: 50%;

  background:
    rgb(250 248 244 / 48%);

  color: #11110f;

  cursor: pointer;

  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);

  transition:
    background-color 180ms ease,
    color 180ms ease,
    transform 180ms ease;
}

.collection-featured__play svg {
  width: 1.65rem;
  height: 1.65rem;

  fill: currentColor;

  transform: translateX(0.1rem);
}

.collection-featured__play:hover {
  background: #11110f;
  color: #f8f5ef;

  transform: scale(1.04);
}

.collection-featured__play:focus-visible {
  outline:
    2px solid
    #a47b3f;

  outline-offset: 3px;
}

/* Tablet */

@media (max-width: 900px) {
  .collection-featured__inner {
    grid-template-columns:
      minmax(13rem, 0.4fr)
      minmax(0, 0.6fr);
  }

  .collection-featured__details {
    padding-inline:
      0.5rem
      1.5rem;
  }

  .collection-featured__title {
    font-size: 1.8rem;
  }

  .collection-featured__play {
    width: 3.25rem;
    height: 3.25rem;
  }
}

/* Mobile */

@media (max-width: 680px) {
  .collection-featured__inner {
    grid-template-columns: 1fr;

    width: calc(100% - 2rem);

    padding-block:
      0
      1.25rem;
  }

  .collection-featured__details {
    padding:
      1.75rem
      0
      1.5rem;
  }

  .collection-featured__title {
    font-size: 2rem;
  }

  .collection-featured__subtitle {
    font-size: 1rem;
  }

  .collection-featured__media {
    min-height: 20rem;
  }

  .collection-featured__play {
    right: 1rem;
    bottom: 1rem;

    width: 3.25rem;
    height: 3.25rem;
  }
}
</style>
