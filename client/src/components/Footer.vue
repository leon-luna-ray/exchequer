<template>
    <footer>
        <div class="inner">
            <span>This app is in development. 🚧 </span>
            <span>©{{ year }} <a href="https://www.rayluna.dev/" target="_blank">Ray Luna</a></span>
        </div>
    </footer>
</template>

<style scoped>
@import '@/assets/styles/components/Footer.css';
</style>

<script setup>
const year = new Date().getFullYear();
</script>
