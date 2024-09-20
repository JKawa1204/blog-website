import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Specify the output directory, adjust if necessary
    sourcemap: true, // Useful for debugging, can be turned off in production
  },
});
