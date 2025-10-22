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
    proxy: {
      // String-ul '/api' este un prefix.
      // Orice cerere care ÎNCEPE cu /api va fi trimisă la 'target'.
      "/api": {
        target: "https://next-cinema-api.onrender.com", // API-ul real
        changeOrigin: true, // Necesar pentru ca serverul extern să nu respingă
        secure: false, // Poate fi necesar dacă API-ul are un certificat SSL auto-semnat
        // 'rewrite' nu e necesar aici, deoarece calea ta se potrivește
        // (Vei cere /api/cinemas, iar proxy-ul va cere https://.../api/cinemas)
      },
    },
  },
});
