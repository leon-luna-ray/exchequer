import { createRouter, createWebHistory } from 'vue-router';
import { useStorage } from '@vueuse/core';

const authState = useStorage('exchequer', { token: null });

const routes = [
  {
    path: '/',
    component: () => import('@/pages/HomePage.vue'),
    name: 'Home',
  },
  {
    path: '/login',
    component: () => import('@/pages/LoginPage.vue'),
    name: 'Login',
  },
  {
    path: '/register',
    component: () => import('@/pages/SignupPage.vue'),
    name: 'Register',
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/pages/DashboardPage.vue'),
    beforeEnter: (to, from, next) => {
      if (authState.value.token) {
        next();
      } else {
        next('/login');
      }
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
