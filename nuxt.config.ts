// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  app: {
    baseURL: '/nuxt3-wasm-sqlite/',
    cdnURL: 'https://koba1108.github.io/nuxt3-wasm-sqlite/',
  },
  runtimeConfig: {
    public: {
      baseURL: '/nuxt3-wasm-sqlite/',
    }
  }
})
