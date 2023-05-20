import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';

import { parseJwt } from '../utils/parseJwt';

export const useAuthStore = defineStore('auth', () => {
  // State
  const isSingedIn = ref(false);

  // Computed
  const googleEnabled = computed(() => {
    if (typeof window === 'undefined' || !window.google) {
      return false;
    }
    return true;
  });

  // Setters

  // Methods
  const signIn = async ({ credential }) => {
    const profileObj = credential ? parseJwt(credential) : null;

    if (profileObj) {
      localStorage.setItem(
        'bt-user',
        JSON.stringify({
          ...profileObj,
        })
      );
      localStorage.setItem('bt-token', `${credential}`);
      isSingedIn.value = true;
      return {
        success: true,
      };
    }
    isSingedIn.value = false;
    return {
      success: false,
    };
  };
  const signOut = async () => {
    const token = localStorage.getItem('bt-token');

    if (token && typeof window !== 'undefined') {
      localStorage.removeItem('bt-token');
      localStorage.removeItem('bt-user');
      axios.defaults.headers.common = {};
      window.google?.accounts.id.revoke(token, () => {
        return {};
      });
      isSingedIn.value = false;
      // Todo find if there is a better solution to reloading the page
      location.reload();
    }

    return {
      success: true,
    //   redirectTo: '/login',
    };
  };
  const onError = async (error) => {
    console.error(error);
    return { error };
  };
  const checkAuth = async () => {
    const token = localStorage.getItem('bt-token');
    if (token) {
      isSingedIn.value = true;
    }
  };
  const getPermissions = async () => null;
  const getIdentity = async () => {
    const user = localStorage.getItem('user');
    if (user) {
      return JSON.parse(user);
    }

    return null;
  };

  return {
    googleEnabled,
    isSingedIn,
    checkAuth,
    signIn,
    signOut,
  };
});
