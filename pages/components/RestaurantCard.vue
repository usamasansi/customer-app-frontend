<template>
  <div
    class="border rounded-lg p-4 hover:shadow cursor-pointer"
    @click="$router.push(`/restaurants/${restaurant.id}`)"
  >
    <img
      :src="restaurant.image"
      alt=""
      class="w-full h-40 object-cover rounded"
    />
    <h3 class="mt-2 font-semibold">{{ restaurant.name }}</h3>
    <p class="text-sm text-gray-500">{{ restaurant.address }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps({
  restaurant: Object,
});
</script>
