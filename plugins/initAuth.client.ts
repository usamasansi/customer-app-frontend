import { useAuthStore } from '~/stores/auth'

export default defineNuxtPlugin(async (nuxtApp) => {
  console.log('🔄 initAuth plugin loaded')  // <-- add this log
  const auth = useAuthStore()
  await auth.initAuth()
  // Initialize only once
  if (!auth.token && process.client) {
    const storedToken = localStorage.getItem('auth_token')
    if (storedToken) {
      auth.token = storedToken
      try {
        await auth.getUser()
      } catch (e) {
        console.error('Failed to restore session:', e)
        auth.logout()
      }
    }
  }
})
