import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: 'learn_language_WebSite',   // IMPORTANT
  server: {
    allowedHosts: [
      'utterly-better-sculpin.ngrok-free.app'
    ],
    proxy: {
      "/api": {
        target: "http://127.0.0.1:5000",
        changeOrigin: true
      }
    }
  }

})
