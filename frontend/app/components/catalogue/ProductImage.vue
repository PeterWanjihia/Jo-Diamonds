<script setup lang="ts">
import { ref, watch } from 'vue';

import { resolveImageUrl } from '../../utils/resolve-image-url';

const props = withDefaults(
  defineProps<{
    readonly src: string | null;
    readonly alt: string;
    readonly eager?: boolean;
  }>(),
  {
    eager: false,
  },
);

const failed = ref(false);

const resolvedSource = computed(() =>
  resolveImageUrl(props.src),
);

watch(
  () => props.src,
  () => {
    failed.value = false;
  },
);
</script>

<template>
  <div class="product-image">
    <img
      v-if="resolvedSource && !failed"
      class="product-image__asset"
      :src="resolvedSource"
      :alt="alt"
      :loading="eager ? 'eager' : 'lazy'"
      :fetchpriority="eager ? 'high' : 'auto'"
      @error="failed = true"
    >

    <div
      v-else
      class="product-image__fallback"
      role="img"
      :aria-label="alt"
    >
      <span class="product-image__monogram">
        JO
      </span>

      <span class="product-image__message">
        Product photography
      </span>
    </div>
  </div>
</template>

<style scoped>
.product-image {
  position: relative;

  width: 100%;
  height: 100%;

  overflow: hidden;

  background:
    radial-gradient(
      circle at 50% 35%,
      #f8f4ed,
      #e8e0d5 72%
    );
}

.product-image__asset {
  width: 100%;
  height: 100%;

  object-fit: cover;

  transition:
    transform var(--duration-slow)
    var(--ease-standard);
}

.product-image:hover .product-image__asset {
  transform: scale(1.015);
}

.product-image__fallback {
  display: grid;
  min-height: 30rem;

  place-content: center;
  gap: var(--space-3);

  color: var(--colour-text-muted);
  text-align: center;
}

.product-image__monogram {
  color: var(--colour-gold);

  font-family: var(--font-display);
  font-size: 3rem;

  letter-spacing: 0.08em;
}

.product-image__message {
  font-size: var(--font-size-label);

  letter-spacing: var(--letter-spacing-label);
  text-transform: uppercase;
}
</style>
