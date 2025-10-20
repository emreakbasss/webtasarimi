import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/webtasarimi/', // GitHub Pages için repository adınızı buraya yazın
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false
  }
})
