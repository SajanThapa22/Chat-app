import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Chat App",
        short_name: "Chat App",
        description: "A Real Time Chat App",
        theme_color: "#ffffff",
        icons: [
          {
            src: "/messenger.png",
            sizes: "192x192",
            type: "image/svg",
          },
          {
            src: "/messenger.png",
            sizes: "512x512",
            type: "image/svg",
          },
        ],
      },
      devOptions: {
        enabled: true, // Enables PWA in development
      },
    }),
  ],
});
