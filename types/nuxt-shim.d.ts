// Minimal shims for Nuxt runtime helpers to keep editors happy

declare function useState<T>(key: string, init?: () => T): { value: T }

declare module 'nuxt' {}
