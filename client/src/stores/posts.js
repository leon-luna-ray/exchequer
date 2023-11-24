import axios from 'axios';
import { computed, ref } from 'vue';
// import { useRouter } from 'vue-router';
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
      console.log(response.data);
      posts.value = response.data;
    } catch (error) {
      console.error(error.response.data);
    }
  };

  return {
    posts,
    fetchPosts,
  };
});
