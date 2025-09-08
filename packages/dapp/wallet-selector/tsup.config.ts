import { defineConfig } from "tsup";

export default defineConfig({
    entry: ["src/index.ts"],
    format: ["cjs", "esm"],
    platform: "browser",
    dts: true,
    bundle: true,
    clean: true,
    splitting: false,
    outDir: "./dist",
    treeshake: true,
    minify: false, // Set to true for production builds
    sourcemap: true,
    tsconfig: "./tsconfig.build.json",
});
