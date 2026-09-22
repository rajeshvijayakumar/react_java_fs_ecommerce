import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    outDir: "dist",
    sourcemap: false,
    minify: "esbuild",
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            {
              name: "vendor",
              test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
            },
            {
              name: "redux",
              test: /[\\/]node_modules[\\/](@reduxjs\/toolkit|react-redux)[\\/]/,
            },
            {
              name: "router",
              test: /[\\/]node_modules[\\/](react-router-dom)[\\/]/,
            },
            {
              name: "ui",
              test: /[\\/]node_modules[\\/](@fortawesome\/react-fontawesome|@fortawesome\/fontawesome-svg-core)[\\/]/,
            },
          ],
        },
      },
    },
  },
  base: "/",
  server: { port: 5173 },
  preview: { port: 5173 },
});
