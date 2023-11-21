import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: () => import('../pages/HomePage.vue'),
    name: 'Home',
  },
  {
    path: '/login',
    component: () => import('../pages/LoginPage.vue'),
    name: 'Login',
  },
  {
    path: '/signup',
    component: () => import('../pages/SignupPage.vue'),
    name: 'Signup',
  },
  {
    path: '/dashboard',
    component: () => import('../pages/DashboardPage.vue'),
    name: 'Dashboard',
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});


export default router;
