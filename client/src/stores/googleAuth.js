import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';

import { parseJwt } from '../utils/parseJwt';

export const useGoogleAuthStore = defineStore('googleAuth', () => {
  // State
  const isSingedIn = ref(false);
  const userProfile = ref(null);
  const baseApiUrl = import.meta.env.VITE_APP_BASE_API_URL;

  // Computed
  const isGoogleEnabled = computed(() => {
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
        isSingedIn.value = true;
        userProfile.value = profileObj;
        localStorage.setItem(
          'bt-user',
          JSON.stringify({
            ...profileObj,
            userid: data._id,
          })
        );
      } else {
        isSingedIn.value = false;
      }
    }

    localStorage.setItem('bt-token', `${credential}`);
  };

  const signOut = async () => {
    const token = localStorage.getItem('bt-token');

    if (token && typeof window !== 'undefined') {
      localStorage.removeItem('bt-token');
      localStorage.removeItem('bt-user');
      axios.defaults.headers.common = {};
      window.google?.accounts.id.revoke(token, () => {
        return;
      });

      isSingedIn.value = false;
      location.reload();
    }
  };
  const checkError = () => Promise.resolve();

  const checkAuth = async () => {
    const token = localStorage.getItem('bt-token');
    if (token) {
      isSingedIn.value = true;
    }
  };
  const getPermissions = () => Promise.resolve();

  const getIdentity = async () => {
    const user = localStorage.getItem('bt-user');
    if (user) {
      return JSON.parse(user);
    }
  };
  // TODO re-add google auth as a signin option
  // const {
  //     isGoogleEnabled,
  //     isSingedIn,
  //     userProfile,
  // } = storeToRefs(authStore);
  // const loginButton = ref(null);
  // onMounted(() => {
  // TOdo allow for google or email login
  // if (!isGoogleEnabled.value || isSingedIn.value) return
  // try {
  //     window.google.accounts.id.initialize({
  //         ux_mode: "popup",
  //         client_id: import.meta.env.VITE_APP_GOOGLE_CLIENT_ID,
  //         callback: async (res) => {
  //             if (res.credential) {
  //                 authStore.signIn(res);
  //             }
  //         },
  //     });
  //     window.google.accounts.id.renderButton(loginButton.value, {
  //         theme: "filled_blue",
  //         size: "medium",
  //         type: "standard",
  //     });
  // } catch (error) {
  //     console.log(error);
  // }
  // })

  return {
    isGoogleEnabled,
    isSingedIn,
    userProfile,
    checkAuth,
    getIdentity,
    signIn,
    signOut,
  };
});
