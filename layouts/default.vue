<script setup lang="ts">
import { useCartStore } from "~/stores/cart";
import { useRouter } from "vue-router";

const cart = useCartStore();
const router = useRouter();

function goToCart() {
  router.push("/cart");
}
</script>

<template>
  <v-app>
    <v-app-bar color="green-darken-2" dark flat>
      <v-toolbar-title
        class="text-h6 font-semibold cursor-pointer"
        @click="router.push('/restaurants')"
      >
        🍴 FoodApp
      </v-toolbar-title>

      <v-spacer></v-spacer>
      <div>
        <header>
          <nav>
            <NuxtLink to="/profile">Profile</NuxtLink>
            |
            <NuxtLink to="/my-orders">My Orders</NuxtLink>
            |
            <NuxtLink to="/email-verify">Email Verify</NuxtLink>
            |
            <NuxtLink to="/">Menu Lists</NuxtLink>
          </nav>
        </header>
      </div>

      <!-- Cart Icon with badge -->
      <v-btn icon @click="goToCart">
        <v-badge
          :content="cart.count"
          color="red"
          v-if="cart.count > 0"
          overlap
        >
          <v-icon size="28">mdi-cart</v-icon>
        </v-badge>
        <v-icon v-else size="28">mdi-cart-outline</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <slot />
    </v-main>
  </v-app>
</template>
