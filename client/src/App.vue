<script setup>
import { onMounted } from 'vue';
import { useAuthStore } from './stores/auth'
import LoginPage from './pages/LoginPage.vue';

const authStore = useAuthStore();

onMounted(async () => {
  await authStore.checkAuth();
})
</script>

<template>
  <LoginPage />
</template>

