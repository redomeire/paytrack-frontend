import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/test-utils',
    '@nuxt/ui',
    '@pinia/nuxt',
    '@vee-validate/nuxt',
    'nuxt-auth-utils',
    'nuxt-echarts'
  ],
  plugins: [
    '~/plugins/api.ts',
    '~/plugins/repositories.ts',
    '~/plugins/useCases.ts'
  ],
  devtools: { enabled: false },
  css: ['~/assets/css/main.css'],
  ui: {
    prefix: 'Nuxt'
  },
  runtimeConfig: {
    public: {
      apiBase: '/api/v1',
      appName: 'My Nuxt App',
      appVersion: '1.0.0'
    },
    session: {
      maxAge: 60 * 60 * 24 * 15, // 15 days
      password: process.env.NUXT_SESSION_PASSWORD || 'default_password'
    }
  },
  compatibilityDate: '2025-07-15',
  nitro: {
    routeRules: {
      '/api/v1/**': {
        proxy: `${process.env.NUXT_PUBLIC_API_URL}/api/v1/**`
      }
    }
  },
  vite: {
    plugins: [tailwindcss()]
  },
  eslint: {
    checker: true,
    config: {
      stylistic: {
        indent: 2,
        quotes: 'single',
        semi: false,
        arrowParens: true,
        blockSpacing: true,
        commaDangle: 'never'
      }
    }
  }
})
