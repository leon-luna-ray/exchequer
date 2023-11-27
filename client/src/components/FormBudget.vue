<template>
    <form @submit.prevent="budgetStore.postNewBudget" class="flex-col-1">
        <label for="description">Title</label>
        <input type="text" id="title" v-model="budgetFormData.title">

        <label for="description">Description</label>
        <input type="text" id="description" v-model="budgetFormData.description">

        <label for="amount">Amount</label>
        <input type="number" id="amount" v-model="budgetFormData.amount" required>

        <label for="localCurrency">Local Currency:</label>
        <input type="text" id="localCurrency" v-model="budgetFormData.localCurrency">

        <button type="submit">Submit</button>
    </form>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useBudgetStore } from '@/stores/budget';

const budgetStore = useBudgetStore();
const { budgetFormData } = storeToRefs(budgetStore);
</script>