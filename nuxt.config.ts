import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  vite: {
    plugins: [tailwindcss()],
  },
  css: ["~/assets/css/main.css"],
  modules: [
    "@nuxt/eslint",
    "@nuxt/image",
    "@nuxt/scripts",
    "@nuxt/test-utils",
    "@nuxt/ui",
    "@pinia/nuxt",
    "@vee-validate/nuxt",
    "nuxt-auth-utils",
  ],
  ui: {
    prefix: "Nuxt",
  },
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_URL || "https://api.example.com",
      appName: "My Nuxt App",
      appVersion: "1.0.0",
    },
  },
  plugins: ["~/plugins/repositories.ts"],
});
