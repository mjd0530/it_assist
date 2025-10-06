import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Set base for GitHub Pages deployment (only in production)
  base: process.env.NODE_ENV === 'production' ? '/it_assist/' : '/',
})
