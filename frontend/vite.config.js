import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: '/joodoo/',
  plugins: [vue()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:1337",
        changeOrigin: true,
        secure: false
      },
      "/upload": {
        target: "http://localhost:1337",
        changeOrigin: true,
        secure: false
      }
    }
  }
})
