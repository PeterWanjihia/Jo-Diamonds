<script setup lang="ts">
import BaseButton from '../base/BaseButton.vue';

/*
 * Replace these placeholders with the final business
 * telephone number before production launch.
 */
const conciergeEmail =
  'concierge@jodiamonds.store';

const conciergePhoneDisplay =
  '+44 20 7123 4567';

const conciergePhoneHref =
  '+442071234567';

const specialistEmailUrl =
  `mailto:${conciergeEmail}?subject=${encodeURIComponent(
    'Private client assistance',
  )}`;

const appointmentEmailUrl =
  `mailto:${conciergeEmail}?subject=${encodeURIComponent(
    'Private appointment request',
  )}`;
</script>

<template>
  <section
    id="private-assistance"
    class="private-assistance"
    aria-labelledby="private-assistance-title"
  >
    <img
      class="private-assistance__image"
      src="/images/showroom/private-assistance/private-client-assistance.webp"
      alt=""
      width="2048"
      height="682"
      loading="lazy"
      decoding="async"
    >

    <div
      class="private-assistance__overlay"
      aria-hidden="true"
    />

    <div class="private-assistance__inner">
      <div class="private-assistance__content">
        <p class="private-assistance__eyebrow">
          Private client assistance
        </p>

        <h2
          id="private-assistance-title"
          class="private-assistance__title"
        >
          <span>A conversation as</span>
          <span>exceptional as the piece.</span>
        </h2>

        <p class="private-assistance__description">
          Our specialists are here to guide you,
          privately and personally.
        </p>

        <div class="private-assistance__actions">
          <BaseButton
            :href="specialistEmailUrl"
            variant="outline"
            tone="dark"
            size="compact"
          >
            Speak to a specialist
          </BaseButton>

          <BaseButton
            :href="appointmentEmailUrl"
            variant="outline"
            tone="dark"
            size="compact"
          >
            Book a private appointment
          </BaseButton>
        </div>
      </div>

      <address class="private-assistance__contact">
        <a
          class="private-assistance__contact-link"
          :href="`mailto:${conciergeEmail}`"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <rect
              x="3"
              y="5"
              width="18"
              height="14"
              rx="1"
            />

            <path d="m4 7 8 6 8-6" />
          </svg>

          <span>
            {{ conciergeEmail }}
          </span>
        </a>

        <a
          class="private-assistance__contact-link"
          :href="`tel:${conciergePhoneHref}`"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M7.2 3.5 10 8.2 7.9 10a15.4 15.4 0 0 0 6.1 6.1l1.8-2.1 4.7 2.8-.8 3.2c-.2.8-.9 1.4-1.8 1.4C9.4 21.4 2.6 14.6 2.6 6.1c0-.9.6-1.6 1.4-1.8z"
            />
          </svg>

          <span>
            {{ conciergePhoneDisplay }}
          </span>
        </a>
      </address>
    </div>
  </section>
</template>

<style scoped>
.private-assistance {
  position: relative;

  min-height: clamp(
    11.5rem,
    16vw,
    13.25rem
  );

  overflow: hidden;

  background: #2b211a;
  color: #f7f3ec;

  isolation: isolate;
}

.private-assistance__image {
  position: absolute;
  inset: 0;

  z-index: -3;

  display: block;

  width: 100%;
  height: 100%;

  object-fit: cover;
  object-position: center center;
}

/*
 * The source image already gives us a large empty area on
 * the left. The overlay darkens that area and protects the
 * text while leaving the hand and ring clearly visible.
 */
.private-assistance__overlay {
  position: absolute;
  inset: 0;

  z-index: -2;

  background:
    linear-gradient(
      90deg,
      rgb(22 16 12 / 88%) 0%,
      rgb(22 16 12 / 75%) 29%,
      rgb(22 16 12 / 42%) 51%,
      rgb(22 16 12 / 8%) 72%,
      rgb(22 16 12 / 18%) 100%
    ),
    linear-gradient(
      180deg,
      rgb(0 0 0 / 9%),
      rgb(0 0 0 / 21%)
    );

  pointer-events: none;
}

.private-assistance__inner {
  display: grid;
  grid-template-columns:
    minmax(0, 1fr)
    auto;

  width: min(
    calc(100% - (2 * var(--page-gutter))),
    var(--container-wide)
  );

  min-height: inherit;

  align-items: center;

  gap: 3rem;

  margin-inline: auto;

  padding-block:
    1.5rem
    1.55rem;
}

.private-assistance__content {
  width: min(
    100%,
    36rem
  );
}

.private-assistance__eyebrow {
  margin: 0;

  color: #c59a52;

  font-family: var(--font-interface);
  font-size: 0.55rem;
  font-weight: 600;

  line-height: 1;
  letter-spacing: 0.11em;

  text-transform: uppercase;
}

.private-assistance__title {
  display: flex;
  flex-direction: column;

  margin: 0.65rem 0 0;

  font-family: var(--font-display);
  font-size: clamp(
    1.8rem,
    2.7vw,
    2.7rem
  );
  font-weight: 500;

  line-height: 0.96;
  letter-spacing: 0.015em;

  text-transform: uppercase;
}

.private-assistance__title span {
  display: block;
}

.private-assistance__description {
  margin: 0.55rem 0 0;

  color: rgb(247 243 236 / 78%);

  font-family: var(--font-interface);
  font-size: 0.65rem;
  font-weight: 400;

  line-height: 1.45;
}

.private-assistance__actions {
  display: flex;
  flex-wrap: wrap;

  gap: 0.7rem;

  margin-top: 0.9rem;
}

.private-assistance__actions
:deep(.base-button) {
  min-height: 2.3rem;

  padding-inline: 1.25rem;

  border-color:
    rgb(247 243 236 / 55%);

  background:
    rgb(0 0 0 / 10%);

  font-size: 0.52rem;
  letter-spacing: 0.075em;

  backdrop-filter: blur(3px);

  transform: none;
}

.private-assistance__actions
:deep(.base-button:first-child) {
  min-width: 10.5rem;
}

.private-assistance__actions
:deep(.base-button:last-child) {
  min-width: 13rem;
}

.private-assistance__actions
:deep(.base-button:hover) {
  border-color: #f7f3ec;

  background: #f7f3ec;
  color: #18130f;

  transform: none;
}

.private-assistance__contact {
  display: grid;
  gap: 0.65rem;

  margin: 0;

  font-style: normal;
}

.private-assistance__contact-link {
  display: inline-flex;

  align-items: center;
  gap: 0.65rem;

  color: rgb(247 243 236 / 89%);

  font-family: var(--font-interface);
  font-size: 0.6rem;
  font-weight: 400;

  line-height: 1.2;

  white-space: nowrap;

  transition:
    color 180ms ease;
}

.private-assistance__contact-link:hover {
  color: #d1ab68;
}

.private-assistance__contact-link svg {
  width: 1rem;
  height: 1rem;

  flex: 0 0 auto;

  stroke: currentColor;
  stroke-width: 1.35;
  stroke-linecap: round;
  stroke-linejoin: round;
}

/* Tablet */

@media (max-width: 900px) {
  .private-assistance {
    min-height: 17rem;
  }

  .private-assistance__image {
    object-position: 62% center;
  }

  .private-assistance__overlay {
    background:
      linear-gradient(
        90deg,
        rgb(22 16 12 / 92%) 0%,
        rgb(22 16 12 / 74%) 49%,
        rgb(22 16 12 / 22%) 100%
      );
  }

  .private-assistance__inner {
    grid-template-columns: 1fr;

    align-content: center;

    gap: 1.5rem;
  }

  .private-assistance__contact {
    display: flex;
    flex-wrap: wrap;

    gap:
      0.75rem
      1.5rem;
  }
}

/* Mobile */

@media (max-width: 620px) {
  .private-assistance {
    min-height: 33rem;
  }

  .private-assistance__image {
    object-position: 69% center;
  }

  .private-assistance__overlay {
    background:
      linear-gradient(
        180deg,
        rgb(18 13 10 / 13%) 0%,
        rgb(18 13 10 / 22%) 30%,
        rgb(18 13 10 / 82%) 59%,
        rgb(18 13 10 / 97%) 100%
      );
  }

  .private-assistance__inner {
    width: calc(100% - 2rem);

    align-content: end;

    padding-block:
      10rem
      2rem;
  }

  .private-assistance__content {
    width: 100%;
  }

  .private-assistance__title {
    font-size: clamp(
      2rem,
      10vw,
      2.75rem
    );
  }

  .private-assistance__actions {
    display: grid;
    grid-template-columns: 1fr;
  }

  .private-assistance__actions
  :deep(.base-button) {
    width: 100%;
    min-width: 0;
  }

  .private-assistance__contact {
    display: grid;
  }
}
</style>
