<script setup>
import { onBeforeMount } from 'vue';
import { useAuthStore } from './stores/auth'
import LoginPage from './pages/LoginPage.vue';

const authStore = useAuthStore();

onBeforeMount(async () => {
  await authStore.checkAuth();
})
</script>

<template>
  <LoginPage />
</template>

