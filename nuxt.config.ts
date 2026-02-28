// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  modules: [
    "@pinia/nuxt",
    "pinia-plugin-persistedstate/nuxt",
    "vuetify-nuxt-module",
    "@nuxt/image",
    "@nuxt/eslint",
  ],
  app: {
    head: {
      link: [
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "anonymous",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@500;600;700&display=swap",
        },
      ],
      script: [
        {
          // এখানে 'children' এর বদলে 'innerHTML' ব্যবহার করা হয়েছে
          innerHTML: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-MMGSWZ7Q');`,
          type: "text/javascript",
        },
      ],
      noscript: [
        {
          // noscript এর ক্ষেত্রেও innerHTML ব্যবহার করা ভালো
          innerHTML: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-MMGSWZ7Q"
          height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
          tagPosition: "bodyOpen",
        },
      ],
    },
  },
  // hooks: {
  //   "prepare:types": ({ tsConfig }) => {
  //     tsConfig.compilerOptions = tsConfig.compilerOptions || {};
  //   },
  // },
  runtimeConfig: {
    // Keys here are server-side only
    wcKey: "",
    wcSecret: "",
    jwtSecret: "",
    smtpHost: "",
    smtpPort: "",
    smtpUser: "",
    smtpPassword: "",
    public: {
      // Keys here are exposed to the client
      wcUrl: "",
      wpApiUrl: "",
    },
  },
  build: {
    transpile: ["@woocommerce/woocommerce-rest-api"],
  },
  nitro: {
    // Nitro কে নিশ্চিত করুন যেন এটি সঠিকভাবে ইমপোর্ট হয়
    externals: {
      inline: ["@woocommerce/woocommerce-rest-api"],
    },
    preset: "node-server",
  },
  image: {
    domains: ["api.shareelungi.shop"],
    // Use format: ['webp', 'avif'] to automatically convert heavy JPEGs
    format: ["webp"],
    quality: 80,
    provider: "ipx",
  },
  routeRules: {
    "/": { prerender: true },
  },
});
