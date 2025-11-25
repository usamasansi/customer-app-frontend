<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const restaurantId = route.params.id;
const menus = ref([]);
const loading = ref(true);

onMounted(async () => {
  try {
    const res = await fetch(
      `http://127.0.0.1:8000/api/restaurants/${restaurantId}/menu`
    );
    menus.value = await res.json();
  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="p-6">
    <h1 class="text-3xl font-bold mb-4">🍽 Restaurant Menu</h1>

    <div v-if="loading" class="text-gray-500">Loading menu...</div>

    <div v-else-if="menus.length === 0" class="text-gray-500">
      No menu items found.
    </div>

    <div v-else class="grid md:grid-cols-3 gap-6">
      <div
        v-for="item in menus"
        :key="item.id"
        class="border rounded-lg p-4 shadow hover:shadow-lg transition"
      >
        <img :src="item.image" class="w-full h-40 object-cover rounded" />
        <h2 class="text-xl font-semibold mt-3">{{ item.name }}</h2>
        <p class="text-gray-600">{{ item.description }}</p>
        <p class="text-green-600 font-bold mt-2">Rs {{ item.price }}</p>
      </div>
    </div>
  </div>
</template>
