<template>
  <section
    class="collection-services"
    aria-label="Client service assurances"
  >
    <div class="collection-services__inner">
      <!-- Insured delivery -->
      <article class="collection-service">
        <svg
          class="collection-service__icon"
          viewBox="0 0 48 48"
          fill="none"
          aria-hidden="true"
        >
          <rect
            x="10"
            y="13"
            width="28"
            height="27"
            rx="1.5"
          />

          <path d="M16 13V8h16v5" />

          <path
            d="m24 18 7 3v5.5c0 4.7-2.9 8.2-7 10.5-4.1-2.3-7-5.8-7-10.5V21z"
          />

          <path d="m21 27 2 2 4-5" />
        </svg>

        <div class="collection-service__copy">
          <h2 class="collection-service__title">
            Insured delivery
          </h2>

          <p class="collection-service__description">
            Worldwide, discreet<br>
            and fully insured.
          </p>
        </div>
      </article>

      <!-- Secure payment -->
      <article class="collection-service">
        <div
          class="collection-service__stripe"
          aria-label="Stripe"
        >
          stripe
        </div>

        <div class="collection-service__copy">
          <h2 class="collection-service__title">
            Secure payment
          </h2>

          <p class="collection-service__description">
            Protected by Stripe<br>
            and industry standards.
          </p>
        </div>
      </article>

      <!-- Certificate -->
      <article class="collection-service">
        <svg
          class="collection-service__icon"
          viewBox="0 0 48 48"
          fill="none"
          aria-hidden="true"
        >
          <path d="M14 5h16l5 5v32H14z" />
          <path d="M30 5v7h5" />

          <path
            d="M28.5 18.5c-1-1.1-2.4-1.7-4.1-1.7-2.5 0-4.2 1.3-4.2 3.3 0 2.1 1.7 3 4.2 3.6 2.6.7 4.1 1.5 4.1 3.6 0 2.2-1.8 3.7-4.5 3.7-2 0-3.7-.7-4.8-2.1"
          />

          <path d="M24 14v3" />
          <path d="M24 31v3" />
        </svg>

        <div class="collection-service__copy">
          <h2 class="collection-service__title">
            Certificate included
          </h2>

          <p class="collection-service__description">
            IGI or GIA certified<br>
            with every piece.
          </p>
        </div>
      </article>

      <!-- Returns -->
      <article class="collection-service">
        <svg
          class="collection-service__icon"
          viewBox="0 0 48 48"
          fill="none"
          aria-hidden="true"
        >
          <path d="M11 12h26v28H11z" />
          <path d="M17 12V7h14v5" />

          <path
            d="M31.5 25a7.5 7.5 0 1 1-2.2-5.3"
          />

          <path d="M31.5 18v7h-7" />
        </svg>

        <div class="collection-service__copy">
          <h2 class="collection-service__title">
            30-day returns
          </h2>

          <p class="collection-service__description">
            Peace of mind with our<br>
            hassle-free returns.
          </p>
        </div>
      </article>

      <!-- Aftercare -->
      <article class="collection-service">
        <svg
          class="collection-service__icon"
          viewBox="0 0 48 48"
          fill="none"
          aria-hidden="true"
        >
          <circle
            cx="24"
            cy="15"
            r="7"
          />

          <path
            d="M9 42c1.1-8.7 5.7-13.5 13.2-14.5"
          />

          <path
            d="M39 42c-.9-6.9-4-11.2-9.3-13"
          />

          <path
            d="M36.5 28.5c-3-2.9-8-.8-8 3.4 0 4.7 8 9.5 8 9.5s8-4.8 8-9.5c0-4.2-5-6.3-8-3.4Z"
          />
        </svg>

        <div class="collection-service__copy">
          <h2 class="collection-service__title">
            Lifetime aftercare
          </h2>

          <p class="collection-service__description">
            Complimentary care<br>
            for life.
          </p>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.collection-services {
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

.collection-services__inner {
  display: grid;
  grid-template-columns:
    repeat(5, minmax(0, 1fr));

  width: min(
    calc(100% - (2 * var(--page-gutter))),
    var(--container-wide)
  );

  min-height: 6.5rem;

  align-items: center;

  margin-inline: auto;

  padding-block:
    1rem
    1.05rem;
}

.collection-service {
  position: relative;

  display: grid;
  grid-template-columns:
    2.35rem
    minmax(0, 1fr);

  min-width: 0;

  align-items: center;

  gap: 0.85rem;

  padding-inline:
    clamp(1rem, 2vw, 1.8rem);
}

.collection-service:first-child {
  padding-left: 0;
}

.collection-service:last-child {
  padding-right: 0;
}

.collection-service:not(:first-child)::before {
  content: '';

  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;

  width: 1px;

  background:
    rgb(25 23 19 / 15%);
}

.collection-service__icon {
  display: block;

  width: 2.15rem;
  height: 2.15rem;

  color: #282621;

  stroke: currentColor;
  stroke-width: 1.15;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.collection-service__stripe {
  color: #11110f;

  font-family:
    Arial,
    Helvetica,
    sans-serif;
  font-size: 1rem;
  font-weight: 700;

  line-height: 1;
  letter-spacing: -0.06em;

  text-transform: lowercase;
}

.collection-service__copy {
  min-width: 0;
}

.collection-service__title {
  margin: 0;

  font-family: var(--font-interface);
  font-size: 0.5rem;
  font-weight: 600;

  line-height: 1.25;
  letter-spacing: 0.04em;

  text-transform: uppercase;
}

.collection-service__description {
  margin:
    0.35rem
    0
    0;

  color:
    rgb(25 23 19 / 68%);

  font-family: var(--font-interface);
  font-size: 0.47rem;
  font-weight: 400;

  line-height: 1.55;
}

@media (max-width: 1050px) {
  .collection-services__inner {
    grid-template-columns:
      repeat(3, minmax(0, 1fr));

    row-gap: 1.5rem;

    padding-block: 1.4rem;
  }

  .collection-service:nth-child(4)::before {
    display: none;
  }

  .collection-service:nth-child(n + 4)::after {
    content: '';

    position: absolute;
    top: -0.75rem;
    right: 1rem;
    left: 1rem;

    height: 1px;

    background:
      rgb(25 23 19 / 11%);
  }
}

@media (max-width: 700px) {
  .collection-services__inner {
    grid-template-columns:
      repeat(2, minmax(0, 1fr));

    width: calc(100% - 2rem);
  }

  .collection-service {
    padding-inline: 1rem;
  }

  .collection-service:nth-child(odd) {
    padding-left: 0;
  }

  .collection-service:nth-child(odd)::before {
    display: none;
  }

  .collection-service:nth-child(n + 3)::after {
    content: '';

    position: absolute;
    top: -0.75rem;
    right: 0.5rem;
    left: 0.5rem;

    height: 1px;

    background:
      rgb(25 23 19 / 11%);
  }
}

@media (max-width: 500px) {
  .collection-services__inner {
    grid-template-columns: 1fr;

    row-gap: 0;

    padding-block: 0.25rem;
  }

  .collection-service,
  .collection-service:first-child,
  .collection-service:last-child,
  .collection-service:nth-child(odd) {
    grid-template-columns:
      2.75rem
      minmax(0, 1fr);

    min-height: 5rem;

    padding:
      1rem
      0;
  }

  .collection-service:not(:first-child)::before {
    display: block;

    top: 0;
    right: 0;
    bottom: auto;
    left: 0;

    width: auto;
    height: 1px;
  }

  .collection-service:nth-child(n + 3)::after,
  .collection-service:nth-child(n + 4)::after {
    display: none;
  }

  .collection-service__icon {
    width: 2.25rem;
    height: 2.25rem;
  }

  .collection-service__stripe {
    font-size: 1.1rem;
  }

  .collection-service__title {
    font-size: 0.55rem;
  }

  .collection-service__description {
    font-size: 0.52rem;
  }

  .collection-service__description br {
    display: none;
  }
}
</style>
