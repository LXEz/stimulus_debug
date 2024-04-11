import { defineConfig } from "vite";
import { resolve, dirname } from "node:path";
import terser from "@rollup/plugin-terser";
const STIMULUS_PATH = resolve(__dirname, "./stimulus");
const entryFile = resolve(__dirname, "./stimulus/index.ts");
const isBuildBundle = process.env.bundle;
const output = !isBuildBundle
  ? {
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
    }
  : undefined;
const lib = isBuildBundle
  ? {
      entry: entryFile,
      name: "stimulus",
      fileName: "stimulus",
    }
  : undefined;
export default defineConfig({
  // ...
  build: {
    lib,
    target: "esnext",
    sourcemap: true,
    minify: "terser",
    rollupOptions: {
      plugins: [
        terser({
          mangle: { keep_fnames: true, keep_classnames: true },
        }),
      ],

      output: output as any,
    },
  },
});
