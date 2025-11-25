import { defineStore } from 'pinia';
import { useRuntimeConfig } from '#app';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: process.client ? localStorage.getItem('auth_token') : null,
    user: null as Record<string, any> | null,
    ready: false,
  }),
  getters: {
    isLoggedIn: (state) => !!state.token && !!state.user,
  },


  actions: {

    async initAuth() {
  if (!process.client) return;
  console.log('🔐 Trying to restore user with token...');

  const storedToken = localStorage.getItem('auth_token');
  if (storedToken) {
    this.token = storedToken;
    try {
      await this.getUser();
      console.log('✅ User restored:', this.user);
    } catch (err) {
      console.error('❌ Failed to restore user:', err);
      this.logout();
    }
  }
  this.ready = true; // <-- mark as loaded (even if no token)
},



    async signup(name: string, email: string, password: string) {
      const config = useRuntimeConfig();
      const res = await $fetch(`${config.public.apiBase}/signup`, {
        method: 'POST',
        body: { name, email, password },
      });

      if (res.token) {
        this.setToken(res.token);
        this.user = res.user;
      }
    },

    async login(email: string, password: string) {
      const config = useRuntimeConfig();
      const res = await $fetch(`${config.public.apiBase}/login`, {
        method: 'POST',
        body: { email, password },
      });

      if (res.token) {
        this.setToken(res.token);
        this.user = res.user;
      }
    },

    async getUser() {
      const config = useRuntimeConfig();
      try {
        const data = await $fetch(`${config.public.apiBase}/me`, {
          headers: { Authorization: `Bearer ${this.token}` },
        });
        this.user = data;
      } catch (err) {
        console.error('Error fetching user:', err);
      }
    },

    logout() {
      this.token = null;
      this.user = null;
      localStorage.removeItem('auth_token');
      navigateTo('/login');
    },

    setToken(token: string) {
      this.token = token;
      if (process.client) {
        localStorage.setItem('auth_token', token);
      }
    },
  },
});
