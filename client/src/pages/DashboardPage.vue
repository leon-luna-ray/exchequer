<template>
    <main id="dashboard" class="page">
        <div class="container inner">
            <!-- <div class="title">
                <h1>Dashboard</h1>
            </div> -->
            <section class="user-budgets">
                <h2>Budgets</h2>
                <ul v-if="userBudgets" class="budget-list flex-col-4">
                    <li v-for="item in userBudgets" class="scale-div">
                        <router-link :to="`/budget/${item._id}`">
                            <IconBudget />
                            <div class="flex-col-03">
                                <h3 class="font-quicksand">{{ item.title }}</h3>
                                <p v-if="item.description">{{ item.description }}</p>
                            </div>
                            <div class="overlay">
                                <button @click="budgetStore.deleteBudget(item._id)">Delete</button>
                            </div>
                        </router-link>

                    </li>
                </ul>
                <div v-else class="no-items">
                    No budgets found.
                </div>
            </section>
            <section>
                <h2>New Budget</h2>
                <FormBudget />
            </section>
        </div>
    </main>
</template>

<style scoped>
@import '@/assets/styles/pages/DashboardPage.css';
</style>

<script setup>
import { onBeforeMount } from 'vue';
import { storeToRefs } from 'pinia';
import { useBudgetStore } from '@/stores/budget';

import FormBudget from '@/components/FormBudget.vue'
import IconBudget from '@/components/icons/IconBudget.vue'

const budgetStore = useBudgetStore();
const { userBudgets } = storeToRefs(budgetStore);

// Lifecycle
onBeforeMount(async () => {
    await budgetStore.fetchUserBudgets();
})
</script>