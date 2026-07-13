<script setup lang="ts">
import BaseButton from '../base/BaseButton.vue';
import BaseTextLink from '../base/BaseTextLink.vue';
</script>

<template>
  <section
    class="collection-hero"
    aria-labelledby="collection-hero-title"
  >
    <div
      class="collection-hero__media"
      aria-hidden="true"
    >
      <img
        class="collection-hero__image"
        src="/images/showroom/collections/modern-icons.webp"
        alt=""
        width="1200"
        height="900"
        fetchpriority="high"
        decoding="async"
      >

      <span class="collection-hero__media-wash" />
    </div>

    <div class="collection-hero__inner">
      <div class="collection-hero__content">
        <h1
          id="collection-hero-title"
          class="collection-hero__title"
        >
          <span>Objects of</span>

          <span>
            permanence<span class="collection-hero__period">.</span>
          </span>
        </h1>

        <span
          class="collection-hero__rule"
          aria-hidden="true"
        />

        <p class="collection-hero__description">
          Exceptional diamonds, selected for their character,
          craftsmanship and lasting presence.
        </p>

        <div class="collection-hero__actions">
          <BaseButton
            to="#collections"
            variant="solid"
            tone="light"
            size="compact"
            class="collection-hero__discover"
          >
            Discover the collection
          </BaseButton>

          <BaseTextLink
            to="#private-experience"
            tone="light"
            arrow="right"
            class="collection-hero__private-viewing"
          >
            Private viewing
          </BaseTextLink>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.collection-hero {
  position: relative;

  width: 100%;
  height: clamp(
    25rem,
    31vw,
    31rem
  );

  overflow: hidden;

  border-bottom:
    1px solid
    rgb(24 22 18 / 11%);

  background:
    linear-gradient(
      90deg,
      #faf8f4 0%,
      #f6f2eb 44%,
      #eee7dc 100%
    );

  color: #151410;

  isolation: isolate;
}

/*
 * The artwork occupies only the right side.
 *
 * This is the main correction: the ring is no longer
 * centred across the entire viewport and therefore
 * no longer crowds the heading.
 */
.collection-hero__media {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;

  z-index: -2;

  width: 64%;

  overflow: hidden;
}

.collection-hero__image {
  display: block;

  width: 100%;
  height: 100%;

  object-fit: cover;

  /*
   * The source ring is close to the centre of its image.
   * Because the media panel itself begins on the right,
   * this places the ring around 70–74% across the page.
   */
  object-position: center center;
}

/*
 * Blend the beginning of the image panel into the plain
 * cream background. This creates the empty breathing room
 * visible between the typography and the ring.
 */
.collection-hero__media-wash {
  position: absolute;
  inset: 0;

  background:
    linear-gradient(
      90deg,
      #f8f5ef 0%,
      rgb(248 245 239 / 98%) 8%,
      rgb(248 245 239 / 80%) 18%,
      rgb(248 245 239 / 38%) 30%,
      rgb(248 245 239 / 8%) 43%,
      transparent 56%
    );

  pointer-events: none;
}

.collection-hero__inner {
  display: flex;

  width: min(
    calc(100% - (2 * var(--page-gutter))),
    var(--container-wide)
  );

  height: 100%;

  align-items: center;

  margin-inline: auto;
}

.collection-hero__content {
  position: relative;

  z-index: 1;

  width: min(
    100%,
    31rem
  );

  padding-block:
    3rem
    3.25rem;
}

.collection-hero__title {
  display: flex;
  flex-direction: column;

  margin: 0;

  font-family: var(--font-display);
  font-size: clamp(
    3.25rem,
    4.45vw,
    4.65rem
  );
  font-weight: 500;

  line-height: 0.92;
  letter-spacing: 0.012em;

  text-transform: uppercase;
}

.collection-hero__title > span {
  display: block;
}

.collection-hero__period {
  display: inline;

  color: #a57c40;
}

.collection-hero__rule {
  display: block;

  width: 2.25rem;
  height: 1px;

  margin-top: 1.4rem;

  background: #b48a4d;
}

.collection-hero__description {
  max-width: 27rem;

  margin:
    1.15rem
    0
    0;

  color:
    rgb(21 20 16 / 78%);

  font-family: var(--font-interface);
  font-size: clamp(
    0.72rem,
    0.82vw,
    0.82rem
  );
  font-weight: 400;

  line-height: 1.65;
}

.collection-hero__actions {
  display: flex;
  flex-wrap: wrap;

  align-items: center;

  gap:
    0.9rem
    1.6rem;

  margin-top: 1.5rem;
}

.collection-hero__discover {
  min-width: 11.6rem;
  min-height: 2.75rem;
}

.collection-hero__private-viewing {
  min-height: 2.75rem;

  border-bottom: 0;

  font-size: 0.56rem;
  font-weight: 600;

  letter-spacing: 0.075em;
}

.collection-hero__private-viewing:hover {
  border-bottom: 0;
}

/*
 * Override the generic shared-button dimensions only for
 * this hero. The component itself remains reusable.
 */
.collection-hero__discover:deep(.base-button),
.collection-hero__discover {
  min-width: 11.6rem;
  min-height: 2.75rem;

  padding-inline: 1.35rem;
}

/* Medium desktop */

@media (max-width: 1200px) {
  .collection-hero__media {
    width: 66%;
  }

  .collection-hero__content {
    width: min(
      100%,
      28rem
    );
  }

  .collection-hero__title {
    font-size: clamp(
      3rem,
      5vw,
      4rem
    );
  }
}

/* Tablet */

@media (max-width: 900px) {
  .collection-hero {
    height: 29rem;
  }

  .collection-hero__media {
    width: 72%;
  }

  .collection-hero__image {
    object-position: 54% center;
  }

  .collection-hero__media-wash {
    background:
      linear-gradient(
        90deg,
        #f8f5ef 0%,
        rgb(248 245 239 / 96%) 15%,
        rgb(248 245 239 / 70%) 31%,
        rgb(248 245 239 / 22%) 50%,
        transparent 68%
      );
  }

  .collection-hero__content {
    width: min(
      100%,
      25rem
    );
  }

  .collection-hero__title {
    font-size: clamp(
      2.9rem,
      6.5vw,
      3.75rem
    );
  }

  .collection-hero__description {
    max-width: 23rem;
  }
}

/* Mobile */

@media (max-width: 620px) {
  .collection-hero {
    height: 40rem;

    background: #f8f5ef;
  }

  .collection-hero__media {
    top: 0;
    right: 0;
    bottom: auto;
    left: 0;

    width: 100%;
    height: 58%;
  }

  .collection-hero__image {
    object-position: center center;
  }

  .collection-hero__media-wash {
    background:
      linear-gradient(
        180deg,
        transparent 0%,
        rgb(248 245 239 / 4%) 42%,
        rgb(248 245 239 / 65%) 72%,
        #f8f5ef 100%
      );
  }

  .collection-hero__inner {
    width: calc(100% - 2rem);

    align-items: flex-end;
  }

  .collection-hero__content {
    width: 100%;

    padding-block:
      14rem
      2.25rem;
  }

  .collection-hero__title {
    font-size: clamp(
      2.75rem,
      13vw,
      4rem
    );
  }

  .collection-hero__description {
    max-width: 22rem;
  }

  .collection-hero__actions {
    align-items: stretch;
    flex-direction: column;

    gap: 0.65rem;
  }

  .collection-hero__discover {
    width: 100%;
  }

  .collection-hero__private-viewing {
    width: 100%;

    justify-content: space-between;

    padding-inline:
      0.2rem
      0.4rem;
  }
}
</style>