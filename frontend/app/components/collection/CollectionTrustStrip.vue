<template>
  <section
    class="collection-trust"
    aria-label="Collection assurances"
  >
    <div class="collection-trust__inner">
      <!-- Exceptional stones -->
      <article class="collection-trust__item">
        <svg
          class="collection-trust__icon"
          viewBox="0 0 48 48"
          fill="none"
          aria-hidden="true"
        >
          <path d="M8 17 16.5 6.5h15L40 17 24 42Z" />

          <path d="M8 17h32" />

          <path d="m16.5 6.5 5 10.5L24 6.5 29 17l2.5-10.5" />

          <path d="M16 17 24 42l8-25" />

          <path d="m21.5 17 2.5 25L27.5 17" />
        </svg>

        <div class="collection-trust__copy">
          <h2 class="collection-trust__title">
            Exceptional stones
          </h2>

          <p class="collection-trust__description">
            Hand-selected for rare beauty<br>
            and brilliance.
          </p>
        </div>
      </article>

      <!-- Certified and traceable -->
      <article class="collection-trust__item">
        <svg
          class="collection-trust__icon"
          viewBox="0 0 48 48"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M24 4.5 37 11v10.5c0 9.2-5.7 16.2-13 21.5-7.3-5.3-13-12.3-13-21.5V11Z"
          />

          <path
            d="M29.5 15.5c-1.2-1.4-3-2.2-5.2-2.2-3.2 0-5.5 1.7-5.5 4.3 0 2.7 2.1 3.8 5.4 4.7 3.3.8 5.2 1.8 5.2 4.5 0 2.8-2.4 4.8-5.8 4.8-2.5 0-4.7-.9-6.1-2.7"
          />

          <path d="M24 10.5v3" />
          <path d="M24 31.5v3" />
        </svg>

        <div class="collection-trust__copy">
          <h2 class="collection-trust__title">
            Certified &amp; traceable
          </h2>

          <p class="collection-trust__description">
            Documented by leading<br>
            gemmological authorities.
          </p>
        </div>
      </article>

      <!-- Insured delivery -->
      <article class="collection-trust__item">
        <svg
          class="collection-trust__icon collection-trust__icon--delivery"
          viewBox="0 0 48 48"
          fill="none"
          aria-hidden="true"
        >
          <!-- Wide outer parcel -->
          <rect
            x="6"
            y="15"
            width="36"
            height="22"
            rx="1.5"
          />

          <!-- Central vertical secured case -->
          <rect
            x="15"
            y="7"
            width="18"
            height="34"
            rx="5"
          />

          <path d="M18 13h12" />
          <path d="M18 35h12" />

          <!-- Small secured parcel -->
          <path
            d="M20 24h8v8h-8z"
          />

          <path
            d="M21.5 24v-2a2.5 2.5 0 0 1 5 0v2"
          />

          <path d="M24 27v2.5" />
        </svg>

        <div class="collection-trust__copy">
          <h2 class="collection-trust__title">
            Insured delivery
          </h2>

          <p class="collection-trust__description">
            Secure, discreet and fully<br>
            insured worldwide.
          </p>
        </div>
      </article>

      <!-- Private concierge -->
      <article class="collection-trust__item">
        <svg
          class="collection-trust__icon collection-trust__icon--concierge"
          viewBox="0 0 48 48"
          fill="none"
          aria-hidden="true"
        >
          <!-- Head -->
          <path
            d="M16.5 15.5c0-5 3.1-8.5 7.5-8.5s7.5 3.5 7.5 8.5v3.2c0 5.1-3.1 8.8-7.5 8.8s-7.5-3.7-7.5-8.8Z"
          />

          <!-- Earpieces -->
          <path
            d="M16.5 15.5h-1.2a3 3 0 0 0 0 6h1.5"
          />

          <path
            d="M31.5 15.5h1.2a3 3 0 0 1 0 6h-1.5"
          />

          <!-- Neck -->
          <path d="M20 27v3.5" />
          <path d="M28 27v3.5" />

          <!-- Shoulders -->
          <path
            d="M8 43v-3.3c0-5.2 4-8.3 11.7-9.4L24 34l4.3-3.7C36 31.4 40 34.5 40 39.7V43"
          />
        </svg>

        <div class="collection-trust__copy">
          <h2 class="collection-trust__title">
            Private concierge
          </h2>

          <p class="collection-trust__description">
            Personal guidance and<br>
            lifetime aftercare.
          </p>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.collection-trust {
  width: 100%;

  border-top:
    1px solid
    rgb(28 25 21 / 10%);

  border-bottom:
    1px solid
    rgb(28 25 21 / 13%);

  background:
    linear-gradient(
      90deg,
      #faf8f4 0%,
      #f6f2eb 48%,
      #faf8f4 100%
    );

  color: #171612;
}

.collection-trust__inner {
  display: grid;
  grid-template-columns:
    repeat(4, minmax(0, 1fr));

  width: min(
    calc(100% - (2 * var(--page-gutter))),
    var(--container-wide)
  );

  min-height: 6.75rem;

  align-items: center;

  margin-inline: auto;
}

.collection-trust__item {
  position: relative;

  display: grid;
  grid-template-columns:
    2.5rem
    minmax(0, 1fr);

  min-width: 0;

  align-items: center;

  gap: 0.9rem;

  padding-inline:
    clamp(1.25rem, 2.4vw, 2.4rem);
}

.collection-trust__item:first-child {
  padding-left: 0;
}

.collection-trust__item:last-child {
  padding-right: 0;
}

.collection-trust__item:not(:first-child)::before {
  content: '';

  position: absolute;
  top: 0.15rem;
  bottom: 0.15rem;
  left: 0;

  width: 1px;

  background:
    rgb(23 22 18 / 14%);
}

.collection-trust__icon {
  display: block;

  width: 2.25rem;
  height: 2.25rem;

  flex: 0 0 auto;

  color: #22211d;

  stroke: currentColor;
  stroke-width: 1.3;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.collection-trust__icon--delivery {
  width: 2.45rem;
  height: 2.45rem;
}

.collection-trust__icon--concierge {
  width: 2.35rem;
  height: 2.35rem;
}

.collection-trust__copy {
  min-width: 0;
}

.collection-trust__title {
  margin: 0;

  color: #171612;

  font-family: var(--font-interface);
  font-size: 0.56rem;
  font-weight: 600;

  line-height: 1.2;
  letter-spacing: 0.045em;

  text-transform: uppercase;
}

.collection-trust__description {
  margin:
    0.35rem
    0
    0;

  color:
    rgb(23 22 18 / 72%);

  font-family: var(--font-interface);
  font-size: 0.5rem;
  font-weight: 400;

  line-height: 1.55;
}

/* Medium desktop */

@media (max-width: 1100px) {
  .collection-trust__item {
    grid-template-columns:
      2.2rem
      minmax(0, 1fr);

    gap: 0.7rem;

    padding-inline: 1rem;
  }

  .collection-trust__icon {
    width: 2rem;
    height: 2rem;
  }

  .collection-trust__title {
    font-size: 0.52rem;
  }

  .collection-trust__description {
    font-size: 0.47rem;
  }
}

/* Tablet */

@media (max-width: 850px) {
  .collection-trust__inner {
    grid-template-columns:
      repeat(2, minmax(0, 1fr));

    min-height: 0;

    padding-block: 0.75rem;
  }

  .collection-trust__item {
    min-height: 5.5rem;

    padding-inline: 1.5rem;
  }

  .collection-trust__item:first-child,
  .collection-trust__item:nth-child(3) {
    padding-left: 0;
  }

  .collection-trust__item:nth-child(3)::before {
    display: none;
  }

  .collection-trust__item:nth-child(n + 3)::after {
    content: '';

    position: absolute;
    top: 0;
    right: 1rem;
    left: 1rem;

    height: 1px;

    background:
      rgb(23 22 18 / 10%);
  }

  .collection-trust__item:nth-child(3)::after {
    left: 0;
  }

  .collection-trust__item:nth-child(4)::after {
    right: 0;
  }
}

/* Mobile */

@media (max-width: 580px) {
  .collection-trust__inner {
    grid-template-columns: 1fr;

    width: calc(100% - 2rem);

    padding-block: 0.25rem;
  }

  .collection-trust__item,
  .collection-trust__item:first-child,
  .collection-trust__item:nth-child(3),
  .collection-trust__item:last-child {
    grid-template-columns:
      2.75rem
      minmax(0, 1fr);

    min-height: 5.25rem;

    gap: 1rem;

    padding:
      1rem
      0;
  }

  .collection-trust__item:not(:first-child)::before {
    display: block;

    top: 0;
    right: 0;
    bottom: auto;
    left: 0;

    width: auto;
    height: 1px;
  }

  .collection-trust__item:nth-child(n + 3)::after {
    display: none;
  }

  .collection-trust__icon,
  .collection-trust__icon--delivery,
  .collection-trust__icon--concierge {
    width: 2.25rem;
    height: 2.25rem;
  }

  .collection-trust__title {
    font-size: 0.58rem;
  }

  .collection-trust__description {
    font-size: 0.52rem;
  }

  .collection-trust__description br {
    display: none;
  }
}
</style>