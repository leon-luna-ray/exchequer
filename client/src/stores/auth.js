import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';

import { parseJwt } from '../utils/parseJwt';

export const useAuthStore = defineStore('auth', () => {
  // State
  const isSingedIn = ref(false);
  const baseApiUrl = 'http://localhost:8080';

  // Computed
  const googleEnabled = computed(() => {
    if (typeof window === 'undefined' || !window.google) {
      return false;
    }
    return true;
  });

  // Methods
  const signIn = async ({ credential }) => {
    const profileObj = credential ? parseJwt(credential) : null;

    if (profileObj) {
      const res = await fetch(`${baseApiUrl}/api/v1/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: profileObj.name,
          email: profileObj.email,
        }),
      });
      const data = await res.json();

      if (res.status === 200) {
        console.log(res)
        localStorage.setItem(
          'bt-user',
          JSON.stringify({
            ...profileObj,
            userid: data._id,
          })
        );
      } else {
        console.log('not res 200')
        isSingedIn.value = false;
        return Promise.reject;
      }
    }

    localStorage.setItem('bt-token', `${credential}`);
    // Todo use vue-use to create a reactive computed property if local storage
    isSingedIn.value = true;

    return Promise.resolve();
  };

  const signOut = async () => {
    const token = localStorage.getItem('bt-token');

    if (token && typeof window !== 'undefined') {
      localStorage.removeItem('bt-token');
      localStorage.removeItem('bt-user');
      axios.defaults.headers.common = {};
      window.google?.accounts.id.revoke(token, () => {
        return Promise.resolve();
      });

      isSingedIn.value = false;
      // Todo find if there is a better solution to reloading the page to get, redirect?
      location.reload();
    }

    // return Promise.resolve();
  };
  const checkError = () => Promise.resolve();

  const checkAuth = async () => {
    const token = localStorage.getItem('bt-token');
    if (token) {
      isSingedIn.value = true;
      return Promise.resolve();
    }
    return Promise.reject();
  };
  const getPermissions = () => Promise.resolve();

  const getIdentity = async () => {
    const user = localStorage.getItem('bt-user');
    if (user) {
      return Promise.resolve(JSON.parse(user));
    }
  };

  return {
    googleEnabled,
    isSingedIn,
    checkAuth,
    getIdentity,
    signIn,
    signOut,
  };
});
