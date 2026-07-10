import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";

import alpinejs from "@astrojs/alpinejs";

// https://astro.build/config
export default defineConfig({
  site: "https://sararingkow.dk",
  integrations: [tailwind(), alpinejs(), sitemap()],
  devToolbar: {
    enabled: false,
  },
});
