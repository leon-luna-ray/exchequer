<template>
    <main id="dashboard" class="page">
        <div class="container inner flex-col-1">
            <div class="title">
                <h1>Dashboard</h1>
            </div>
            <div class="content">
                <div class="transation">
                    <h2>New Transaction</h2>
                    <FormExpense />
                </div>
                <div class="posts">
                    <h2>Posts</h2>
                    <ListTransaction v-if="posts" :posts="posts" />
                </div>
            </div>
        </div>
    </main>
</template>

<style scoped>
@import '@/assets/styles/pages/DashboardPage.css';
</style>

<script setup>
import { storeToRefs } from 'pinia';
import { usePostStore } from '@/stores/posts';
import FormExpense from '@/components/FormExpense.vue';
import ListTransaction from '../components/ListTransaction.vue';

const postStore = usePostStore();
const { posts } = storeToRefs(postStore);

postStore.fetchPosts();
</script>