<script setup>
import { onBeforeMount } from 'vue';
import { RouterView } from 'vue-router';
import { useAuthStore } from './stores/auth'
import LoginPage from './pages/LoginPage.vue';
import Header from './components/Header.vue';

const authStore = useAuthStore();

onBeforeMount(async () => {
  await authStore.checkAuth();
})
</script>

<template>
  <div id="vue-app">
    <Header />
    <RouterView />
  </div>
</template>

