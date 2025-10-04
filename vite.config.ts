import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: ['es2020', 'chrome80', 'firefox80', 'safari14', 'edge80'],
    minify: 'terser',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['framer-motion', '@headlessui/react'],
          utils: ['react-i18next']
        }
      }
    },
    cssTarget: 'chrome80'
  },
  server: {
    port: 5180
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom']
  }
})
