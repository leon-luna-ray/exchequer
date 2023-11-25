<template>
    <main id="dashboard" class="page">
        <h1>Dashboard Page</h1>
    </main>
</template>

<script setup>
import { usePostStore } from '@/stores/posts';
const postStore = usePostStore();

postStore.fetchPosts();
</script>