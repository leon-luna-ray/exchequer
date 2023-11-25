<template>
    <form @submit.prevent="postSotre.postExpense" class="flex-col-1">
        <label for="description">Description:</label>
        <input type="text" id="description" v-model="expenseFormData.description" required>

        <label for="amount">Amount:</label>
        <input type="number" id="amount" v-model="expenseFormData.amount" required>

        <label for="localCurrency">Local Currency:</label>
        <input type="text" id="localCurrency" v-model="expenseFormData.localCurrency" required>

        <label for="homeCurrency">Home Currency:</label>
        <input type="text" id="homeCurrency" v-model="expenseFormData.homeCurrency" required>

        <!-- <label for="location">Location:</label>
        <input type="text" id="location" v-model="formData.location" required>

        <label for="category">Category:</label>
        <input type="text" id="category" v-model="formData.category" required> -->

        <button type="submit">Submit</button>
    </form>
</template>

<style scoped></style>
<script setup>
import { storeToRefs } from 'pinia';
import { usePostStore } from '@/stores/posts'

const postSotre = usePostStore();
const { expenseFormData } = storeToRefs(postSotre);
</script>