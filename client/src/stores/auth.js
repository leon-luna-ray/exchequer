import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';

import { parseJwt } from '../utils/parseJwt';

export const useAuthStore = defineStore('auth', () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  console.log(API_BASE_URL)
  // State
  const isSingedIn = ref(false);
  const userProfile = ref(null);

  return {
    isSingedIn,
    userProfile,
  };
});
