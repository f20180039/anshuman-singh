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
          // Split React and ReactDOM into separate chunk for better caching
          "vendor-react": ["react", "react-dom"],
          // Router in its own chunk
          "vendor-router": ["react-router-dom"],
          // Framer Motion in separate chunk (only loaded on pages that need animations)
          "vendor-animations": ["framer-motion"],
          // Icons separated for better tree-shaking
          "vendor-icons": ["react-icons"],
          // Three.js and related (only loaded on Test3D page)
          "vendor-3d": ["three", "@react-three/fiber", "@react-three/drei"],
        },
      },
    },
  },
});
