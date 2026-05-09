import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(() => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: 'esnext',
    minify: 'esbuild',
    sourcemap: false,
    reportCompressedSize: false,
    // Optimize chunk sizes
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Split vendor dependencies
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('@react')) {
              return 'react-vendor';
            }
            if (id.includes('framer-motion')) {
              return 'animation';
            }
            if (id.includes('gsap')) {
              return 'animation';
            }
            if (id.includes('lucide-react')) {
              return 'icons';
            }
            if (id.includes('react-router')) {
              return 'router';
            }
            return 'vendor';
          }
          // Split components
          if (id.includes('/components/')) {
            return 'components';
          }
          if (id.includes('/pages/')) {
            return 'pages';
          }
        },
        // Optimize output
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash][extname]',
      },
    },
  },
}));