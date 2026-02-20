import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      'spimrify-frontend.onrender.com' // Yahan apna URL add karein
    ]
  }
})