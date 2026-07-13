<script setup lang="ts">
const currentYear = new Date().getFullYear();

const conciergeEmail =
  'concierge@jodiamonds.store';

const conciergePhoneDisplay =
  '+44 20 7123 4567';

const conciergePhoneHref =
  '+442071234567';
</script>

<template>
  <footer class="site-footer">
    <div class="site-footer__inner">
      <div class="site-footer__columns">
        <!-- Brand -->
        <section class="site-footer__brand">
          <NuxtLink
            class="site-footer__wordmark"
            to="/"
            aria-label="JO.DIAMONDS home"
          >
            JO.DIAMONDS
          </NuxtLink>

          <p class="site-footer__statement">
            Rare pieces,<br>
            chosen with intention.
          </p>

          <div
            class="site-footer__socials"
            aria-label="Social media"
          >
            <!-- Instagram -->
            <span
              class="site-footer__social"
              aria-label="Instagram"
              role="img"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <rect
                  x="4"
                  y="4"
                  width="16"
                  height="16"
                  rx="4"
                />

                <circle
                  cx="12"
                  cy="12"
                  r="3.5"
                />

                <circle
                  cx="17.5"
                  cy="6.5"
                  r="0.75"
                  fill="currentColor"
                  stroke="none"
                />
              </svg>
            </span>

            <!-- Pinterest -->
            <span
              class="site-footer__social"
              aria-label="Pinterest"
              role="img"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="8"
                />

                <path
                  d="M9.5 18.5c1-3.4 1.4-5.2 2-8.1-.8-1.6.1-4.3 2.1-4.3 1.7 0 2.6 1.2 2.6 2.8 0 2.3-1.5 4.1-3.4 4.1-1 0-1.7-.8-1.5-1.8"
                />
              </svg>
            </span>

            <!-- Facebook -->
            <span
              class="site-footer__social"
              aria-label="Facebook"
              role="img"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="8"
                />

                <path
                  d="M13.5 19v-6h2l.4-2.5h-2.4V9c0-.8.3-1.5 1.6-1.5H16V5.3c-.4-.1-1.2-.2-2-.2-2 0-3.3 1.2-3.3 3.5v1.9H9V13h1.7v6"
                />
              </svg>
            </span>

            <!-- YouTube -->
            <span
              class="site-footer__social"
              aria-label="YouTube"
              role="img"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <rect
                  x="3"
                  y="6"
                  width="18"
                  height="12"
                  rx="3"
                />

                <path d="m10 9 5 3-5 3z" />
              </svg>
            </span>

            <!-- Email -->
            <a
              class="site-footer__social"
              :href="`mailto:${conciergeEmail}`"
              aria-label="Email JO.DIAMONDS"
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
            </a>
          </div>
        </section>

        <!-- Collection -->
        <section class="site-footer__column">
          <h2 class="site-footer__heading">
            Collection
          </h2>

          <ul class="site-footer__links">
            <li>
              <a href="#collections">Rings</a>
            </li>

            <li>
              <a href="#collections">Earrings</a>
            </li>

            <li>
              <a href="#collections">Necklaces</a>
            </li>

            <li>
              <a href="#collections">Bracelets</a>
            </li>

            <li>
              <a href="#collections">One-of-One</a>
            </li>
          </ul>
        </section>

        <!-- Client services -->
        <section class="site-footer__column">
          <h2 class="site-footer__heading">
            Client services
          </h2>

          <ul class="site-footer__links">
            <li><span>Delivery</span></li>
            <li><span>Returns &amp; Exchanges</span></li>
            <li><span>Sizing Guide</span></li>
            <li><span>Jewellery Care</span></li>
            <li>
              <a href="#private-assistance">
                Warranty
              </a>
            </li>
          </ul>
        </section>

        <!-- The house -->
        <section class="site-footer__column">
          <h2 class="site-footer__heading">
            The house
          </h2>

          <ul class="site-footer__links">
            <li>
              <a href="#craft">Our Craft</a>
            </li>

            <li><span>Sourcing</span></li>
            <li><span>Journal</span></li>

            <li>
              <a href="#private-assistance">
                Private Viewing
              </a>
            </li>
          </ul>
        </section>

        <!-- Contact -->
        <section class="site-footer__column">
          <h2 class="site-footer__heading">
            Contact
          </h2>

          <ul class="site-footer__links">
            <li>
              <a :href="`mailto:${conciergeEmail}`">
                Email
              </a>
            </li>

            <li>
              <a :href="`tel:${conciergePhoneHref}`">
                Telephone
              </a>
            </li>

            <li><span>WhatsApp</span></li>
            <li><span>Instagram</span></li>
          </ul>
        </section>

        <!-- Payment methods -->
        <section class="site-footer__column site-footer__payments">
          <h2 class="site-footer__heading">
            Payment methods
          </h2>

          <div class="site-footer__payment-logos">
            <span class="payment-logo payment-logo--visa">
              VISA
            </span>

            <span
              class="payment-logo payment-logo--mastercard"
              aria-label="Mastercard"
            >
              <span />
              <span />
            </span>

            <span class="payment-logo payment-logo--apple">
              <svg
                viewBox="0 0 20 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  d="M13.6 4.1c1-1.1 1.7-2.7 1.5-4.1-1.5.1-3.1 1-4.1 2.1-.9 1-1.7 2.6-1.4 4 1.5.1 3-.8 4-2Z"
                />

                <path
                  d="M17.7 12.8c0-3.1 2.5-4.6 2.6-4.7-1.4-2.1-3.7-2.3-4.5-2.3-1.9-.2-3.7 1.1-4.7 1.1-1 0-2.5-1.1-4.2-1-2.1 0-4.1 1.2-5.2 3.1-2.2 3.9-.6 9.6 1.6 12.7 1 1.5 2.3 3.2 3.9 3.1 1.6-.1 2.2-1 4.1-1s2.5 1 4.2 1c1.7 0 2.8-1.5 3.8-3 1.2-1.7 1.7-3.4 1.7-3.5-.1 0-3.3-1.3-3.3-5.5Z"
                />
              </svg>

              <span>Pay</span>
            </span>
          </div>

          <p class="site-footer__stripe-note">
            Powered by Stripe
          </p>
        </section>

        <!-- Delivery -->
        <section class="site-footer__column">
          <h2 class="site-footer__heading">
            Delivery
          </h2>

          <p class="site-footer__delivery-copy">
            Insured international<br>
            delivery
          </p>
        </section>
      </div>

      <div class="site-footer__bottom">
        <p>
          © {{ currentYear }} JO.DIAMONDS
        </p>

        <nav
          class="site-footer__legal"
          aria-label="Legal"
        >
          <span>Privacy Policy</span>
          <span>Terms &amp; Conditions</span>
          <span>Cookies</span>
          <span>Accessibility</span>
        </nav>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  background:
    radial-gradient(
      circle at 50% 0%,
      rgb(255 255 255 / 4%),
      transparent 55%
    ),
    linear-gradient(
      90deg,
      #11110f,
      #0b0b0a 50%,
      #11110f
    );

  color: #f3efe7;
}

.site-footer__inner {
  width: min(
    calc(100% - (2 * var(--page-gutter))),
    var(--container-wide)
  );

  margin-inline: auto;

  padding:
    1.75rem
    0
    1rem;
}

.site-footer__columns {
  display: grid;
  grid-template-columns:
    1.45fr
    0.8fr
    1fr
    0.8fr
    0.7fr
    1.15fr
    0.7fr;

  gap: clamp(
    1.5rem,
    3vw,
    3rem
  );
}

.site-footer__brand,
.site-footer__column {
  min-width: 0;
}

.site-footer__wordmark {
  display: inline-block;

  font-family: var(--font-display);
  font-size: 1.35rem;
  font-weight: 500;

  line-height: 1;
  letter-spacing: 0.035em;
}

.site-footer__statement {
  margin: 0.9rem 0 0;

  color: rgb(243 239 231 / 69%);

  font-family: var(--font-interface);
  font-size: 0.56rem;

  line-height: 1.55;
}

.site-footer__socials {
  display: flex;
  align-items: center;

  gap: 0.75rem;

  margin-top: 0.8rem;
}

.site-footer__social {
  display: grid;

  width: 1rem;
  height: 1rem;

  place-items: center;

  color: rgb(243 239 231 / 76%);
}

.site-footer__social svg {
  width: 100%;
  height: 100%;

  stroke: currentColor;
  stroke-width: 1.3;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.site-footer__heading {
  margin: 0 0 0.7rem;

  color: rgb(243 239 231 / 91%);

  font-family: var(--font-interface);
  font-size: 0.52rem;
  font-weight: 600;

  line-height: 1;
  letter-spacing: 0.085em;

  text-transform: uppercase;
}

.site-footer__links {
  display: grid;
  gap: 0.35rem;

  margin: 0;
  padding: 0;

  list-style: none;
}

.site-footer__links a,
.site-footer__links span,
.site-footer__delivery-copy {
  color: rgb(243 239 231 / 67%);

  font-family: var(--font-interface);
  font-size: 0.52rem;
  font-weight: 400;

  line-height: 1.3;
}

.site-footer__links a {
  transition:
    color 180ms ease;
}

.site-footer__links a:hover {
  color: #c8a264;
}

.site-footer__delivery-copy {
  margin: 0;

  line-height: 1.5;
}

.site-footer__payment-logos {
  display: flex;
  align-items: center;

  gap: 0.35rem;
}

.payment-logo {
  display: inline-flex;

  height: 1.55rem;

  align-items: center;
  justify-content: center;

  border:
    1px solid
    rgb(255 255 255 / 35%);

  border-radius: 0.2rem;

  background: #171715;

  color: #fff;
}

.payment-logo--visa {
  width: 2.75rem;

  font-family: Arial, sans-serif;
  font-size: 0.75rem;
  font-weight: 700;

  font-style: italic;
}

.payment-logo--mastercard {
  position: relative;

  width: 2.75rem;
}

.payment-logo--mastercard span {
  position: absolute;

  width: 1.1rem;
  height: 1.1rem;

  border-radius: 50%;
}

.payment-logo--mastercard span:first-child {
  left: 0.55rem;

  background: #e1261c;
}

.payment-logo--mastercard span:last-child {
  right: 0.55rem;

  background:
    rgb(243 155 21 / 88%);
}

.payment-logo--apple {
  width: 3rem;

  gap: 0.2rem;

  font-family: Arial, sans-serif;
  font-size: 0.62rem;
  font-weight: 600;
}

.payment-logo--apple svg {
  width: 0.75rem;
  height: 0.9rem;
}

.site-footer__stripe-note {
  margin: 0.45rem 0 0;

  color: rgb(243 239 231 / 52%);

  font-family: var(--font-interface);
  font-size: 0.46rem;
}

.site-footer__bottom {
  display: flex;
  align-items: center;
  justify-content: center;

  gap: 1.5rem;

  margin-top: 1.35rem;

  color: rgb(243 239 231 / 56%);

  font-family: var(--font-interface);
  font-size: 0.45rem;
}

.site-footer__bottom p {
  margin: 0;
}

.site-footer__legal {
  display: flex;
  align-items: center;

  gap: 1rem;
}

/* Tablet */

@media (max-width: 1100px) {
  .site-footer__columns {
    grid-template-columns:
      repeat(4, minmax(0, 1fr));

    row-gap: 2.25rem;
  }
}

@media (max-width: 760px) {
  .site-footer__columns {
    grid-template-columns:
      repeat(2, minmax(0, 1fr));
  }

  .site-footer__brand {
    grid-column: 1 / -1;
  }

  .site-footer__bottom {
    align-items: flex-start;
    flex-direction: column;

    gap: 0.75rem;
  }

  .site-footer__legal {
    flex-wrap: wrap;
  }
}

/* Mobile */

@media (max-width: 480px) {
  .site-footer__inner {
    width: calc(100% - 2rem);

    padding-top: 2rem;
  }

  .site-footer__columns {
    grid-template-columns: 1fr;

    gap: 2rem;
  }

  .site-footer__brand {
    grid-column: auto;
  }
}
</style>
