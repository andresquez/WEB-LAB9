import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import eslint from 'vite-plugin-eslint'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [eslint(),react()],
  test: {
    setupFiles: './src/setupTests.js',
    globals: true,
    environment: 'jsdom'
  }
})
