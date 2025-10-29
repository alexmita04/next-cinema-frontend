import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 8080,
    // proxy: {
    //   "/api": {
    //     target: "https://next-cinema-api.onrender.com", // API-ul real
    //     changeOrigin: true,
    //     secure: false,
    //   },
    // },
  },
});
