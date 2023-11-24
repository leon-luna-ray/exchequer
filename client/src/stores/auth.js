import axios from 'axios';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { defineStore } from 'pinia';
import { jwtDecode } from 'jwt-decode';
import { useStorage } from '@vueuse/core';
import { API_BASE_URL } from '@/lib/api';

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter();
  const authState = useStorage('exchequer', { token: null });

  // State
  const loginEmail = ref('');
  const loginPassword = ref('');
  const signupEmail = ref('');
  const signupPassword = ref('');
  const signupConfirmPassword = ref('');

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
  const resetSignupValues = (isResetAll) => {
    if (isResetAll) {
      signupEmail.value = '';
    }
    signupPassword.value = '';
    signupConfirmPassword.value = '';
  };
  const handleSignup = async () => {
    if (signupPassword.value !== signupConfirmPassword.value) {
      alert('Passwords do not match');
      resetSignupValues();
      return;
    }
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/register`, {
        email: signupEmail.value,
        password: signupPassword.value,
        confirmPassword: signupConfirmPassword.value,
      });

      if (response?.status === 200) {
        resetSignupValues(true);
        alert(response.data.message);
        router.push('/login');
      }
    } catch (error) {
      // TODO fix alert here, add alert if email already exists to backend
      resetSignupValues();
      alert('Signup failed.', error.response.data.error);
    }
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
    // tod need to sigbn out on backend also
    authState.value.token = null;
    router.push('/login');
  };

  return {
    loginEmail,
    loginPassword,
    signupEmail,
    signupPassword,
    signupConfirmPassword,
    user,
    handleLogin,
    handleLogout,
    handleSignup,
  };
});
