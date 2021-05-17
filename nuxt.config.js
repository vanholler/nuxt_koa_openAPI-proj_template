// import colors from 'vuetify/es5/util/colors'
module.exports = {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  telemetry: false,
  ssr: false,
  server: {
    protocol: process.env.PROTOCOL,
    host: process.env.HOST,
    port: process.env.PORT || 3000
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - schedule',
    title: 'schedule',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  styleResources: {
    scss: ['~/assets/scss/_variables.scss']
  },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/scss/main.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/dotenv'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: 'http://localhost:3000'
    // debug: true
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      fileName: 'manifest.json',
      meta: {
        name: 'MISHA mobile',
        short_name: 'MISHA mobile',
        description: 'Mobile application MISHA',
        background_color: '#ffffff',
        theme_color: '#fff'
      },
      lang: 'ru',
      start_url: '/',
      display: 'fullscreen',
      icon: {
        iconSrc: '~/static/icon.png'
      }
    },
    runtimeCaching: [
      {
        urlPattern: 'https://cdn.jsdelivr.net/npm/workbox-cdn@4.3.1/workbox/workbox-sw.js',
        handler: 'cacheFirst',
        method: 'GET',
        strategyOptions: { cacheableResponse: { statuses: [0, 200] } }
      },
      {
        urlPattern: '/img/',
        handler: 'cacheFirst',
        method: 'GET',
        strategyOptions: {
          cacheName: 'images',
          cacheableResponse: { statuses: [0, 200] }
        }
      },
      {
        urlPattern: '/_nuxt/',
        handler: 'networkFirst',
        method: 'GET'
      }
    ]
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/scss/_variables.scss'],
    theme: {
      dark: true,
      themes: {}
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {}
}
