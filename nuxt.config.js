export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'AmnesiacSavior - Plan Important Events with a Click',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Todo-list in the Cloud, Showing your tasks day by day' },
      { hid: 'og:image', property: 'og:image', content: 'https://amnesiac-savior.herokuapp.com/Amnesiac_Savior.png' },
      { hid: 'og:image:secure_url', property: 'og:image:secure_url', content: 'https://amnesiac-savior.herokuapp.com/Amnesiac_Savior.png' },
      { hid: 'og:image:alt', property: 'og:image:alt', content: 'Amnesiac Savior' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/angel.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    [
      '@nuxtjs/firebase',
      {
        config: {
          apiKey: "AIzaSyBmqzRLUCLkYP64SzD7cCb3Fauz4ohDfDs",
          authDomain: "amnesiacsavior3421.firebaseapp.com",
          projectId: "amnesiacsavior3421",
          storageBucket: "amnesiacsavior3421.appspot.com",
          messagingSenderId: "529656710642",
          appId: "1:529656710642:web:6fb5a8aa586f84227cd76b",
          measurementId: "G-ENC0T71582"
        },
        services: {
          auth: true,
          firestore: true,
          functions: true,
          storage: true,
          database: true,
          remoteConfig: true
        }
      }
    ]
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
