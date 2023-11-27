<template>
    <div v-if="budgetStore.budgetDetailData" class="container">
        <h2>Budget Detail Page</h2>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useBudgetStore } from '@/stores/budget';

const route = useRoute();
const budgetStore = useBudgetStore();

onMounted(async () => {
    await budgetStore.fetchBudgetDetail(route.params.id);
})
</script>
