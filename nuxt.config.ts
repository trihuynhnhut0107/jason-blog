// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },

  runtimeConfig: {
    public: {
      baseURL: process.env.BASE_URL || "http://localhost/test-wp/wp-json/",
    },
  },
  css: [
    "~/assets/css/main.css",
    "@fortawesome/fontawesome-svg-core/styles.css",
  ],
  modules: ["@nuxtjs/google-fonts"],
  googleFonts: {
    families: {
      // Specify the font families you want to import
      Roboto: [400, 700],
      Oswald: [500],
      "Kaushan Script": [400],
    },
    display: "swap",
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
