<script setup lang="ts">
import { useCartStore } from "~/stores/cart";
import { useAuthStore } from "~/stores/auth";
import axios from "axios";
import { useToast } from "vue-toastification";
const auth = useAuthStore();
const cart = useCartStore();
const toast = useToast();
const config = useRuntimeConfig();

const placeOrder = async () => {
  try {
    const requestData = {
      items: cart.items.map((item) => ({
        id: item.id,
        price: item.price,
        quantity: item.quantity,
        restaurant_id: item.restaurant_id,
        menu_id: item.menu_id,
      })),
    };

    const response = await axios.post(
      `${config.public.apiBase}/orders`,
      requestData,
      {
        headers: {
          Authorization: `Bearer ${auth.token}`,
          Accept: "application/json",
          "X-Requested-With": "XMLHttpRequest",
        },
      }
    );

    toast.success("Order placed successfully!");
    cart.clearCart();
  } catch (error: any) {
    console.error(error.response?.data || error);
    toast.error("Failed to place order");
  }
};
</script>

<template>
  <v-container class="py-8">
    <h1 class="text-3xl font-bold mb-6">🛒 Your Cart</h1>

    <v-alert
      v-if="cart.items.length === 0"
      type="info"
      text="Your cart is empty."
      class="my-6"
    />

    <v-card
      v-for="item in cart.items"
      :key="item.id"
      class="mb-4 p-4 d-flex align-center justify-space-between"
      elevation="2"
    >
      <div class="flex items-center gap-4">
        <v-img
          :src="item.image_url || '/placeholder.jpg'"
          max-width="70"
          max-height="70"
          class="rounded-lg"
        />
        <div>
          <h3 class="font-semibold text-lg">{{ item.name }}</h3>
          <p class="text-gray-500">
            Rs {{ item.price }} × {{ item.quantity }} =
            <span class="font-bold text-green-600">
              Rs {{ item.price * item.quantity }}
            </span>
          </p>
        </div>
      </div>

      <v-btn color="error" @click="cart.removeFromCart(item.id)"
        >🗑 Remove</v-btn
      >
    </v-card>

    <v-divider v-if="cart.items.length > 0" class="my-4" />

    <div
      v-if="cart.items.length > 0"
      class="flex justify-between text-xl font-bold"
    >
      <span>Total:</span>
      <span>Rs {{ cart.total }}</span>
    </div>

    <v-btn
      v-if="cart.items.length > 0"
      color="blue"
      class="mt-6 w-full"
      size="large"
      @click="placeOrder"
    >
      💳 Proceed to Checkout
    </v-btn>
  </v-container>
</template>
