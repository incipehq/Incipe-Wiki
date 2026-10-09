import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Node's `process`, without pulling @types/node into the app's type check.
declare const process: { env: Record<string, string | undefined> };

export default defineConfig({
  plugins: [react()],
  // The preview tool assigns a port through PORT; otherwise the usual 5179.
  server: process.env.PORT ? { port: Number(process.env.PORT), strictPort: true } : { port: 5179 },
  build: {
    // three.js (src/three/scene.ts) is its own ~600 kB chunk, loaded only on a
    // Wiki page that shows a 3D model — deliberately large, never on first load.
    chunkSizeWarningLimit: 700,
  },
});
