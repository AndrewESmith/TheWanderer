import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json']
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    assetsDir: 'assets',
    // Copy files from public to dist
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
    },
  },
  server: {
    port: 3000,
    open: true,
    // Configure MIME types for audio files
    middlewareMode: false,
    fs: {
      // Allow serving files from one level up to the project root
      allow: ['..']
    }
  },
  // Handle static assets
  publicDir: 'public',
  assetsInclude: ['**/*.png', '**/*.jpg', '**/*.svg', '**/*.gif', '**/*.ico', '**/*.mp3', '**/*.wav', '**/*.ogg'],
  // CSS configuration
  css: {
    // Enable CSS modules for files ending with .module.css
    modules: {
      localsConvention: 'camelCaseOnly',
      scopeBehaviour: 'local',
    },
    // Enable source maps for CSS
    devSourcemap: true,
  },
  // Explicitly set the entry point
  optimizeDeps: {
    include: ['react', 'react-dom']
  },
});