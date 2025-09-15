import path from "path"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  preview: {
    host: true,
  },
  plugins: [react(), tailwindcss(), VitePWA({
    registerType: 'autoUpdate',
      manifest: {
        name: "GyanSetu",
        short_name: "GyanSetu",
        start_url: ".",
        display: "standalone",
        background_color: "#ffbf00",
        theme_color: "#ffffff",
        icons: [
          {
            src: "/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png"
          }
        ]
      }
  })],
  resolve: {
    alias: {
            "@": path.resolve(__dirname, "./src"),
    }
  },
server: {
  host: true,
  allowedHosts: true
}
})
