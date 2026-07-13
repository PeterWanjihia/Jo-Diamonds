export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  devtools: {
    enabled: process.env.NODE_ENV !== 'production',
  },

  css: [
    '~/assets/css/tokens.css',
    '~/assets/css/base.css',
  ],

  runtimeConfig: {
    public: {
      appEnvironment: 'development',
      apiBaseUrl: 'http://127.0.0.1:4000/v1',
      siteUrl: 'http://localhost:3000',
    },
  },

  app: {
    head: {
      htmlAttrs: {
        lang: 'en',
      },

      title: 'JO.DIAMONDS',

      titleTemplate: '%s · JO.DIAMONDS',

      meta: [
        {
          name: 'description',
          content:
            'Exceptional jewellery selected for character, craftsmanship and lasting presence.',
        },
        {
          name: 'theme-color',
          content: '#0d0d0c',
        },
      ],
    },
  },
});
