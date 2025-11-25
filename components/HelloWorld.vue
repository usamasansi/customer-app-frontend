<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ msg?: string }>()
const msg = props.msg ?? 'Hello, Nuxt!'
</script>

<style scoped>
.hello { text-align: center; padding: 1.5rem; }
</style>
