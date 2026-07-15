<script setup lang="ts">
import StripeEmbeddedCheckout from '~/components/payment/StripeEmbeddedCheckout.vue';

const {
  paymentsEnabled,
  stripePublishableKey,
  createCheckoutSession,
  getErrorMessage,
} = usePaymentsApi();

const amount = ref('');
const reference = ref('');
const clientSecret = ref<string | null>(null);
const submissionError = ref('');
const isSubmitting = ref(false);

const paymentConfigurationAvailable = computed(
  () =>
    paymentsEnabled &&
    stripePublishableKey.startsWith('pk_'),
);

function validateAmount(value: string): string | null {
  const normalizedValue = value.trim();

  if (!/^\d+(?:\.\d{1,2})?$/.test(normalizedValue)) {
    return 'Enter a valid GBP amount with no more than two decimal places.';
  }

  const [wholePounds, fractionalPence = ''] =
    normalizedValue.split('.');

  if (!wholePounds) {
    return 'Enter a valid GBP amount with no more than two decimal places.';
  }

  const amountInPence =
    BigInt(wholePounds) * 100n +
    BigInt(fractionalPence.padEnd(2, '0'));

  if (amountInPence <= 0n) {
    return 'The payment amount must be greater than zero.';
  }

  return null;
}

async function beginPayment(): Promise<void> {
  submissionError.value = '';

  const normalizedAmount = amount.value.trim();
  const validationError =
    validateAmount(normalizedAmount);

  if (validationError) {
    submissionError.value = validationError;
    return;
  }

  if (!paymentConfigurationAvailable.value) {
    submissionError.value =
      'Private payments are not currently available.';
    return;
  }

  isSubmitting.value = true;

  try {
    const normalizedReference =
      reference.value.trim();

    const response =
      await createCheckoutSession({
        amount: normalizedAmount,

        ...(normalizedReference
          ? {
              reference:
                normalizedReference,
            }
          : {}),
      });

    clientSecret.value =
      response.clientSecret;
  } catch (error: unknown) {
    submissionError.value =
      getErrorMessage(error);
  } finally {
    isSubmitting.value = false;
  }
}

function restartPayment(): void {
  clientSecret.value = null;
  submissionError.value = '';
}

function handleCheckoutError(
  message: string,
): void {
  submissionError.value = message;
}

useHead({
  title: 'Private Payment',
});

useSeoMeta({
  description:
    'Make a secure private payment to JO.DIAMONDS through Stripe.',
});
</script>

<template>
  <main class="payment-page">
    <section class="payment-page__intro">
      <p class="payment-page__eyebrow">
        JO.DIAMONDS
      </p>

      <h1 class="payment-page__title">
        Private payment
      </h1>

      <p class="payment-page__description">
        Enter the agreed amount below. Your payment
        details will be collected securely by Stripe.
      </p>
    </section>

    <section
      class="payment-page__panel"
      aria-labelledby="payment-panel-title"
    >
      <template v-if="!paymentConfigurationAvailable">
        <div class="payment-page__unavailable">
          <p class="payment-page__status-label">
            Payment service
          </p>

          <h2
            id="payment-panel-title"
            class="payment-page__panel-title"
          >
            Temporarily unavailable
          </h2>

          <p class="payment-page__supporting-copy">
            Private online payments have not yet been
            enabled for this environment.
          </p>
        </div>
      </template>

      <template v-else-if="!clientSecret">
        <form
          class="payment-form"
          novalidate
          @submit.prevent="beginPayment"
        >
          <div class="payment-form__heading">
            <p class="payment-page__status-label">
              Secure payment
            </p>

            <h2
              id="payment-panel-title"
              class="payment-page__panel-title"
            >
              Payment details
            </h2>
          </div>

          <div class="payment-form__field">
            <label
              class="payment-form__label"
              for="payment-amount"
            >
              Amount
            </label>

            <div class="payment-form__amount-control">
              <span
                class="payment-form__currency"
                aria-hidden="true"
              >
                £
              </span>

              <input
                id="payment-amount"
                v-model="amount"
                class="payment-form__input payment-form__input--amount"
                name="amount"
                type="text"
                inputmode="decimal"
                autocomplete="off"
                placeholder="0.00"
                maxlength="32"
                required
                :disabled="isSubmitting"
                aria-describedby="payment-amount-help"
              >
            </div>

            <p
              id="payment-amount-help"
              class="payment-form__help"
            >
              Enter the amount agreed with your
              JO.DIAMONDS representative.
            </p>
          </div>

          <div class="payment-form__field">
            <label
              class="payment-form__label"
              for="payment-reference"
            >
              Reference
              <span class="payment-form__optional">
                Optional
              </span>
            </label>

            <input
              id="payment-reference"
              v-model="reference"
              class="payment-form__input"
              name="reference"
              type="text"
              autocomplete="off"
              maxlength="120"
              placeholder="Consultation or invoice reference"
              :disabled="isSubmitting"
            >
          </div>

          <p
            v-if="submissionError"
            class="payment-form__error"
            role="alert"
          >
            {{ submissionError }}
          </p>

          <button
            class="payment-form__submit"
            type="submit"
            :disabled="isSubmitting"
          >
            {{
              isSubmitting
                ? 'Preparing secure payment…'
                : 'Continue securely'
            }}
          </button>

          <div class="payment-form__assurance">
            <span
              class="payment-form__lock"
              aria-hidden="true"
            >
              ◇
            </span>

            <span>
              Payment processing is secured by Stripe.
              JO.DIAMONDS does not receive or store your
              card details.
            </span>
          </div>
        </form>
      </template>

      <template v-else>
        <div class="payment-checkout">
          <div class="payment-checkout__heading">
            <p class="payment-page__status-label">
              Stripe secure checkout
            </p>

            <h2
              id="payment-panel-title"
              class="payment-page__panel-title"
            >
              Complete your payment
            </h2>
          </div>

          <div
            class="payment-checkout__mount"
            aria-live="polite"
          >
            <StripeEmbeddedCheckout
              :publishable-key="stripePublishableKey"
              :client-secret="clientSecret"
              @error="handleCheckoutError"
            />
          </div>

          <p
            v-if="submissionError"
            class="payment-form__error"
            role="alert"
          >
            {{ submissionError }}
          </p>

          <button
            class="payment-checkout__back"
            type="button"
            @click="restartPayment"
          >
            Change payment details
          </button>
        </div>
      </template>
    </section>

    <section class="payment-page__trust">
      <div>
        <strong>GBP payments</strong>
        <span>Processed in pounds sterling</span>
      </div>

      <div>
        <strong>Secure checkout</strong>
        <span>Payment details handled by Stripe</span>
      </div>

      <div>
        <strong>Private assistance</strong>
        <span>Personal support from our team</span>
      </div>
    </section>
  </main>
</template>

<style scoped>
.payment-page {
  min-height: 100vh;
  padding: clamp(5rem, 10vw, 8rem) clamp(1.25rem, 5vw, 5rem);
  background:
    radial-gradient(
      circle at 15% 10%,
      rgb(177 146 88 / 10%),
      transparent 32rem
    ),
    #f5f2ec;
  color: #181714;
}

.payment-page__intro {
  width: min(100%, 46rem);
  margin: 0 auto clamp(2.5rem, 6vw, 4.5rem);
  text-align: center;
}

.payment-page__eyebrow,
.payment-page__status-label {
  margin: 0 0 1rem;
  font-family: Inter, sans-serif;
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #8a7044;
}

.payment-page__title,
.payment-page__panel-title {
  margin: 0;
  font-family: 'Cormorant Garamond', serif;
  font-weight: 500;
}

.payment-page__title {
  font-size: clamp(3.25rem, 8vw, 6.5rem);
  line-height: 0.9;
  letter-spacing: -0.035em;
}

.payment-page__description {
  width: min(100%, 35rem);
  margin: 1.75rem auto 0;
  font-family: Inter, sans-serif;
  font-size: clamp(0.95rem, 2vw, 1.05rem);
  line-height: 1.8;
  color: #69645b;
}

.payment-page__panel {
  width: min(100%, 44rem);
  margin: 0 auto;
  padding: clamp(1.75rem, 5vw, 3.5rem);
  border: 1px solid rgb(24 23 20 / 12%);
  background: rgb(255 255 255 / 86%);
  box-shadow: 0 2rem 5rem rgb(24 23 20 / 8%);
  backdrop-filter: blur(1.25rem);
}

.payment-page__panel-title {
  font-size: clamp(2.1rem, 5vw, 3.25rem);
  line-height: 1;
}

.payment-page__supporting-copy {
  margin: 1.25rem 0 0;
  font-family: Inter, sans-serif;
  line-height: 1.7;
  color: #69645b;
}

.payment-form {
  display: grid;
  gap: 2rem;
}

.payment-form__heading,
.payment-checkout__heading {
  padding-bottom: 1.75rem;
  border-bottom: 1px solid rgb(24 23 20 / 10%);
}

.payment-form__field {
  display: grid;
  gap: 0.65rem;
}

.payment-form__label {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  font-family: Inter, sans-serif;
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.payment-form__optional {
  color: #8f8a81;
  font-weight: 400;
}

.payment-form__amount-control {
  position: relative;
}

.payment-form__currency {
  position: absolute;
  top: 50%;
  left: 1.15rem;
  transform: translateY(-50%);
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.65rem;
  color: #8a7044;
  pointer-events: none;
}

.payment-form__input {
  width: 100%;
  min-height: 3.6rem;
  padding: 0.9rem 1rem;
  border: 1px solid #c9c3b8;
  border-radius: 0;
  background: #fff;
  color: #181714;
  font-family: Inter, sans-serif;
  font-size: 1rem;
  outline: none;
  transition:
    border-color 160ms ease,
    box-shadow 160ms ease;
}

.payment-form__input--amount {
  padding-left: 2.75rem;
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.7rem;
}

.payment-form__input:focus {
  border-color: #8a7044;
  box-shadow: 0 0 0 3px rgb(138 112 68 / 12%);
}

.payment-form__input:disabled {
  cursor: wait;
  opacity: 0.65;
}

.payment-form__help {
  margin: 0;
  font-family: Inter, sans-serif;
  font-size: 0.78rem;
  line-height: 1.6;
  color: #79746b;
}

.payment-form__error {
  margin: 0;
  padding: 0.9rem 1rem;
  border-left: 2px solid #9c382f;
  background: #fbefed;
  font-family: Inter, sans-serif;
  font-size: 0.86rem;
  line-height: 1.55;
  color: #7d2c25;
}

.payment-form__submit {
  min-height: 3.75rem;
  padding: 1rem 1.5rem;
  border: 1px solid #181714;
  background: #181714;
  color: #fff;
  font-family: Inter, sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  cursor: pointer;
  transition:
    background 160ms ease,
    color 160ms ease;
}

.payment-form__submit:hover:not(:disabled) {
  background: #8a7044;
  border-color: #8a7044;
}

.payment-form__submit:disabled {
  cursor: wait;
  opacity: 0.65;
}

.payment-form__assurance {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  font-family: Inter, sans-serif;
  font-size: 0.76rem;
  line-height: 1.6;
  color: #79746b;
}

.payment-form__lock {
  color: #8a7044;
}

.payment-checkout {
  display: grid;
  gap: 1.75rem;
}

.payment-checkout__mount {
  min-height: 28rem;
  padding: 1rem 0;
  background: #fff;
}

.payment-checkout__back {
  justify-self: start;
  padding: 0;
  border: 0;
  border-bottom: 1px solid currentColor;
  background: transparent;
  font-family: Inter, sans-serif;
  font-size: 0.76rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #57524a;
  cursor: pointer;
}

.payment-page__trust {
  width: min(100%, 64rem);
  margin: clamp(3rem, 7vw, 5rem) auto 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  border-top: 1px solid rgb(24 23 20 / 12%);
  border-bottom: 1px solid rgb(24 23 20 / 12%);
}

.payment-page__trust div {
  display: grid;
  gap: 0.45rem;
  padding: 1.5rem;
  text-align: center;
}

.payment-page__trust div + div {
  border-left: 1px solid rgb(24 23 20 / 12%);
}

.payment-page__trust strong,
.payment-page__trust span {
  font-family: Inter, sans-serif;
}

.payment-page__trust strong {
  font-size: 0.74rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.payment-page__trust span {
  font-size: 0.76rem;
  color: #79746b;
}

@media (max-width: 700px) {
  .payment-page {
    padding-inline: 1rem;
  }

  .payment-page__panel {
    padding: 1.5rem;
  }

  .payment-page__trust {
    grid-template-columns: 1fr;
  }

  .payment-page__trust div + div {
    border-top: 1px solid rgb(24 23 20 / 12%);
    border-left: 0;
  }
}
</style>
