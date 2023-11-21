<template>
    <footer>
        <div class="inner">
            <p>This app is in development. 🚧 ©{{ year }} <a href="https://www.rayluna.dev/" target="_blank">Ray Luna</a></p>
        </div>
    </footer>
</template>

<script setup>
const year = new Date().getFullYear();
</script>