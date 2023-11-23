<script setup>
import { onBeforeMount } from 'vue';
import { RouterView } from 'vue-router';
import { useAuthStore } from '@/stores/auth'

import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

const auth = useAuthStore();


onBeforeMount(async () => {
  await auth.checkAuth();
})
</script>

<template>
  <div id="vue-app">
    <div>
      <Header />
      <RouterView />
    </div>
    <Footer />
  </div>
</template>

