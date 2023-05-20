import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';

export const useAuthStore = defineStore('auth', () => {
  const googleEnabled = computed(() => {
    if (typeof window === 'undefined' || !window.google) {
      return false;
    }
    return true;
  });

  return {
    googleEnabled,
  };
});
