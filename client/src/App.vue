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
import { RouterView } from 'vue-router';

import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
</script>