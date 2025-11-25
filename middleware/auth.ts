import { defineNuxtRouteMiddleware, navigateTo } from '#app';
import { useAuthStore } from '~/stores/auth';

export default defineNuxtRouteMiddleware(async () => {
  const authStore = useAuthStore();

  if (!authStore.token) {
    if (process.client) {
      const token = localStorage.getItem('auth_token');
      if (!token) return navigateTo('/login');

      authStore.setToken(token);
      await authStore.getUser();
    } else {
      return navigateTo('/login');
    }
  }
});
