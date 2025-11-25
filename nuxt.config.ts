// nuxt.config.ts
import { defineNuxtConfig } from 'nuxt/config'
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  app: {
    head: {
      link: [
        { rel: "icon", type: "image/png", href: "/favicon.ico" }
      ]
    }
  },
  build: {
    transpile: ['vuetify'],
    
  },

  modules: [
    '@pinia/nuxt',
    // Add Vuetify as a Vite plugin
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config: any) => {
        config.plugins = config.plugins || []
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
  ],

  vite: {
    vue: {
      template: { transformAssetUrls },
    },
  },

  css: [
    'vuetify/styles',
    '@mdi/font/css/materialdesignicons.css',
  ],

  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_API_BASE || 'http://127.0.0.1:8000/api',
    },
  },
  nitro: {
  routeRules: {
    "/api/**": { proxy: "http://127.0.0.1:8000/api/**" }
  }
},


  plugins: [
    '~/plugins/initAuth.client.ts'
  ],

  devtools: { enabled: true },
})
