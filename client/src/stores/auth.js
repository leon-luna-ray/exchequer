import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

export const useAuthStore = defineStore('auth', () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const router = useRouter();
  const authState = useStorage('exchequer', { token: null });

  // State
  const loginEmail = ref('');
  const loginPassword = ref('');

  // Computed
  const user = computed(() => {
    if (authState.value.token) {
      const decodedToken = jwtDecode(authState.value.token);

      return {
        id: decodedToken.userId,
        email: decodedToken.email,
      };
    }
    return null;
  });

  // Methods
  const resetLoginValues = () => {
    loginEmail.value = '';
    loginPassword.value = '';
  };
  const handleLogin = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        email: loginEmail.value,
        password: loginPassword.value,
      });

      const token = response.data.token;

      if (token) {
        authState.value.token = token;
        resetLoginValues();
        // TODO check auth on backend as well
        router.push('/dashboard');
      }
    } catch (error) {
      console.error('Login failed:', error.response.data.error);
      resetLoginValues();
    }
  };
  const handleLogout = () => {
    authState.value.token = null;
    router.push('/login');
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
    loginEmail,
    loginPassword,
    user,
    handleLogin,
    handleLogout,
  };
});
