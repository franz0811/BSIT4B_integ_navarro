export default defineNuxtConfig({
 runtimeConfig: {
 public: {
 googleClientId: process.env.NUXT_PUBLIC_GOOGLE_CLIENT_ID
 }
 }
})