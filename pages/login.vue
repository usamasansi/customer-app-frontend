<template>
  <div class="max-w-md mx-auto p-6">
    <h2 class="text-2xl font-bold mb-4">Login</h2>
    <form @submit.prevent="handleLogin">
      <input
        v-model="email"
        placeholder="Email"
        class="border p-2 w-full mb-2"
      />
      <input
        v-model="password"
        type="password"
        placeholder="Password"
        class="border p-2 w-full mb-2"
      />
      <br />
      <button type="submit" class="bg-blue-600 black p-2 w-full rounded">
        Login
      </button>
    </form>
    <br />
    <p class="text-sm mt-3">
      Don’t have an account?
      <NuxtLink to="/signup" class="text-blue-600">Sign up</NuxtLink>
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "~/stores/auth";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const auth = useAuthStore();
const router = useRouter();

const handleLogin = async () => {
  try {
    console.log("Login payload:", email.value, password.value);
    await auth.login(email.value, password.value);
    router.push("/");
  } catch (err) {
    console.error("Login error:", err);
    alert("Login failed. Check your credentials.");
  }
};

</script>
