// composables/useApi.ts
import { useAuthStore } from '~/stores/auth'
import axios from 'axios'

export function useApi() {
  const auth = useAuthStore()
  const baseURL = 'http://localhost:8000/api' // ← your Laravel API URL

  const api = axios.create({
    baseURL,
    headers: {
      Accept: 'application/json',
    },
  })

  // attach token if logged in
  api.interceptors.request.use((config) => {
    if (auth.token) {
      config.headers.Authorization = `Bearer ${auth.token}`
    }
    return config
  })

  return api
}
