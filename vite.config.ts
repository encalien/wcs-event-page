import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import eventConfig from "./src/event.config";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    {
      // Fills the %EVENT_*% placeholders in index.html from src/event.config.ts
      name: "event-html",
      transformIndexHtml: (html) =>
        html
          .replace(/%EVENT_TITLE%/g, eventConfig.title)
          .replace(/%EVENT_DESCRIPTION%/g, eventConfig.description)
          .replace(/%EVENT_URL%/g, eventConfig.url)
          .replace(/%EVENT_OG_IMAGE%/g, eventConfig.ogImage),
    },
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
