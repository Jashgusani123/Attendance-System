import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss(),],
  server: {
    host: true,
    port: 5173,
    allowedHosts: [
      "2df8-103-147-192-86.ngrok-free.app", // 👈 your current ngrok host
    ],
  }
})
