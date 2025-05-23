
// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import relativeLinks from 'astro-relative-links';

// https://astro.build/config
export default defineConfig({
  experimental: {
    fonts: [
      {
        provider: fontProviders.google(),
        name: 'Montserrat',
        cssVariable: '--font-sans',
      },
    ],
  },
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [relativeLinks()],
});
