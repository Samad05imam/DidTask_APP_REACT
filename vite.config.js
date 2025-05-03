import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  server: {
    host: true,
    allowedHosts: ['didtask-app-react-1.onrender.com'],
  },
  plugins: [react() , tailwindcss()],
})
