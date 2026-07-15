<script setup lang="ts">
import type { CheckoutSessionStatusResponse } from '~/types/payments';
import { formatGbpFromPence } from '~/utils/format-gbp-from-pence';

const {
  retrieveCheckoutSession,
  getErrorMessage,
} = usePaymentsApi();

const session = ref<CheckoutSessionStatusResponse | null>(null);
const retrievalError = ref('');
const isLoading = ref(true);

function readSessionIdFromBrowserUrl(): string {
  if (!import.meta.client) {
    return '';
  }

  const url = new URL(window.location.href);

  return url.searchParams.get('session_id')?.trim() ?? '';
}

const paymentWasSuccessful = computed(
  () => session.value?.paymentStatus === 'paid',
);

const paymentIsProcessing = computed(
  () =>
    session.value?.status === 'complete' &&
    session.value.paymentStatus !== 'paid',
);

const formattedAmount = computed(() => {
  const amount = session.value?.amountTotal;

  if (amount === null || amount === undefined) {
    return null;
  }

  return formatGbpFromPence(amount);
});

async function loadCheckoutSession(): Promise<void> {
  retrievalError.value = '';
  session.value = null;
  isLoading.value = true;

  const currentSessionId =
    readSessionIdFromBrowserUrl();

  if (!currentSessionId) {
    retrievalError.value =
      'The Checkout Session identifier is missing.';
    isLoading.value = false;
    return;
  }

  try {
    session.value =
      await retrieveCheckoutSession(
        currentSessionId,
      );
  } catch (error: unknown) {
    retrievalError.value =
      getErrorMessage(error);
  } finally {
    isLoading.value = false;
  }
}

onMounted(async () => {
  await nextTick();
  await loadCheckoutSession();
});

useHead({
  title: 'Payment Confirmation',
});

useSeoMeta({
  description:
    'View the status of your secure JO.DIAMONDS payment.',
  robots: 'noindex, nofollow',
});
</script>

<template>
  <main class="confirmation-page">
    <section class="confirmation-card">
      <template v-if="isLoading">
        <p class="confirmation-card__eyebrow">
          Secure payment
        </p>

        <div
          class="confirmation-card__mark confirmation-card__mark--loading"
          aria-hidden="true"
        >
          ◇
        </div>

        <h1 class="confirmation-card__title">
          Confirming your payment
        </h1>

        <p
          class="confirmation-card__copy"
          role="status"
        >
          We are retrieving the latest payment status
          directly from Stripe.
        </p>
      </template>

      <template v-else-if="retrievalError">
        <p class="confirmation-card__eyebrow">
          Payment status
        </p>

        <div
          class="confirmation-card__mark confirmation-card__mark--error"
          aria-hidden="true"
        >
          !
        </div>

        <h1 class="confirmation-card__title">
          We could not confirm the payment
        </h1>

        <p
          class="confirmation-card__copy"
          role="alert"
        >
          {{ retrievalError }}
        </p>

        <button
          class="confirmation-card__primary-action"
          type="button"
          @click="loadCheckoutSession"
        >
          Check again
        </button>
      </template>

      <template v-else-if="paymentWasSuccessful">
        <p class="confirmation-card__eyebrow">
          Payment confirmed
        </p>

        <div
          class="confirmation-card__mark confirmation-card__mark--success"
          aria-hidden="true"
        >
          ✓
        </div>

        <h1 class="confirmation-card__title">
          Thank you
        </h1>

        <p class="confirmation-card__copy">
          Your payment has been received securely.
          A member of the JO.DIAMONDS team will continue
          with the arrangements discussed with you.
        </p>
      </template>

      <template v-else-if="paymentIsProcessing">
        <p class="confirmation-card__eyebrow">
          Payment submitted
        </p>

        <div
          class="confirmation-card__mark confirmation-card__mark--loading"
          aria-hidden="true"
        >
          ◇
        </div>

        <h1 class="confirmation-card__title">
          Your payment is processing
        </h1>

        <p class="confirmation-card__copy">
          Stripe has received your payment submission,
          but final confirmation is not yet available.
        </p>

        <button
          class="confirmation-card__primary-action"
          type="button"
          @click="loadCheckoutSession"
        >
          Check status
        </button>
      </template>

      <template v-else>
        <p class="confirmation-card__eyebrow">
          Payment incomplete
        </p>

        <div
          class="confirmation-card__mark confirmation-card__mark--error"
          aria-hidden="true"
        >
          !
        </div>

        <h1 class="confirmation-card__title">
          Payment not completed
        </h1>

        <p class="confirmation-card__copy">
          Stripe has not confirmed this payment as paid.
          You may return to the secure payment page and
          begin again.
        </p>
      </template>

      <dl
        v-if="session"
        class="confirmation-details"
      >
        <div v-if="formattedAmount">
          <dt>Amount</dt>
          <dd>{{ formattedAmount }}</dd>
        </div>

        <div>
          <dt>Status</dt>
          <dd>
            {{
              session.paymentStatus === 'paid'
                ? 'Paid'
                : session.paymentStatus
            }}
          </dd>
        </div>

        <div v-if="session.reference">
          <dt>Reference</dt>
          <dd>{{ session.reference }}</dd>
        </div>

        <div v-if="session.customerEmail">
          <dt>Email</dt>
          <dd>{{ session.customerEmail }}</dd>
        </div>
      </dl>

      <div class="confirmation-card__actions">
        <NuxtLink
          v-if="
            !isLoading &&
            !paymentWasSuccessful &&
            !paymentIsProcessing
          "
          class="confirmation-card__primary-action"
          to="/payment"
        >
          Return to payment
        </NuxtLink>

        <NuxtLink
          class="confirmation-card__secondary-action"
          to="/"
        >
          Return to the showroom
        </NuxtLink>
      </div>

      <p class="confirmation-card__assurance">
        Payment status is verified directly with Stripe.
        JO.DIAMONDS does not store your card details.
      </p>
    </section>
  </main>
</template>

<style scoped>
.confirmation-page {
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: clamp(5rem, 10vw, 8rem) clamp(1rem, 5vw, 4rem);
  background:
    radial-gradient(
      circle at 50% 0%,
      rgb(177 146 88 / 12%),
      transparent 34rem
    ),
    #f5f2ec;
  color: #181714;
}

.confirmation-card {
  width: min(100%, 44rem);
  padding: clamp(2rem, 6vw, 4.5rem);
  border: 1px solid rgb(24 23 20 / 12%);
  background: rgb(255 255 255 / 90%);
  box-shadow: 0 2rem 5rem rgb(24 23 20 / 8%);
  text-align: center;
}

.confirmation-card__eyebrow {
  margin: 0 0 1.5rem;
  font-family: Inter, sans-serif;
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #8a7044;
}

.confirmation-card__mark {
  width: 4.5rem;
  height: 4.5rem;
  margin: 0 auto 1.75rem;
  display: grid;
  place-items: center;
  border: 1px solid currentColor;
  border-radius: 50%;
  font-family: 'Cormorant Garamond', serif;
  font-size: 2rem;
}

.confirmation-card__mark--success {
  color: #557058;
}

.confirmation-card__mark--loading {
  color: #8a7044;
}

.confirmation-card__mark--error {
  color: #973f36;
}

.confirmation-card__title {
  margin: 0;
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(3rem, 8vw, 5.5rem);
  font-weight: 500;
  line-height: 0.95;
  letter-spacing: -0.035em;
}

.confirmation-card__copy {
  width: min(100%, 34rem);
  margin: 1.5rem auto 0;
  font-family: Inter, sans-serif;
  font-size: 0.95rem;
  line-height: 1.8;
  color: #69645b;
}

.confirmation-details {
  margin: 2.75rem 0 0;
  border-top: 1px solid rgb(24 23 20 / 10%);
  text-align: left;
}

.confirmation-details div {
  display: grid;
  grid-template-columns: minmax(7rem, 0.6fr) 1fr;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid rgb(24 23 20 / 10%);
}

.confirmation-details dt,
.confirmation-details dd {
  margin: 0;
  font-family: Inter, sans-serif;
  font-size: 0.78rem;
  line-height: 1.5;
}

.confirmation-details dt {
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #79746b;
}

.confirmation-details dd {
  overflow-wrap: anywhere;
  color: #181714;
}

.confirmation-card__actions {
  margin-top: 2.5rem;
  display: grid;
  gap: 1rem;
}

.confirmation-card__primary-action,
.confirmation-card__secondary-action {
  min-height: 3.5rem;
  display: grid;
  place-items: center;
  padding: 0.9rem 1.4rem;
  font-family: Inter, sans-serif;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-decoration: none;
  text-transform: uppercase;
  cursor: pointer;
}

.confirmation-card__primary-action {
  border: 1px solid #181714;
  background: #181714;
  color: #fff;
}

.confirmation-card__secondary-action {
  border: 1px solid #bcb5a9;
  background: transparent;
  color: #181714;
}

.confirmation-card__primary-action:hover {
  border-color: #8a7044;
  background: #8a7044;
}

.confirmation-card__secondary-action:hover {
  border-color: #181714;
}

.confirmation-card__assurance {
  margin: 2rem 0 0;
  font-family: Inter, sans-serif;
  font-size: 0.72rem;
  line-height: 1.6;
  color: #8a857d;
}

@media (max-width: 600px) {
  .confirmation-card {
    padding: 2rem 1.25rem;
  }

  .confirmation-details div {
    grid-template-columns: 1fr;
    gap: 0.35rem;
  }
}
</style>