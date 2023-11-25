<template>
    <section class="hero">
        <div class="inner container">
            <h1>The progressive on-the-go travel budgeting app.</h1>
            <p>A travel expenses app that works online and offline.</p>
            <div v-if="auth.user" class="buttons">
                <router-link to="/dashboard" class="btn">Go To Dashboard</router-link>
            </div>
            <div v-else class="buttons">
                <router-link to="/login" class="btn">Login</router-link>
                <router-link to="/register" class="btn secondary">Register</router-link>
            </div>
        </div>
    </section>
</template>

<style scoped>
@import '@/assets/styles/components/Hero.css';
</style>

<script setup>
import { useAuthStore } from '@/stores/auth';
const auth = useAuthStore();
</script>