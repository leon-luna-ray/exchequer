<template>
    <div v-if="budgetDetailData" class="container flex-col-1">
        <h1>Budget Detail</h1>
        <div class="flex-col-03">
            <h2>{{ budgetDetailData.title }}</h2>
            <p>{{ budgetDetailData.description }}</p>
            <p>{{ formatTimestamp(budgetDetailData.createdAt) }}</p>
            <p>Currency: {{ budgetDetailData.localCurrency }}</p>
        </div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
import { useBudgetStore } from '@/stores/budget';
import { formatTimestamp } from '@/lib/date'

const route = useRoute();
const budgetStore = useBudgetStore();
const { budgetDetailData } = storeToRefs(budgetStore);

onMounted(async () => {
    await budgetStore.fetchBudgetDetail(route.params.id);
})
</script>
