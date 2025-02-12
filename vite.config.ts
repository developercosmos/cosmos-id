
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    include: ['draft-js', 'react-draft-wysiwyg', 'html-to-draftjs', 'draftjs-to-html'],
  },
  define: {
    global: 'window',
  },
  build: {
    rollupOptions: {
      external: ['alloyeditor']
    }
  }
}));
