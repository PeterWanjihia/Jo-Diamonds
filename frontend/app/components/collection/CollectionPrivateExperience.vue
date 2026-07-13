<script setup lang="ts">
import BaseButton from '../base/BaseButton.vue';

const conciergeUrl =
  `mailto:concierge@jodiamonds.store?subject=${encodeURIComponent(
    'Private viewing or bespoke commission',
  )}`;
</script>

<template>
  <section
    id="private-experience"
    class="private-experience"
    aria-labelledby="private-experience-title"
  >
    <div class="private-experience__inner">
      <div
        class="private-experience__icon"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 48 48"
          fill="none"
        >
          <circle
            cx="24"
            cy="24"
            r="18.5"
          />

          <path
            d="m15 18 4.5 5 4.5-8 4.5 8 4.5-5-2 12H17z"
          />

          <path d="M18 33h12" />
        </svg>
      </div>

      <div class="private-experience__copy">
        <h2
          id="private-experience-title"
          class="private-experience__title"
        >
          A private experience, tailored to you
        </h2>

        <p class="private-experience__description">
          Arrange a private viewing or speak to our concierge
          about a bespoke commission.
        </p>
      </div>

      <BaseButton
        :href="conciergeUrl"
        variant="solid"
        tone="light"
        size="compact"
        class="private-experience__button"
      >
        <span>Speak to a concierge</span>

        <svg
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path d="M4 12h15" />
          <path d="m14 7 5 5-5 5" />
        </svg>
      </BaseButton>
    </div>
  </section>
</template>

<style scoped>
.private-experience {
  width: 100%;

  border-bottom:
    1px solid
    rgb(25 23 19 / 12%);

  background:
    linear-gradient(
      90deg,
      #faf8f4 0%,
      #f6f2eb 50%,
      #faf8f4 100%
    );

  color: #191713;
}

.private-experience__inner {
  display: grid;
  grid-template-columns:
    2.6rem
    minmax(0, 1fr)
    auto;

  width: min(
    calc(100% - (2 * var(--page-gutter))),
    var(--container-wide)
  );

  min-height: 5.7rem;

  align-items: center;

  gap: 1rem;

  margin-inline: auto;

  padding-block:
    0.85rem
    0.9rem;
}

.private-experience__icon {
  display: grid;

  width: 2.5rem;
  height: 2.5rem;

  place-items: center;

  color: #25231f;
}

.private-experience__icon svg {
  width: 100%;
  height: 100%;

  stroke: currentColor;
  stroke-width: 1.15;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.private-experience__copy {
  min-width: 0;
}

.private-experience__title {
  margin: 0;

  font-family: var(--font-display);
  font-size: clamp(
    0.95rem,
    1.35vw,
    1.2rem
  );
  font-weight: 500;

  line-height: 1.1;
  letter-spacing: 0.045em;

  text-transform: uppercase;
}

.private-experience__description {
  margin:
    0.35rem
    0
    0;

  color:
    rgb(25 23 19 / 68%);

  font-family: var(--font-interface);
  font-size: 0.53rem;
  font-weight: 400;

  line-height: 1.45;
}

.private-experience__button {
  min-width: 12rem;
  min-height: 2.5rem;
}

.private-experience__button :deep(.base-button__content) {
  gap: 0.9rem;
}

.private-experience__button svg {
  width: 1rem;
  height: 1rem;

  flex: 0 0 auto;

  stroke: currentColor;
  stroke-width: 1.25;
  stroke-linecap: round;
  stroke-linejoin: round;
}

@media (max-width: 760px) {
  .private-experience__inner {
    grid-template-columns:
      2.5rem
      minmax(0, 1fr);

    row-gap: 1rem;

    padding-block:
      1.25rem
      1.35rem;
  }

  .private-experience__button {
    grid-column: 2;

    width: fit-content;
  }
}

@media (max-width: 560px) {
  .private-experience__inner {
    grid-template-columns: 1fr;

    width: calc(100% - 2rem);

    gap: 0.85rem;
  }

  .private-experience__icon {
    width: 2.4rem;
    height: 2.4rem;
  }

  .private-experience__title {
    font-size: 1.1rem;
  }

  .private-experience__description {
    max-width: 28rem;

    font-size: 0.58rem;
  }

  .private-experience__button {
    grid-column: auto;

    width: 100%;
  }
}
</style>
