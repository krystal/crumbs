import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "lib/index.js"),
      name: "Crumbs",
      fileName: "crumbs",
      formats: ["es"],
    },
    minify: "terser",
  },
  server: {
    port: 3000,
  },
});
