<template>
  <div class="border p-4 rounded-lg">
    <img :src="item.image" class="w-full h-40 object-cover rounded" />
    <h3 class="mt-2 font-semibold">{{ item.name }}</h3>
    <p class="text-gray-600">${{ item.price }}</p>
    <button
      @click="$emit('add', item)"
      class="mt-2 bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
    >
      Add to Cart
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps({
  item: Object,
});
defineEmits(["add"]);
</script>
