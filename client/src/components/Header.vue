<template>
  <header>
    <div class="container inner">
      <router-link to="/">
        <span class="logo">Exchequer</span>
      </router-link>
      <nav>
        <span v-if="auth.user" class="current-user">{{ auth.user.email }}</span>
        <router-link v-if="auth.user" to="/dashboard" :class="isRoute('/dashboard')">Dashboard</router-link>
        <span class="logout" v-if="auth.user" @click="auth.handleLogout()">Logout</span>
        <router-link v-else to="/login" :class="isRoute('/login')">Login</router-link>
        <div class="btn" @click="ui.toggleDark()">Dark</div>
      </nav>
    </div>
  </header>
</template>

<style scoped>
@import '@/assets/styles/components/Header.css';
</style>

<script setup>
import { useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { useUiStore } from '@/stores/ui';

const route = useRoute();
const auth = useAuthStore();
const ui = useUiStore();

const isRoute = (value) => ({
  'active': route.path === value,
})
</script>