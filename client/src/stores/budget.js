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

  // Setters
  const setUserBudgets = (value) => {
    userBudgets.value = value;
  };
  const clearUserData = () => {
    setUserBudgets([]);
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

  return { userBudgets, clearUserData, fetchUserBudgets };
});
