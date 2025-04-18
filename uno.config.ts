import { defineConfig, presetWind4, presetWebFonts } from "unocss";
import { THEME_CONFIG } from "./src/config";
export default defineConfig({
  presets: [
    presetWind4({ reset: true }),
    presetWebFonts({
      themeKey: "font",
      provider: "google",
      fonts: {
        sans: "Noto Sans:400,500,600,700",
      },
    }),
  ],
  theme: {
    colors: {
      primary: THEME_CONFIG.colors.primary,
      accent: '#EF233C'
    },
    container: {
      center: true,
      padding: "1rem",
    },
    breakpoint: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1240px",
    },
  },
  shortcuts: {
    'embla-thumbs__slide--selected': 'opacity-100'
  }
});
