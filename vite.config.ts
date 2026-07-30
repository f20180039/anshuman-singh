import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  base: "/anshuman-singh/",
  plugins: [react(), tsconfigPaths()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // React core + router: needed on every page, so keep eager and cacheable.
          "vendor-react": ["react", "react-dom", "react-router-dom"],
          // Framer Motion: used across pages but sizeable — its own cacheable chunk.
          "vendor-animations": ["framer-motion"],
          // Icons separated for better tree-shaking.
          "vendor-icons": ["react-icons"],
          // NOTE: three.js / @react-three are intentionally NOT chunked here.
          // Naming them promotes a shared vendor chunk that Vite modulepreloads on
          // every page (~1.1MB). Left unchunked, they stay inside the lazy Test3D
          // chunk and only download when the 3D route is visited.
        },
      },
    },
  },
});
