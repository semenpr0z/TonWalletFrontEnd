import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import polyfillNode from "rollup-plugin-polyfill-node";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), polyfillNode()],
  resolve: {
    alias: {
      process: "process/browser",
      Buffer: "buffer",
    },
  },
  build: {
    rollupOptions: {
      plugins: [polyfillNode()],
    },
  },
});
