// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from '@primeuix/themes/aura';

export default defineNuxtConfig({
  // compatibilityDate: '2025-08-24',
  runtimeConfig: {
    openaqApiKey: process.env.OPENAQ_API_KEY
  },
  modules: [
      '@primevue/nuxt-module'
  ],
  primevue: {
    usePrimeVue: true,
    options: {
        theme: {
            preset: Aura,
            options: {
              prefix: 'p-',
              // Scope all PrimeVue styles to this class
              darkModeSelector: '.dark-theme',
            }
        }
    }
  },
  devtools: { enabled: true },
  // css: [
  //   "~/assets/css/reset.css",
  //   "~/assets/css/variables.css",
  //   "~/assets/css/base.css",
  //   "~/assets/css/components/icon.css",
  //   "~/assets/css/components/health-alert.css",
  //   "~/assets/css/components/weather-card.css",
  // ],
  // postcss: {
  //   plugins: {
  //     autoprefixer: {},
  //   },
  // },
});
