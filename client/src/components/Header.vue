<template>
  <header>
    <div class="container inner">
      <router-link to="/">
        <span class="logo">Exchequer</span>
      </router-link>
      <nav>
        <router-link to="/dashboard">Dashboard</router-link>
        <router-link to="/login">Login</router-link>
        <router-link to="/signup">Singup</router-link>
        <div class="btn" @click="ui.toggleDark()">Dark</div>
      </nav>
    </div>
  </header>
</template>

<style scoped>
@import '@/assets/styles/components/Header.css';
</style>

<script setup>
import { useUiStore } from '@/stores/ui';

const ui = useUiStore();
</script>