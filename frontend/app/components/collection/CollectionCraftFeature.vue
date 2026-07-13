<script setup lang="ts">
import BaseTextLink from '../base/BaseTextLink.vue';
</script>

<template>
  <section
    id="craft"
    class="collection-craft"
    aria-labelledby="collection-craft-title"
  >
    <div class="collection-craft__inner">
      <div class="collection-craft__media">
        <img
          class="collection-craft__image"
          src="/images/collection/craft/craft-bg.webp"
          alt="Master jeweller working carefully on a diamond ring."
          width="1600"
          height="1000"
          loading="lazy"
          decoding="async"
        >

        <span
          class="collection-craft__media-overlay"
          aria-hidden="true"
        />
      </div>

      <div class="collection-craft__content">
        <p class="collection-craft__eyebrow">
          Our craft
        </p>

        <h2
          id="collection-craft-title"
          class="collection-craft__title"
        >
          Beauty. Crafted to last.
        </h2>

        <p class="collection-craft__description">
          Every piece is brought to life by master artisans who honour
          time-honoured techniques and uncompromising standards.
        </p>

        <BaseTextLink
          to="/#craft-pillars"
          tone="dark"
          arrow="right"
          class="collection-craft__link"
        >
          Discover our craft
        </BaseTextLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.collection-craft {
  width: 100%;

  padding-block:
    0.85rem
    1rem;

  background:
    linear-gradient(
      90deg,
      #faf8f4 0%,
      #f7f3ed 50%,
      #faf8f4 100%
    );

  color: #f7f3ec;
}

.collection-craft__inner {
  display: grid;
  grid-template-columns:
    minmax(0, 46%)
    minmax(0, 54%);

  width: min(
    calc(100% - (2 * var(--page-gutter))),
    var(--container-wide)
  );

  height: clamp(
    9.75rem,
    13vw,
    11.5rem
  );

  margin-inline: auto;

  overflow: hidden;

  border-radius: 0.1rem;

  background: #0b0b0a;
}

/* =========================================================
   IMAGE PANEL
   ========================================================= */

.collection-craft__media {
  position: relative;

  min-width: 0;
  height: 100%;

  overflow: hidden;

  background: #17110d;
}

.collection-craft__image {
  position: absolute;

  top: -17%;
  left: -2%;

  display: block;

  width: 132%;
  height: 134%;

  max-width: none;

  object-fit: cover;
  object-position: left center;

  transform: scale(1.02);
  transform-origin: left center;

  transition:
    transform 800ms
    cubic-bezier(0.22, 1, 0.36, 1);
}

/*
 * Softens the seam where the photograph meets
 * the black editorial panel.
 */
.collection-craft__media-overlay {
  position: absolute;
  inset: 0;

  background:
    linear-gradient(
      90deg,
      rgb(0 0 0 / 4%) 0%,
      transparent 50%,
      rgb(0 0 0 / 15%) 78%,
      rgb(7 7 6 / 68%) 100%
    ),
    linear-gradient(
      180deg,
      rgb(0 0 0 / 5%) 0%,
      rgb(0 0 0 / 12%) 100%
    );

  pointer-events: none;
}

.collection-craft__inner:hover
.collection-craft__image {
  transform: scale(1.055);
}

/* =========================================================
   EDITORIAL CONTENT
   ========================================================= */

.collection-craft__content {
  display: flex;
  flex-direction: column;

  min-width: 0;

  justify-content: center;

  padding:
    1.35rem
    clamp(2rem, 4vw, 3.8rem);

  background:
    radial-gradient(
      circle at 0% 50%,
      rgb(255 255 255 / 3%),
      transparent 42%
    ),
    linear-gradient(
      90deg,
      #0d0d0c 0%,
      #080807 100%
    );
}

.collection-craft__eyebrow {
  margin: 0;

  color: #b78e4e;

  font-family: var(--font-interface);
  font-size: 0.5rem;
  font-weight: 600;

  line-height: 1;
  letter-spacing: 0.095em;

  text-transform: uppercase;
}

.collection-craft__title {
  margin:
    0.5rem
    0
    0;

  color: #f5f0e8;

  font-family: var(--font-display);
  font-size: clamp(
    1.45rem,
    2vw,
    1.9rem
  );
  font-weight: 500;

  line-height: 1;
  letter-spacing: 0.035em;

  text-transform: uppercase;
}

.collection-craft__description {
  max-width: 31rem;

  margin:
    0.75rem
    0
    0;

  color:
    rgb(245 240 232 / 75%);

  font-family: var(--font-interface);
  font-size: 0.58rem;
  font-weight: 400;

  line-height: 1.65;
}

.collection-craft__link {
  width: fit-content;
  min-height: 1.8rem;

  margin-top: 0.65rem;

  border-bottom: 0;

  color: #f5f0e8;

  font-size: 0.52rem;
  font-weight: 600;

  letter-spacing: 0.08em;
}

.collection-craft__link:hover {
  border-bottom: 0;
}

/* =========================================================
   TABLET
   ========================================================= */

@media (max-width: 900px) {
  .collection-craft__inner {
    grid-template-columns:
      minmax(0, 45%)
      minmax(0, 55%);

    height: 12rem;
  }

  .collection-craft__image {
    top: -10%;
    left: -5%;

    width: 142%;
    height: 120%;
  }

  .collection-craft__content {
    padding:
      1.35rem
      2rem;
  }

  .collection-craft__title {
    font-size: 1.45rem;
  }

  .collection-craft__description {
    font-size: 0.56rem;
  }
}

/* =========================================================
   MOBILE
   ========================================================= */

@media (max-width: 680px) {
  .collection-craft {
    padding-block:
      0.75rem
      1rem;
  }

  .collection-craft__inner {
    grid-template-columns: 1fr;

    width: calc(100% - 2rem);
    height: auto;
  }

  .collection-craft__media {
    min-height: 15rem;
  }

  .collection-craft__image {
    top: -10%;
    left: -3%;

    width: 135%;
    height: 125%;

    object-position: left center;
  }

  .collection-craft__media-overlay {
    background:
      linear-gradient(
        180deg,
        transparent 40%,
        rgb(5 5 4 / 38%) 100%
      );
  }

  .collection-craft__content {
    min-height: 12.5rem;

    padding:
      1.65rem
      1.5rem
      1.8rem;
  }

  .collection-craft__title {
    font-size: 1.65rem;
  }

  .collection-craft__description {
    max-width: 28rem;

    font-size: 0.62rem;
  }
}
</style>