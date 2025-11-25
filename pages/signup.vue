<template>
  <div class="max-w-md mx-auto p-6">
    <h2 class="text-2xl font-bold mb-4">Create Account</h2>
    <form @submit.prevent="handleSignup">
      <input v-model="name" placeholder="Name" class="border p-2 w-full mb-2" />
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

      <button type="submit" class="bg-green-600 text-black p-2 w-full rounded">
        Sign Up
      </button>
    </form>
    <p class="text-sm mt-3">
      Already have an account?
      <NuxtLink to="/login" class="text-blue-600">Login</NuxtLink>
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "~/stores/auth";
import { useRouter } from "vue-router";

const name = ref("");
const email = ref("");
const password = ref("");
const auth = useAuthStore();
const router = useRouter();

const handleSignup = async () => {
  try {
    await auth.signup(name.value, email.value, password.value);
    router.push("/");
  } catch (err) {
    console.error(err);
    alert("Signup failed. Try again.");
  }
};
</script>
