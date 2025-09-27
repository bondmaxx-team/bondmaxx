import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  root: 'src',
  build: {
    outDir: '../dist',  // هذا يضع dist في جذر المشروع
    emptyOutDir: true,  // يمسح أي محتوى قديم في dist
  },
  plugins: [
    tailwindcss(),
  ],
})
