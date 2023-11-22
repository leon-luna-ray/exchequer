import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';

import { parseJwt } from '../utils/parseJwt';

export const useAuthStore = defineStore('auth', () => {
  // State
  const isSingedIn = ref(false);
  const userProfile = ref(null);

  return {
    isSingedIn,
    userProfile,
  };
});
