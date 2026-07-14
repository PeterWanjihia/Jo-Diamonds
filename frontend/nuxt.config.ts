const isProduction = process.env.NODE_ENV === 'production';

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  devtools: {
    enabled: !isProduction,
  },

  css: [
    '~/assets/css/tokens.css',
    '~/assets/css/base.css',
  ],

  runtimeConfig: {
    public: {
      appEnvironment: isProduction
        ? 'production'
        : 'development',

      apiBaseUrl:
        'http://127.0.0.1:4000/v1',

      siteUrl:
        'http://localhost:3000',
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

      link: [
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com',
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: '',
        },
        {
          rel: 'stylesheet',
          href:
            'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=Inter:wght@400;500;600&display=swap',
        },
      ],
    },
  },
});