<script setup lang="ts">
import type {
  CataloguePriceResponse,
} from '../../types/catalogue';

import { formatMoney } from '../../utils/format-money';

const props = defineProps<{
  readonly price: CataloguePriceResponse;
}>();

const formattedPrice = computed(() =>
  formatMoney(props.price),
);
</script>

<template>
  <p class="product-price">
    {{ formattedPrice }}
  </p>
</template>

<style scoped>
.product-price {
  font-family: var(--font-display);
  font-size: clamp(1.75rem, 3vw, 2.75rem);
  font-weight: 400;

  line-height: var(--line-height-heading);
}
</style>
