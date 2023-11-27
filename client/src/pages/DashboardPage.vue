<template>
    <main id="dashboard" class="page">
        <div class="container inner flex-col-1">
            <div class="title">
                <h1>Dashboard</h1>
            </div>
            <section class="user-budgets">
                <h2>Budgets</h2>
                <ul v-if="userBudgets?.length" class="budget-list flex-col-1">
                    <li>List Item</li>
                </ul>
                <div v-else class="no-items">
                    No budgets found.
                </div>
            </section>
        </div>
    </main>
</template>

<style scoped>
@import '@/assets/styles/pages/DashboardPage.css';
</style>

<script setup>
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useBudgetStore } from '@/stores/budget';


const budgetStore = useBudgetStore();

const { userBudgets } = storeToRefs(budgetStore);

// Lifecycle
onMounted(async () => {
    await budgetStore.fetchUserBudgets();
})
</script>