<template>
  <div class="min-h-screen flex items-center justify-center p-6">
    <div class="max-w-md w-full bg-white p-6 rounded shadow">
      <h1 class="text-xl font-bold mb-4">Email Verification</h1>

      <!-- Loading -->
      <div v-if="loading" class="mb-4">Checking...</div>

      <!-- Verified -->
      <div v-if="verified" class="text-green-600 font-semibold mb-4">
        ✅ Your email has been verified!
      </div>

      <!-- Already Verified -->
      <div v-else-if="alreadyVerified" class="text-blue-600 font-semibold mb-4">
        ✔ Your email is already verified.
      </div>

      <!-- Not verified yet -->
      <div v-else class="mb-4">
        📩 A verification link has been sent to your email.
      </div>

      <button
        v-if="!verified && !alreadyVerified"
        @click="resendEmail"
        :disabled="resending"
        class="bg-blue-600 text-black px-4 py-2 rounded"
      >
        {{ resending ? "Sending…" : "Resend Verification Email" }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "~/stores/auth";
import { useToast } from "vue-toastification";

const auth = useAuthStore();
const route = useRoute();
const router = useRouter();
const toast = useToast();
const config = useRuntimeConfig();
const apiBase = config.public.apiBase;

const verified = ref(false);
const alreadyVerified = ref(false);
const loading = ref(true);
const resending = ref(false);

// Protect page: If user not logged in, redirect
if (!auth.token) {
  router.push("/login");
}

async function verifyEmail() {
  const id = route.query.id;
  const hash = route.query.hash;

  loading.value = true;

  // If user is already verified
  if (auth.user?.email_verified_at) {
    alreadyVerified.value = true;
    loading.value = false;
    return;
  }

  // If clicked on link from email
  if (id && hash) {
    try {
      const res = await $fetch(`${apiBase}/email/verify/${id}/${hash}`);
      verified.value = true;

      // Refresh user profile in store
      await auth.fetchUser();

      toast.success("Email verified!");
    } catch (err) {
      toast.error("Verification failed");
    } finally {
      loading.value = false;
    }
    return;
  }

  // Otherwise → send verification email automatically
  try {
    await $fetch(`${apiBase}/email/verify/resend`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    });

    toast.success("Verification email sent!");
  } catch (err) {
    toast.error("Failed to send verification email");
  } finally {
    loading.value = false;
  }
}

async function resendEmail() {
  resending.value = true;
  try {
    const res = await $fetch(`${apiBase}/email/verify/resend`, {
      method: "POST",
      headers: { Authorization: `Bearer ${auth.token}` },
    });
    toast.success(res.message || "Sent again!");
  } catch (err) {
    toast.error("Failed");
  } finally {
    resending.value = false;
  }
}

onMounted(() => verifyEmail());
</script>
