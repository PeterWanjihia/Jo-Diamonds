<script setup lang="ts">
import BaseButton from '../base/BaseButton.vue';
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
            href="#collections"
            variant="outline"
            tone="dark"
            size="compact"
          >
            Explore the collection
          </BaseButton>

          <BaseButton
            href="mailto:concierge@jodiamonds.store?subject=Private%20viewing%20request"
            variant="outline"
            tone="dark"
            size="compact"
          >
            Private viewing
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

  min-height: clamp(
    31.5rem,
    39vw,
    35rem
  );

  overflow: hidden;

  background: #050504;
  color: #f8f5ef;

  isolation: isolate;
}

/*
 * The photograph is a real image element rather than a CSS
 * background so the browser can prioritize it as the page's
 * largest visible asset.
 */
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

/*
 * The source image already contains a dark text-safe region.
 * This overlay is deliberately restrained.
 */
.showroom-hero__scrim {
  position: absolute;
  inset: 0;

  z-index: -2;

  background:
    linear-gradient(
      90deg,
      rgb(0 0 0 / 24%) 0%,
      rgb(0 0 0 / 12%) 35%,
      transparent 61%
    ),
    linear-gradient(
      180deg,
      rgb(0 0 0 / 5%) 50%,
      rgb(0 0 0 / 16%) 100%
    );

  pointer-events: none;
}

.showroom-hero__inner {
  display: flex;

  width: min(
    calc(100% - (2 * var(--page-gutter))),
    var(--container-wide)
  );

  min-height: inherit;

  align-items: center;

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
    27rem
  );
}

.showroom-hero__eyebrow {
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

  margin-top: 1.25rem;

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

  width: 2.25rem;
  height: 1px;

  margin-top: 1.4rem;

  background: #c6a15b;
}

.showroom-hero__description {
  margin-top: 1.25rem;

  color: rgb(248 245 239 / 86%);

  font-family: var(--font-interface);
  font-size: 0.9375rem;
  font-weight: 400;

  line-height: 1.55;
}

.showroom-hero__actions {
  display: flex;
  align-items: center;
  gap: 0.875rem;

  margin-top: 1.65rem;
}

.showroom-hero__actions
:deep(.base-button) {
  min-height: 2.75rem;

  padding-inline: 1.5rem;

  border-color:
    rgb(248 245 239 / 60%);

  background:
    rgb(0 0 0 / 8%);

  font-size: 0.625rem;
  letter-spacing: 0.075em;

  backdrop-filter: blur(2px);
}

.showroom-hero__actions
:deep(.base-button:first-child) {
  min-width: 14.5rem;
}

.showroom-hero__actions
:deep(.base-button:last-child) {
  min-width: 11rem;
}

.showroom-hero__actions
:deep(.base-button:hover) {
  border-color: #f8f5ef;

  background: #f8f5ef;
  color: #11110f;
}

.showroom-hero__assurances {
  display: flex;
  flex-wrap: wrap;

  align-items: center;

  gap: 0;

  margin: 1.85rem 0 0;
  padding: 0;

  list-style: none;
}

.showroom-hero__assurance {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;

  color: rgb(248 245 239 / 72%);

  font-family: var(--font-interface);
  font-size: 0.625rem;
  font-weight: 400;

  line-height: 1;
  white-space: nowrap;
}

.showroom-hero__assurance
+ .showroom-hero__assurance {
  margin-left: 0.95rem;
}

.showroom-hero__assurance
+ .showroom-hero__assurance::before {
  content: '';

  width: 0.1875rem;
  height: 0.1875rem;

  margin-right: 0.55rem;

  background: #c6a15b;

  transform: rotate(45deg);
}

.showroom-hero__assurance svg {
  width: 0.95rem;
  height: 0.95rem;

  flex: 0 0 auto;

  stroke: currentColor;
  stroke-width: 1.25;
  stroke-linecap: round;
  stroke-linejoin: round;
}

/*
 * Small laptops and tablets.
 */
@media (max-width: 1050px) {
  .showroom-hero {
    min-height: 32rem;
  }

  .showroom-hero__image {
    object-position: 58% center;
  }

  .showroom-hero__content {
    width: min(
      100%,
      24rem
    );
  }

  .showroom-hero__title {
    font-size: clamp(
      3.2rem,
      5.8vw,
      4rem
    );
  }

  .showroom-hero__actions {
    align-items: stretch;
    flex-direction: column;

    width: 14.5rem;
  }

  .showroom-hero__actions
  :deep(.base-button) {
    width: 100%;
    min-width: 0;
  }
}

/*
 * Mobile uses the same asset temporarily.
 *
 * A dedicated portrait asset can replace it later without
 * changing the component structure.
 */
@media (max-width: 700px) {
  .showroom-hero {
    min-height: 42rem;
  }

  .showroom-hero__image {
    object-position: 68% center;
  }

  .showroom-hero__scrim {
    background:
      linear-gradient(
        180deg,
        rgb(0 0 0 / 8%) 0%,
        rgb(0 0 0 / 25%) 37%,
        rgb(0 0 0 / 90%) 68%,
        rgb(0 0 0 / 98%) 100%
      );
  }

  .showroom-hero__inner {
    align-items: flex-end;

    width: calc(100% - 2.5rem);

    padding-block:
      13rem
      2.25rem;
  }

  .showroom-hero__content {
    width: 100%;
  }

  .showroom-hero__eyebrow {
    font-size: 0.625rem;
  }

  .showroom-hero__title {
    max-width: 9ch;

    margin-top: 0.9rem;

    font-size: clamp(
      3rem,
      15vw,
      4.35rem
    );

    line-height: 0.88;
  }

  .showroom-hero__description {
    font-size: 0.875rem;
  }

  .showroom-hero__actions {
    display: grid;

    width: 100%;

    gap: 0.65rem;

    margin-top: 1.5rem;
  }

  .showroom-hero__actions
  :deep(.base-button) {
    width: 100%;
    min-width: 0;
  }

  .showroom-hero__assurances {
    row-gap: 0.75rem;

    margin-top: 1.4rem;
  }
}

@media (max-width: 390px) {
  .showroom-hero__inner {
    width: calc(100% - 2rem);
  }

  .showroom-hero__title {
    font-size: 2.85rem;
  }

  .showroom-hero__assurance {
    font-size: 0.5625rem;
  }
}
</style>