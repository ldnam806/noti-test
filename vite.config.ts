// vite.config.ts
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import vue from "@vitejs/plugin-vue";
import path from 'path';

export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: "autoUpdate", // or 'prompt'
      includeAssets: [
        "favicon.svg",
        "favicon.ico",
        "robots.txt",
        "apple-touch-icon.png",
      ],
      manifest: {
        name: "My Vite PWA App",
        short_name: "VitePWA",
        description: "A Vite app with PWA support",
        theme_color: "#ffffff",
        icons: [
          {
            src: "/512x512.jpg",
            sizes: "512x512",
            type: "image/jpg",
          },
        ],
      },
    }),
  ],
   resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
