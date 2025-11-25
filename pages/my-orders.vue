<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useAuthStore } from "~/stores/auth";
import { useRuntimeConfig } from "#app";

const config = useRuntimeConfig();
const auth = useAuthStore();
const orders = ref<any[]>([]);
const loading = ref(true);
console.log("Actual Token:", auth.token);

onMounted(async () => {
  try {
    const res = await $fetch(`${config.public.apiBase}/my-orders`, {
      headers: {
        Authorization: `Bearer ${auth.token}`,
        Accept: "application/json",
      },
    });
    orders.value = res.data || res;
  } catch (e) {
    console.error("Error fetching orders", e);
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <v-container class="py-10">
    <h2 class="text-h5 font-semibold mb-4">🧾 My Orders</h2>

    <v-progress-circular
      v-if="loading"
      indeterminate
      color="green"
    ></v-progress-circular>

    <v-row v-else>
      <v-col cols="12" v-if="orders.length === 0">
        <v-alert color="info" variant="tonal">You have no orders yet.</v-alert>
      </v-col>

      <v-col v-for="order in orders" :key="order.id" cols="12" md="6" lg="4">
        <v-card class="p-4">
          <p>
            <strong>Order #{{ order.id }}</strong>
          </p>
          <p>Status: {{ order.status }}</p>
          <p>Total: ${{ order.total }}</p>
          <p>Date: {{ new Date(order.created_at).toLocaleString() }}</p>

          <v-divider class="my-2" />

          <div v-for="item in order.items" :key="item.id" class="mb-1">
            <p>
              {{ item.menu.name }} — x{{ item.quantity }} (${{ item.price }})
            </p>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
