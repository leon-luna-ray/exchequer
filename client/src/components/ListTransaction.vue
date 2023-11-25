<template>
    <ul v-if="posts && posts?.length" class="post-list flex-col-1">
        <li v-for="post in posts">
            <span class="description">{{ post.description }}</span>
            <div class="flex-col-03">
                <span>{{ post.amount }} {{ post.localCurrency }}</span>
                <span>XX {{ post.homeCurrency }}</span>
            </div>
            <div class="overlay">
                <!-- <button>Edit</button> -->
                <div></div>
                <button @click="postStore.deleteExpense(post._id)">Delete</button>
            </div>
        </li>
    </ul>
</template>
<style scoped>
@import '../assets/styles/components/ListTransaction.css';
</style>
<script setup>
import { usePostStore } from '@/stores/posts';

const postStore = usePostStore();
const props = defineProps({
    posts: {
        type: Array,
        required: true,
    }
})
</script>