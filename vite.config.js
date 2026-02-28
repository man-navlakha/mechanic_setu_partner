import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path'
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      '/api': {
        // ✅ CORRECTED: Point to your actual backend server
        target: 'https://mechanic-setu-int0.onrender.com', 
        changeOrigin: true,
        secure: true,
      },
      // This WebSocket proxy is likely for another feature, but if it should also
      // point to the same server, update it as well.
      '/ws': {
        target: 'wss://mechanic-setu.onrender.com', 
        ws: true,
        changeOrigin: true,
        secure: true,
      },
    },
  },
});