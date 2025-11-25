<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRestaurantStore } from "~/stores/restaurant";
import { useCartStore } from "~/stores/cart";
import { useToast } from "vue-toastification";

const restaurantStore = useRestaurantStore();
const cartStore = useCartStore();
const toast = useToast();

const search = ref("");
const quantities = ref<{ [key: number]: number }>({});

onMounted(() => {
  restaurantStore.fetchRestaurants();
});

function increment(id: number) {
  quantities.value[id] = (quantities.value[id] || 1) + 1;
}
function decrement(id: number) {
  if (quantities.value[id] > 1) quantities.value[id]--;
}

function addToCart(item: any) {
  const qty = quantities.value[item.id] || 1;
  cartStore.addToCart(item, qty);
  toast.success(`${item.name} added to cart!`);
}

const filteredMenus = computed(() =>
  restaurantStore.restaurants.filter((item) =>
    item.name.toLowerCase().includes(search.value.toLowerCase())
  )
);
</script>

<template>
  <v-container>
    <v-row class="align-center mb-4">
      <v-col cols="12" md="8">
        <h1 class="text-3xl font-bold">🍽 Menu List</h1>
      </v-col>
      <v-col cols="12" md="4">
        <v-text-field
          v-model="search"
          label="Search food..."
          variant="outlined"
          prepend-inner-icon="mdi-magnify"
        />
      </v-col>
    </v-row>

    <v-row v-if="restaurantStore.loading" justify="center">
      <v-progress-circular indeterminate color="green" />
    </v-row>

    <v-row v-else>
      <v-col
        v-for="item in filteredMenus"
        :key="item.id"
        cols="12"
        sm="6"
        md="4"
      >
        <v-card elevation="4" class="rounded-xl">
          <v-img :src="item.image_url" height="180" cover></v-img>

          <v-card-title>{{ item.name }}</v-card-title>
          <v-card-subtitle class="text-green-600 font-bold">
            Rs {{ item.price }}
          </v-card-subtitle>

          <v-card-text>
            <p class="text-gray-600 mb-2">{{ item.description }}</p>

            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <v-btn
                  size="small"
                  variant="tonal"
                  color="red"
                  @click="decrement(item.id)"
                  >-</v-btn
                >
                <span>{{ quantities[item.id] || 1 }}</span>
                <v-btn
                  size="small"
                  variant="tonal"
                  color="green"
                  @click="increment(item.id)"
                  >+</v-btn
                >
              </div>

              <v-btn
                color="primary"
                variant="elevated"
                @click="
                  () => {
                    const qty = quantities[item.id] || 1;
                    cartStore.addToCart(item, qty);
                    toast.success(`${qty} × ${item.name} added to cart!`);
                  }
                "
              >
                🛒 Add
              </v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
