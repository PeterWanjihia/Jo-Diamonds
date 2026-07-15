<script setup lang="ts">
import { computed } from 'vue';

import BaseButton from '../base/BaseButton.vue';

const config = useRuntimeConfig();

const paymentsEnabled = computed(
  () => config.public.paymentsEnabled === true,
);
</script>

<template>
  <section
    class="showroom-hero"
    aria-labelledby="showroom-hero-title"
  >
    <picture class="showroom-hero__media">
      <img
        class="showroom-hero__image"
        src="/images/showroom/hero/objects-of-permanence-desktop.webp"
        alt=""
        width="1916"
        height="821"
        loading="eager"
        decoding="async"
        fetchpriority="high"
      >
    </picture>

    <div
      class="showroom-hero__scrim"
      aria-hidden="true"
    />

    <div class="showroom-hero__inner">
      <div class="showroom-hero__content">
        <p class="showroom-hero__eyebrow">
          The House of JO.DIAMONDS
        </p>

        <h1
          id="showroom-hero-title"
          class="showroom-hero__title"
        >
          Objects of
          <span>permanence.</span>
        </h1>

        <span
          class="showroom-hero__accent"
          aria-hidden="true"
        />

        <p class="showroom-hero__description">
          Exceptional diamonds,<br>
          selected for character and<br>
          crafted to endure a lifetime.
        </p>

        <div class="showroom-hero__actions">
          <BaseButton
            v-if="paymentsEnabled"
            to="/payment"
            variant="solid"
            tone="dark"
            size="compact"
          >
            Make a secure payment
          </BaseButton>

          <BaseButton
            href="#collections"
            variant="outline"
            tone="dark"
            size="compact"
          >
            Explore the collection
          </BaseButton>
        </div>

        <ul
          class="showroom-hero__assurances"
          aria-label="Service assurances"
        >
          <li class="showroom-hero__assurance">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M12 3 14.4 5l3.1-.2.8 3 2.3 2.1-1.4 2.8.4 3.1-2.9 1.2-1.7 2.6-3-.7-2.3 2-2.4-2-3 .7-1.7-2.6-2.9-1.2.4-3.1-1.4-2.8L5.7 7.8l.8-3 3.1.2z"
              />

              <path d="m8.5 12 2.1 2.1 4.9-4.9" />
            </svg>

            <span>Certified stones</span>
          </li>

          <li class="showroom-hero__assurance">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path d="M3 6.5h10.5v9H3z" />
              <path d="M13.5 9h3.2l3.3 3.2v3.3h-6.5z" />

              <circle
                cx="6.5"
                cy="17.5"
                r="1.75"
              />

              <circle
                cx="17.5"
                cy="17.5"
                r="1.75"
              />
            </svg>

            <span>Insured delivery</span>
          </li>

          <li class="showroom-hero__assurance">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <rect
                x="5"
                y="10"
                width="14"
                height="10"
              />

              <path
                d="M8 10V7a4 4 0 0 1 8 0v3"
              />
            </svg>

            <span>Secure payment</span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
.showroom-hero {
  position: relative;
  isolation: isolate;
  overflow: hidden;

  min-height: clamp(
    31.5rem,
    39vw,
    35rem
  );

  background: #050504;
  color: #f8f5ef;
}

.showroom-hero__media {
  position: absolute;
  inset: 0;
  z-index: -3;

  display: block;

  width: 100%;
  height: 100%;
}

.showroom-hero__image {
  display: block;

  width: 100%;
  height: 100%;

  object-fit: cover;
  object-position: center center;
}

.showroom-hero__scrim {
  position: absolute;
  inset: 0;
  z-index: -2;

  background:
    linear-gradient(
      90deg,
      rgb(0 0 0 / 52%) 0%,
      rgb(0 0 0 / 34%) 32%,
      rgb(0 0 0 / 10%) 62%,
      transparent 82%
    ),
    linear-gradient(
      180deg,
      rgb(0 0 0 / 8%) 45%,
      rgb(0 0 0 / 24%) 100%
    );

  pointer-events: none;
}

.showroom-hero__inner {
  display: flex;
  align-items: center;

  width: min(
    calc(100% - (2 * var(--page-gutter))),
    var(--container-wide)
  );

  min-height: inherit;

  margin-inline: auto;

  padding-block: clamp(
    3.25rem,
    6vw,
    5.25rem
  );
}

.showroom-hero__content {
  width: min(
    100%,
    29rem
  );
}

.showroom-hero__eyebrow {
  margin: 0;

  color: #c6a15b;

  font-family: var(--font-interface);
  font-size: 0.6875rem;
  font-weight: 600;

  line-height: 1.2;
  letter-spacing: 0.135em;

  text-transform: uppercase;
}

.showroom-hero__title {
  display: flex;
  flex-direction: column;

  margin: 1.25rem 0 0;

  font-family: var(--font-display);

  font-size: clamp(
    3.4rem,
    4.35vw,
    4.35rem
  );

  font-weight: 500;

  line-height: 0.9;
  letter-spacing: 0.005em;

  text-transform: uppercase;
}

.showroom-hero__title span {
  display: block;
}

.showroom-hero__accent {
  display: block;

  width: 3.25rem;
  height: 1px;

  margin-top: 1.5rem;

  background: #c6a15b;
}

.showroom-hero__description {
  margin: 1.5rem 0 0;

  color: rgb(248 245 239 / 78%);

  font-family: var(--font-interface);
  font-size: 0.875rem;
  font-weight: 400;

  line-height: 1.72;
  letter-spacing: 0.015em;
}

.showroom-hero__actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  gap: 0.75rem;

  margin-top: 1.75rem;
}

.showroom-hero__assurances {
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  gap: 0.75rem 1.4rem;

  margin: 2rem 0 0;
  padding: 1.25rem 0 0;

  border-top: 1px solid rgb(248 245 239 / 20%);

  list-style: none;
}

.showroom-hero__assurance {
  display: inline-flex;
  align-items: center;

  gap: 0.45rem;

  color: rgb(248 245 239 / 74%);

  font-family: var(--font-interface);
  font-size: 0.625rem;
  font-weight: 500;

  line-height: 1;
  letter-spacing: 0.055em;

  text-transform: uppercase;
}

.showroom-hero__assurance svg {
  width: 1rem;
  height: 1rem;

  flex: 0 0 auto;

  stroke: #c6a15b;
  stroke-width: 1.35;
  stroke-linecap: round;
  stroke-linejoin: round;
}

@media (max-width: 900px) {
  .showroom-hero {
    min-height: 34rem;
  }

  .showroom-hero__image {
    object-position: 58% center;
  }

  .showroom-hero__scrim {
    background:
      linear-gradient(
        90deg,
        rgb(0 0 0 / 62%) 0%,
        rgb(0 0 0 / 40%) 52%,
        rgb(0 0 0 / 14%) 100%
      ),
      linear-gradient(
        180deg,
        rgb(0 0 0 / 8%) 35%,
        rgb(0 0 0 / 34%) 100%
      );
  }

  .showroom-hero__content {
    width: min(
      100%,
      27rem
    );
  }

  .showroom-hero__title {
    font-size: clamp(
      3rem,
      7vw,
      4rem
    );
  }
}

@media (max-width: 700px) {
  .showroom-hero {
    min-height: 42rem;
  }

  .showroom-hero__image {
    object-position: 64% center;
  }

  .showroom-hero__scrim {
    background:
      linear-gradient(
        90deg,
        rgb(0 0 0 / 68%) 0%,
        rgb(0 0 0 / 48%) 65%,
        rgb(0 0 0 / 28%) 100%
      ),
      linear-gradient(
        180deg,
        rgb(0 0 0 / 8%) 25%,
        rgb(0 0 0 / 48%) 100%
      );
  }

  .showroom-hero__inner {
    width: calc(100% - 2rem);

    align-items: flex-end;

    padding-block:
      4.5rem
      3rem;
  }

  .showroom-hero__content {
    width: 100%;
  }

  .showroom-hero__eyebrow {
    font-size: 0.625rem;
  }

  .showroom-hero__title {
    font-size: clamp(
      2.9rem,
      14vw,
      4rem
    );

    line-height: 0.92;
  }

  .showroom-hero__description {
    font-size: 0.8125rem;
  }

  .showroom-hero__actions {
    display: grid;
    grid-template-columns: 1fr;

    width: min(
      100%,
      22rem
    );
  }

  .showroom-hero__actions :deep(a),
  .showroom-hero__actions :deep(button) {
    width: 100%;
  }

  .showroom-hero__assurances {
    display: grid;
    grid-template-columns: 1fr;

    gap: 0.8rem;

    width: min(
      100%,
      22rem
    );
  }
}

@media (prefers-reduced-motion: reduce) {
  .showroom-hero *,
  .showroom-hero *::before,
  .showroom-hero *::after {
    scroll-behavior: auto;
    animation-duration: 0.01ms;
    animation-iteration-count: 1;
    transition-duration: 0.01ms;
  }
}
</style>
