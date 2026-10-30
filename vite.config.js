import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { copyFileSync } from 'node:fs';
import { resolve } from 'node:path';

// GitHub Pages serves project sites from /<repo>/, so production builds set
// VITE_BASE_PATH=/maison-velle/. Local dev, preview and static hosts use "/".
const base = process.env.VITE_BASE_PATH || '/';

export default defineConfig({
  base,
  plugins: [
    react(),
    {
      // GitHub Pages has no server rewrites, so deep links (e.g. /shop/) would
      // 404. A 404.html that is a copy of index.html lets the app boot at the
      // requested URL and render the matching route.
      name: 'spa-404-fallback',
      apply: 'build',
      closeBundle() {
        const outDir = resolve(process.cwd(), 'dist');
        copyFileSync(resolve(outDir, 'index.html'), resolve(outDir, '404.html'));
      },
    },
  ],
  build: {
    outDir: 'dist',
  },
  server: {
    host: true,
    port: 3000,
    allowedHosts: true,
  },
});
