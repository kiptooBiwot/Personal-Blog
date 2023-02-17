// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    apiSecret: '',
    public: {
      apiBase: '',
    }
  },
  modules: [
    '@formkit/nuxt',
    '@vueuse/nuxt',
    // '@nuxtjs/universal-storage',
    [
      '@pinia/nuxt',
      {
        autoImports: [
          // automatically imports `defineStore`
          'defineStore', // import { defineStore } from 'pinia'
          // automatically imports `defineStore` as `definePiniaStore`
          ['defineStore', 'definePiniaStore'], // import { defineStore as definePiniaStore } from 'pinia'
        ],
      },
    ]
  ],
  buildModules: [
    '@nuxtjs/google-fonts'
  ],
  css: ['~/assets/css/main.css'],
  plugins: ['~/plugins/QuillEditor.client.js'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  runtimeConfig: {
    // baseURL: process.env.NUXT_APP_BASE_URL || '/'
    public: {
      BASE_API: process.env.NUXT_API_BASE_URL
    }
  }
})
