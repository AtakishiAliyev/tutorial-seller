import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from 'vite-tsconfig-paths'
import tailwindcss from 'tailwindcss'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  // build: {
  //   rollupOptions: {
  //     output: {
  //       manualChunks: {
  //         vendor: ['react', 'react-dom'],
  //         forms: [
  //           'react-hook-form',
  //           'zod'
  //         ],
  //         utilities: [
  //           'uuid',
  //           'debounce',
  //         ]
  //       }
  //     }
  //   }
  // },
})