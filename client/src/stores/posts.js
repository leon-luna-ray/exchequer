import axios from 'axios';
import { ref } from 'vue';
import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';
import { API_BASE_URL } from '@/lib/api';

export const usePostStore = defineStore('posts', () => {
  const authState = useStorage('exchequer', { token: null });

  const posts = ref(null);

  const fetchPosts = async () => {
    try {
      const token = authState.value.token;
      const response = await axios.get(`${API_BASE_URL}/posts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    //   console.log(response.data);
      posts.value = response.data;
    } catch (error) {
      console.error(error.response.data);
    }
  };
  const postExpense = async (data) => {
    console.log(data)
    try {
      const token = authState.value.token;
      const response = await axios.post(`${API_BASE_URL}/posts`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      // Assuming the response contains the newly created expense, you may want to update your local state here.
      // For example, if you're maintaining a list of expenses, you could push the new expense to the `posts` array.
      // posts.value.push(response.data);
    } catch (error) {
      console.error(error.response.data);
    }
  };


  return {
    posts,
    fetchPosts,
    postExpense,
  };
});
