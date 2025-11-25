import { defineStore } from 'pinia';
import { useApi } from '~/composables/useApi';

export const useRestaurantStore = defineStore('restaurant', {
  state: () => ({
    restaurants: [] as any[],
    loading: false,
  }),

  actions: {
    async fetchRestaurants() {
      const api = useApi(); // ✅ Custom axios instance
      this.loading = true;
      try {
        const res = await api.get('/restaurants');
        this.restaurants = res.data; // ✅ Axios wraps response in `data`
      } catch (err) {
        console.error('Error fetching restaurants:', err);
      } finally {
        this.loading = false;
      }
    },
  },
});
