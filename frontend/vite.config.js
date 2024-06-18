import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";
import path from "path";

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, ".env") });

// Debug logging
console.log("VITE_API_URL:", process.env.VITE_API_URL);

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": `http://localhost:8080`,
    },
  },
  plugins: [react()],
});
