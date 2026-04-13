import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Vite handles the renderer process only.
// Electron's main process is plain Node — Vite never touches it.
export default defineConfig({
  plugins: [react()],
  // index.html lives at project root so Vite finds it automatically.
  // The public/ dir is used for static assets copied verbatim (e.g. icon.ico).
  publicDir: 'public',
  build: {
    outDir: 'dist/renderer',
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/renderer'),
    },
  },
});
