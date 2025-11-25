<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useAuthStore } from "~/stores/auth";
import { useRuntimeConfig } from "#app";

const config = useRuntimeConfig();
const auth = useAuthStore();

// -------------------------------
// ✅ NEW: User State + loadUser()
// -------------------------------
const user = ref<any>(null);

async function loadUser() {
  const token = useCookie("token").value || localStorage.getItem("token");

  if (!token) return;

  try {
    user.value = await $fetch(`${config.public.apiBase}/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (e) {
    console.error("Error loading user (loadUser)", e);
  }
}

// -------------------------------
// Existing Profile State
// -------------------------------
const profile = ref<any>(null);
const loading = ref(true);

onMounted(async () => {
  try {
    await loadUser(); // ✅ NEW: Load user first

    const res = await $fetch(`${config.public.apiBase}/me`, {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    });

    profile.value = res;
  } catch (e) {
    console.error("Error fetching profile", e);
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <v-container class="py-10">
    <h2 class="text-h5 font-semibold mb-4">👤 My Profile</h2>

    <v-card v-if="loading" class="p-4 text-center">
      <v-progress-circular indeterminate color="green"></v-progress-circular>
    </v-card>

    <v-card v-else class="p-4">
      <p><strong>Name:</strong> {{ profile?.name }}</p>
      <p>
        <strong>Email:</strong>
        {{ profile?.email }}

        <span v-if="profile?.email_verified_at" class="verified"> ✔️ </span>
        <span v-else class="not-verified"> ❌ Not Verified </span>
        {{ profile?.email }}
      </p>
      <p>{{ user?.email }}</p>
      <p>
        <strong>Joined:</strong>
        {{ new Date(profile?.created_at).toLocaleDateString() }}
      </p>
    </v-card>
  </v-container>
</template>

<style scoped>
.verified {
  color: #2196f3; /* blue */
  font-weight: bold;
  margin-left: 6px;
}

.not-verified {
  color: #f44336; /* red */
  margin-left: 6px;
}
</style>
