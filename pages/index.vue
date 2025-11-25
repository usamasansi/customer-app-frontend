<script setup lang="ts">
import { useAuthStore } from "~/stores/auth";
import { useRestaurantStore } from "~/stores/restaurant";
import { onMounted } from "vue";
definePageMeta({ middleware: "auth" });

const auth = useAuthStore();

const restaurantStore = useRestaurantStore();
await restaurantStore.fetchRestaurants();
</script>

<template>
  <div class="p-6 text-center">
    <h1 class="text-3xl font-bold mb-4">Welcome, {{ auth.user?.name }}</h1>
    <p class="text-gray-600 mb-6">You’re logged into the Customer App 🚀</p>
    <button
      @click="auth.logout"
      class="bg-red-600 text-black px-4 py-2 rounded"
    >
      Logout
    </button>
  </div>

  <div class="p-6">
    <h1 class="text-3xl font-bold mb-4">🍴 Restaurants</h1>

    <div v-if="restaurantStore.loading" class="text-gray-500">Loading...</div>

    <div>
      <a href="/restaurants"><h2>🍽 Menu List</h2></a>

      <div v-for="res in restaurantStore.restaurants" :key="res.id">
        <h3>{{ res.name }}</h3>
        <img :src="res.image" alt="" />
      </div>
    </div>
  </div>
</template>
