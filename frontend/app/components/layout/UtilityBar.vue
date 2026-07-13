<script setup lang="ts">
import { computed } from 'vue';

import {
  siteCapabilities,
  utilityBarItems,
} from '../../config/site-capabilities';

const visibleItems = computed(() =>
  utilityBarItems.filter(
    (item) => siteCapabilities[item.capability],
  ),
);
</script>

<template>
  <aside
    class="utility-bar"
    aria-label="Client service assurances"
  >
    <div class="utility-bar__inner">
      <ul class="utility-bar__list">
        <li
          v-for="item in visibleItems"
          :key="item.id"
          class="utility-bar__item"
        >
          <svg
            v-if="item.icon === 'delivery'"
            class="utility-bar__icon"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M3.5 6.5h10v9h-10z"
            />
            <path
              d="M13.5 9h3.3l3.2 3.2v3.3h-6.5z"
            />
            <path
              d="M6.5 18.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"
            />
            <path
              d="M17.5 18.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"
            />
          </svg>

          <svg
            v-else-if="item.icon === 'concierge'"
            class="utility-bar__icon"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M5 13v-2a7 7 0 0 1 14 0v2"
            />
            <path
              d="M5 12H3.75A1.75 1.75 0 0 0 2 13.75v2.5A1.75 1.75 0 0 0 3.75 18H5z"
            />
            <path
              d="M19 12h1.25A1.75 1.75 0 0 1 22 13.75v2.5A1.75 1.75 0 0 1 20.25 18H19z"
            />
            <path
              d="M19 18c0 2-1.8 3-4 3h-1"
            />
          </svg>

          <span class="utility-bar__label">
            {{ item.label }}
          </span>
        </li>
      </ul>
    </div>
  </aside>
</template>

<style scoped>
.utility-bar {
  position: relative;
  z-index: var(--z-header);

  width: 100%;
  min-height: 1.875rem;

  border-bottom:
    1px solid rgb(255 255 255 / 7%);

  background:
    linear-gradient(
      90deg,
      #10100f 0%,
      #0b0b0a 50%,
      #10100f 100%
    );

  color: var(--colour-text-on-dark);
}

.utility-bar__inner {
  display: flex;
  width: min(
    calc(100% - (2 * var(--page-gutter))),
    72rem
  );

  min-height: 1.875rem;

  align-items: center;
  justify-content: center;

  margin-inline: auto;
}

.utility-bar__list {
  display: flex;
  align-items: center;
  justify-content: center;

  margin: 0;
  padding: 0;

  list-style: none;
}

.utility-bar__item {
  display: inline-flex;
  flex: 0 0 auto;

  align-items: center;
  gap: 0.4375rem;

  color: rgb(247 243 237 / 91%);

  font-size: 0.625rem;
  font-weight: 400;

  line-height: 1;
  letter-spacing: 0.02em;

  white-space: nowrap;
}

.utility-bar__item + .utility-bar__item {
  margin-left: clamp(
    1rem,
    2.25vw,
    2.25rem
  );
}

.utility-bar__item + .utility-bar__item::before {
  content: '';

  width: 0.1875rem;
  height: 0.1875rem;

  margin-right: clamp(
    0.625rem,
    1vw,
    1.125rem
  );

  flex: 0 0 auto;

  background: var(--colour-gold-soft);

  transform: rotate(45deg);
}

.utility-bar__icon {
  width: 0.875rem;
  height: 0.875rem;

  flex: 0 0 auto;

  stroke: currentColor;
  stroke-width: 1.35;
  stroke-linecap: round;
  stroke-linejoin: round;

  opacity: 0.92;
}

.utility-bar__label {
  transform: translateY(-0.015625rem);
}

/*
 * Laptop and tablet:
 * preserve all four messages but tighten spacing.
 */
@media (max-width: 900px) {
  .utility-bar__inner {
    width: calc(100% - 2rem);
  }

  .utility-bar__item {
    font-size: 0.59375rem;
  }

  .utility-bar__item + .utility-bar__item {
    margin-left: 0.75rem;
  }

  .utility-bar__item + .utility-bar__item::before {
    margin-right: 0.375rem;
  }
}

/*
 * Mobile:
 * keep the major visual promises and the Stripe message.
 * Certification remains available elsewhere in the page.
 */
@media (max-width: 640px) {
  .utility-bar {
    min-height: 2rem;
  }

  .utility-bar__inner {
    width: calc(100% - 1.5rem);
    min-height: 2rem;
  }

  .utility-bar__item:nth-child(3) {
    display: none;
  }

  .utility-bar__item {
    font-size: 0.5625rem;
  }

  .utility-bar__item + .utility-bar__item {
    margin-left: 0.625rem;
  }

  .utility-bar__item + .utility-bar__item::before {
    width: 0.15625rem;
    height: 0.15625rem;

    margin-right: 0.25rem;
  }

  .utility-bar__icon {
    width: 0.75rem;
    height: 0.75rem;
  }
}

/*
 * Very narrow phones:
 * show the two service-oriented end messages.
 */
@media (max-width: 430px) {
  .utility-bar__list {
    width: 100%;
    justify-content: space-between;
  }

  .utility-bar__item:nth-child(2),
  .utility-bar__item:nth-child(3) {
    display: none;
  }

  .utility-bar__item + .utility-bar__item {
    margin-left: 0.75rem;
  }
}
</style>
