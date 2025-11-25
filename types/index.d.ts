// Project global types

declare global {
  interface Window {
    // Nuxt injects a global __NUXT__ object at runtime. Use a permissive but compatible shape.
    __NUXT__?: Record<string, any> | Record<string, Record<string, any>>
  }
}

export {}
