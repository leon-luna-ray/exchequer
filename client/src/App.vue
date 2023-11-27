<template>
  <div id="vue-app">
    <div>
      <Header />
      <RouterView />
    </div>
    <Footer />
  </div>
</template>

<script setup>
import { watch } from 'vue';
import { RouterView } from 'vue-router';
import { useStorage } from '@vueuse/core';
import { useBudgetStore } from '@/stores/budget';

import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

const authState = useStorage('exchequer', { token: null });
const budgetStore = useBudgetStore();

// Watchers
watch(authState, () => {
  if (!authState.value?.token) {
    budgetStore.clearUserData();
  }
});
</script>