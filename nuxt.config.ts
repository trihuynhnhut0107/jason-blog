// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  ssr: true,
  runtimeConfig: {
    public: {
      baseURL: process.env.BASE_URL || "http://localhost/test-wp/wp-json/",
      accountNumber: process.env.BANK_ACCOUNT_NUMBER,
      accountName: process.env.BANK_ACCOUNT_NAME,
      bankBinNumber: process.env.BANK_BIN_NUMBER,
      paymentInfo: process.env.PAYMENT_INFO,
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
