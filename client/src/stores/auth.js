import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';

import { parseJwt } from '../utils/parseJwt';

export const useAuthStore = defineStore('auth', () => {
  // Computed
  const googleEnabled = computed(() => {
    if (typeof window === 'undefined' || !window.google) {
      return false;
    }
    return true;
  });

  // Methods
  const login = async ({ credential }) => {
    const profileObj = credential ? parseJwt(credential) : null;

    if (profileObj) {
      localStorage.setItem(
        'user',
        JSON.stringify({
          ...profileObj,
        })
      );
      localStorage.setItem('bt-token', `${credential}`);

      return {
        success: true,
      };
    }

    return {
      success: false,
    };
  };
  const logout = async () => {
    const token = localStorage.getItem('token');

    if (token && typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      axios.defaults.headers.common = {};
      window.google?.accounts.id.revoke(token, () => {
        return {};
      });
    }

    return {
      success: true,
      redirectTo: '/login',
    };
  };
  const onError = async (error) => {
    console.error(error);
    return { error };
  };
  const check = async () => {
    const token = localStorage.getItem('token');

    if (token) {
      return {
        authenticated: true,
      };
    }

    return {
      authenticated: false,
      error: {
        message: 'Check failed',
        name: 'Not authenticated',
      },
      logout: true,
      redirectTo: '/login',
    };
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
    login,
  };
});
