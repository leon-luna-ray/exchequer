import axios from 'axios';
import { ref } from 'vue';
import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';
import { useAuthStore } from '@/stores/auth';
import { API_BASE_URL } from '@/lib/api';

export const useBudgetStore = defineStore('budget', () => {
  // Composables
  const auth = useAuthStore();
  const authState = useStorage('exchequer', { token: null });

  // State
  const userBudgets = ref([]);
  const budgetFormData = ref({
    title: '',
    description: '',
    amount: '',
    localCurrency: '',
  });

  // Setters
  const setUserBudgets = (value) => {
    userBudgets.value = value;
  };
  const clearUserData = () => {
    setUserBudgets([]);
  };
  const resetBudgetForm = () => {
    budgetFormData.value = {
      title: '',
      description: '',
      amount: '',
      // TODO set default to currency from user profile
      localCurrency: '',
    };
  };

  // Methods
  const fetchUserBudgets = async () => {
    try {
      const token = authState.value.token;

      if (token) {
        const response = await axios.get(`${API_BASE_URL}/budget`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUserBudgets(response.data.reverse());
      }
    } catch (error) {
      if (error.response.data.error === 'jwt expired') {
        auth.handleLogout();
      }
      console.error(error);
    }
  };

  const postNewBudget = async () => {
    try {
      const token = authState.value.token;
      const response = await axios.post(
        `${API_BASE_URL}/budget`,
        budgetFormData.value,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status >= 200 && response.status < 300) {
        resetBudgetForm();
        fetchUserBudgets();
      } else {
        console.error('Post was not successful.');
      }
    } catch (error) {
      console.error(error.response.data);
    }
  };

  const deleteBudget = async (id) => {
    try {
      const token = authState.value.token;
      const response = await axios.delete(`${API_BASE_URL}/budget/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        fetchUserBudgets();
      } else if (response.status === 404) {
        console.error('Post not found');
      } else {
        console.error('Could not delete the post');
      }
    } catch (error) {
      console.error(error.response.data);
    }
  };

  return {
    budgetFormData,
    userBudgets,
    clearUserData,
    deleteBudget,
    fetchUserBudgets,
    postNewBudget,
  };
});
