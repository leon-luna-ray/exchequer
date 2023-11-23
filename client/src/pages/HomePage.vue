<template>
    <main id="home">
        <div class="hero">
            <div class="inner container">
                <h1>The progressive go-the-go travel budgeting app.</h1>
                <p>A travel expenses app that works online and offline.</p>
                <div class="buttons">
                    <router-link to="/login" class="btn">Login</router-link>
                    <router-link to="/signup" class="btn secondary">Singup</router-link>
                </div>
            </div>
        </div>
    </main>
</template>

<style scoped>
@import '@/assets/styles/pages/HomePage.css';

h2 {
    color: var(--ex-orange);
    font-size: 4rem;
}
</style>

<script setup>
import { useUiStore } from '@/stores/ui';

const ui = useUiStore();
</script>