import { defineConfig } from "vite";
import { resolve, dirname } from "node:path";
import terser from "@rollup/plugin-terser";
const STIMULUS_PATH = resolve(__dirname, "./stimulus");
const entryFile = resolve(__dirname, "./stimulus/index.ts");
export default defineConfig({
  // ...
  build: {
    lib: {
      entry: entryFile,
      name: "mylib",
    },
    target: "esnext",
    sourcemap: true,
    // minify: "terser",
    rollupOptions: {
      plugins: [
        terser({
          mangle: { keep_fnames: true, keep_classnames: true },
        }),
      ],

      output: {
        minifyInternalExports: false,
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
