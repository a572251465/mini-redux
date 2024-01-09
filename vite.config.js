import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

function resolvePath(...args) {
  return path.resolve(__dirname, ...args);
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      redux: resolvePath("./redux"),
      "@": resolvePath("./src"),
    },
  },
});
