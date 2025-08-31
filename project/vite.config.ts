import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import viteCompression from 'vite-plugin-compression';

export default defineConfig({
  plugins: [
    react(),
    visualizer({ open: true }),  // opens a visual graph after build
    viteCompression(),           // enables gzip & brotli compression
  ],
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          redux: ['react-redux', '@reduxjs/toolkit', 'redux-persist'],
          router: ['react-router-dom'],
          codemirror: [
            '@uiw/react-codemirror',
            '@codemirror/lang-html',
            '@codemirror/theme-one-dark',
          ],
          vendors: [
            'axios',
            'framer-motion',
            'lucide-react',
            'socket.io-client',
            'jszip',
          ]
        }
      }
    }
  }
});
