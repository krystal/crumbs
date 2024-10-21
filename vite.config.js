import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "lib/index.js"),
      fileName: "crumbs",
      formats: ["es"],
      name: "Crumbs",
    },
    minify: "terser",
  },
  server: {
    port: 3000,
  },
});
