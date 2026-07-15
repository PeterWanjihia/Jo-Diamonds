<script setup lang="ts">
import {
  loadStripe,
  type StripeEmbeddedCheckout,
} from '@stripe/stripe-js';

const props = defineProps<{
  publishableKey: string;
  clientSecret: string;
}>();

const emit = defineEmits<{
  error: [message: string];
}>();

const mountElement = ref<HTMLElement | null>(null);
const isLoading = ref(true);

let checkout: StripeEmbeddedCheckout | null = null;
let initializationVersion = 0;

function getErrorMessage(error: unknown): string {
  if (
    error instanceof Error &&
    error.message.trim().length > 0
  ) {
    return error.message;
  }

  return 'The secure Stripe payment form could not be loaded.';
}

function destroyCheckout(): void {
  checkout?.destroy();
  checkout = null;
}

async function mountCheckout(): Promise<void> {
  if (!import.meta.client || !mountElement.value) {
    return;
  }

  const currentVersion = ++initializationVersion;

  destroyCheckout();
  isLoading.value = true;

  try {
    const stripe = await loadStripe(
      props.publishableKey,
    );

    if (!stripe) {
      throw new Error(
        'Stripe.js could not be initialized.',
      );
    }

    const embeddedCheckout =
      await stripe.createEmbeddedCheckoutPage({
        clientSecret: props.clientSecret,
      });

    if (
      currentVersion !== initializationVersion ||
      !mountElement.value
    ) {
      embeddedCheckout.destroy();
      return;
    }

    checkout = embeddedCheckout;
    checkout.mount(mountElement.value);
  } catch (error: unknown) {
    emit('error', getErrorMessage(error));
  } finally {
    if (currentVersion === initializationVersion) {
      isLoading.value = false;
    }
  }
}

onMounted(() => {
  void mountCheckout();
});

watch(
  () => [
    props.publishableKey,
    props.clientSecret,
  ] as const,
  () => {
    void mountCheckout();
  },
);

onBeforeUnmount(() => {
  initializationVersion += 1;
  destroyCheckout();
});
</script>

<template>
  <div class="stripe-embedded-checkout">
    <div
      v-if="isLoading"
      class="stripe-embedded-checkout__loading"
      role="status"
    >
      Loading secure checkout…
    </div>

    <div
      ref="mountElement"
      class="stripe-embedded-checkout__mount"
      :aria-busy="isLoading"
    />
  </div>
</template>

<style scoped>
.stripe-embedded-checkout {
  position: relative;
  min-height: 28rem;
}

.stripe-embedded-checkout__loading {
  position: absolute;
  inset: 0;
  z-index: 1;
  display: grid;
  place-items: center;
  background: #faf8f4;
  font-family: Inter, sans-serif;
  font-size: 0.78rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #79746b;
}

.stripe-embedded-checkout__mount {
  min-height: 28rem;
}
</style>
