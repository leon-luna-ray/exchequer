import axios from 'axios';
import { ref, watch } from 'vue';
import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';
import { API_BASE_URL } from '@/lib/api';

export const usePostStore = defineStore('posts', () => {
  // State
  const authState = useStorage('exchequer', { token: null });
  const posts = ref(null);
  const expenseFormData = ref({
    description: '',
    amount: '',
    localCurrency: 'EUR',
    homeCurrency: 'USD',
    location: '',
    category: '',
  });

  // Methods
  const setPosts = (value) => {
    posts.value = value;
  };
  const resetExpenseForm = () => {
    expenseFormData.value = {
      description: '',
      amount: '',
      localCurrency: 'EUR',
      homeCurrency: 'USD',
      location: '',
      category: '',
    };
  };
  const fetchPosts = async () => {
    try {
      const token = authState.value.token;
      const response = await axios.get(`${API_BASE_URL}/posts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPosts(response.data.reverse());
    } catch (error) {
      console.error(error.response.data);
    }
  };
  const postExpense = async () => {
    try {
      const token = authState.value.token;
      const response = await axios.post(
        `${API_BASE_URL}/posts`,
        expenseFormData.value,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status >= 200 && response.status < 300) {
        resetExpenseForm();
        fetchPosts();
      } else {
        console.error('Post was not successful.');
      }
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
    expenseFormData,
    fetchPosts,
    postExpense,
  };
});
