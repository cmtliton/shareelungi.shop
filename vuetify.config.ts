import { defineVuetifyConfiguration } from "vuetify-nuxt-module/custom-configuration";

export default defineVuetifyConfiguration({
  theme: {
    defaultTheme: "luxuryLight",
    themes: {
      luxuryLight: {
        dark: false,
        colors: {
          background: "#ffffff",
          surface: "#ffffff",
          primary: "#d4af37", // soft gold accent
          secondary: "#000000", // pitch black
          "on-primary": "#000000",
          "on-secondary": "#ffffff",
          "on-background": "#000000",
          "on-surface": "#000000",
          info: "#1e88e5",
          success: "#43a047",
          warning: "#ffa000",
          error: "#e53935",
        },
      },
    },
  },
});

