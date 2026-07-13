<script setup lang="ts">
import AppFooter from '../components/layout/AppFooter.vue';
import AppHeader from '../components/layout/AppHeader.vue';
import UtilityBar from '../components/layout/UtilityBar.vue';
</script>

<template>
  <div class="site-shell">
    <UtilityBar />
    <AppHeader />

    <slot />

    <AppFooter />
  </div>
</template>

<style scoped>
.site-shell {
  min-height: 100vh;

  background: var(--colour-paper);
}
</style>