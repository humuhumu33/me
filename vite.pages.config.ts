// Standalone static SPA build for GitHub Pages.
// Independent from the Lovable TanStack/Cloudflare config in vite.config.ts.
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { "@": path.resolve(__dirname, "src") },
  },
  root: path.resolve(__dirname, "pages"),
  publicDir: path.resolve(__dirname, "public"),
  base: "/",
  build: {
    outDir: path.resolve(__dirname, "dist-pages"),
    emptyOutDir: true,
  },
});
