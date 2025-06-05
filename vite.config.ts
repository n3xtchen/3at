import { defineConfig } from 'vite'

import react from '@vitejs/plugin-react-swc'
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  base: '/',
  plugins: [react(), svgr()],
  build: {
    outDir: 'build'
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:5001',
        changeOrigin: true
      },
      '/create-payment-intent': {
        target: 'http://localhost:4242',
        changeOrigin: true
      }
    }
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupTests.ts', // assuming the test folder is in the root of our project
  }
})
