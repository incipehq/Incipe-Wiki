import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    // three.js (src/three/scene.ts) is its own ~600 kB chunk, loaded only on a
    // Wiki page that shows a 3D model — deliberately large, never on first load.
    chunkSizeWarningLimit: 700,
  },
});
