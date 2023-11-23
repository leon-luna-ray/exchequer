<template>
  <header>
    <div class="container inner">
      <router-link to="/">
        <span class="logo">Exchequer</span>
      </router-link>
      <nav>
        <span v-if="auth.user">{{ auth.user.email }}</span>
        <router-link to="/dashboard">Dashboard</router-link>
        <span class="logout" v-if="auth.user" @click="auth.handleLogout()">Logout</span>
        <router-link v-else to="/login">Login</router-link>
        <router-link v-if="!auth.user" to="/signup">Singup</router-link>
        <div class="btn" @click="ui.toggleDark()">Dark</div>
      </nav>
    </div>
  </header>
</template>

<style scoped>
@import '@/assets/styles/components/Header.css';
</style>

<script setup>
import { useAuthStore } from '@/stores/auth';
import { useUiStore } from '@/stores/ui';

const auth = useAuthStore();
const ui = useUiStore();
</script>