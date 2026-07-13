<script setup lang="ts">
import type {
  CatalogueCommercialState,
} from '../../types/catalogue';

import {
  getCommercialStateLabel,
  isPositiveCommercialState,
} from '../../utils/commercial-state';

const props = defineProps<{
  readonly state: CatalogueCommercialState;
}>();

const label = computed(() =>
  getCommercialStateLabel(props.state),
);

const positive = computed(() =>
  isPositiveCommercialState(props.state),
);
</script>

<template>
  <p
    class="commercial-state"
    :class="{
      'commercial-state--positive': positive,
    }"
  >
    <span
      class="commercial-state__indicator"
      aria-hidden="true"
    />

    {{ label }}
  </p>
</template>

<style scoped>
.commercial-state {
  display: inline-flex;
  align-items: center;
  gap: var(--space-3);

  color: var(--colour-text-muted);

  font-size: var(--font-size-label);
  font-weight: 600;

  letter-spacing: var(--letter-spacing-label);
  text-transform: uppercase;
}

.commercial-state__indicator {
  width: 0.5rem;
  height: 0.5rem;

  border-radius: 999px;

  background: currentColor;
}

.commercial-state--positive {
  color: var(--colour-success);
}
</style>
