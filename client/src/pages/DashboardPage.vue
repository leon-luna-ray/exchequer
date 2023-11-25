<template>
    <main id="dashboard" class="page">
        <h1>Dashboard Page</h1>
    </main>
</template>

<script setup>
import { onMounted } from 'vue';
import { usePostStore } from '@/stores/posts';

const postStore = usePostStore();
const expenseData = {
    userId: '6560dc085ea9f4f936b4d0f1',
    description: 'Hotel stay',
    amount: 150.0,
    localCurrency: 'USD',
    homeCurrency: 'EUR',
    location: 'Paris',
    category: 'Accommodation',
};
onMounted(async () => {
    await postStore.fetchPosts();
    // await postStore.postExpense(expenseData);
})
</script>