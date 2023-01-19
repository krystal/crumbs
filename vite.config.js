import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "lib/main.js"),
      name: "Crumbs",
      fileName: "crumbs",
      formats: ["es", "cjs", "umd"],
    },
    minify: "terser",
    target: "es2015",
  },
  server: {
    port: 3000,
  },
});
