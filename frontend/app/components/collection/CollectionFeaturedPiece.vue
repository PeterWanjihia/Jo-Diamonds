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

import {
  getCommercialStateLabel,
} from '../../utils/commercial-state';

import { formatMoney } from '../../utils/format-money';

const props = defineProps<{
  readonly product: CatalogueProductSummaryResponse;
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

const formattedPrice = computed(() =>
  formatMoney(props.product.price),
);

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

  return getCommercialStateLabel(
    props.product.commercialState,
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
          <div
            v-for="specification in editorial.specifications"
            :key="`${specification.primary}-${specification.secondary}`"
            class="collection-featured__specification"
          >
            <svg
              v-if="specification.icon === 'diamond'"
              viewBox="0 0 32 32"
              fill="none"
              aria-hidden="true"
            >
              <path d="m5 12 5-7h12l5 7-11 15z" />
              <path d="M5 12h22" />
              <path d="m10 5 3 7L16 5l3 7 3-7" />
              <path d="m10 12 6 15 6-15" />
            </svg>

            <svg
              v-else-if="specification.icon === 'quality'"
              viewBox="0 0 32 32"
              fill="none"
              aria-hidden="true"
            >
              <circle
                cx="12"
                cy="12"
                r="6"
              />
              <circle
                cx="20"
                cy="20"
                r="6"
              />
              <path d="m8 16 8-8" />
              <path d="m16 24 8-8" />
            </svg>

            <svg
              v-else
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
              <li>{{ specification.primary }}</li>
              <li>{{ specification.secondary }}</li>
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
          View {{ editorial.displayName }}
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
  font-size: 0.6875rem;
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
  overflow-wrap: anywhere;
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
  font-size: 0.6875rem;
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
  font-size: 0.6875rem;
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
  min-height: 2.75rem;

  margin-top: 0.75rem;

  border-bottom: 0;

  font-size: 0.6875rem;
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

}
</style>
