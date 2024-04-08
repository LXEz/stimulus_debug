import { defineConfig } from "vite";
import { resolve, dirname } from "node:path";
const STIMULUS_PATH = resolve(__dirname, "./stimulus");
export default defineConfig({
  // ...
  build: {
    target: "esnext",
    sourcemap: true,
    // minify: false,
    rollupOptions: {
      output: {
        format: "esm",
        entryFileNames: "main.js",
        chunkFileNames: "stimulus/[name]",
        manualChunks: (id) => {
          const dir = resolve(dirname(id));
          if (dir.includes(STIMULUS_PATH)) {
            return "stimulus.js";
          }

          return "main.js";
        },
      },
    },
  },
});
