/// <reference types="nuxt" />
// useState is available globally in Nuxt composables; reference `nuxt` types for editor support
export const useAuth = () => {
  const token = useState<string | null>('auth_token', () => null)
  const setToken = (t: string | null) => { token.value = t }
  const clear = () => { token.value = null }
  return { token, setToken, clear }
}
