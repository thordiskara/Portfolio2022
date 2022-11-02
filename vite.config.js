// vite.config.js
import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: resolve(__dirname, "src"),
  base: "./",
  preview: {
    host: true,
  },
  publicDir: resolve("public"),
  build: {
    outDir: resolve("dist"),
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        kraess: resolve(__dirname, "src/kraess-project.html"),
        silfen: resolve(__dirname, "src/silfen-project.html"),
        vildskud: resolve(__dirname, "src/vildskud-project.html"),
        customise: resolve(__dirname, "src/customise-project.html"),
      },
    },
  },
});


