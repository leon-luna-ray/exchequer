import axios from 'axios';
import { ref, watch } from 'vue';
import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';
import { API_BASE_URL } from '@/lib/api';

export const usePostStore = defineStore('posts', () => {
  // State
  const authState = useStorage('exchequer', { token: null });
  const posts = ref(null);

  // Methods
  const setPosts = (value) => {
    posts.value = value;
  };
  const fetchPosts = async () => {
    try {
      const token = authState.value.token;
      const response = await axios.get(`${API_BASE_URL}/posts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      //   console.log(response.data);
      setPosts(response.data);
    } catch (error) {
      console.error(error.response.data);
    }
  };
  const postExpense = async (data) => {
    console.log(data);
    try {
      const token = authState.value.token;
      const response = await axios.post(`${API_BASE_URL}/posts`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error(error.response.data);
    }
  };

  // Watchers
  watch(authState, () => {
    if (!authState.value?.token) {
      setPosts(null);
    }
  });

  return {
    posts,
    fetchPosts,
    postExpense,
  };
});
