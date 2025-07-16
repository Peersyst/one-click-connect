import { defineConfig } from "tsup";

export default defineConfig({
    entry: ["src/index.ts"],
    format: ["cjs", "esm"],
    dts: true,
    bundle: true,
    clean: true,
    splitting: false,
    outDir: "./dist",
    noExternal: [
        // Include all workspace dependencies in the bundle
        "@one-click-connect/wallet-core",
        "@one-click-connect/core",
        "@shared/eslint",
        "@shared/tsconfig",
        "@shared/test",
        "near-api-js",
        /^near-api-js\//,
    ],
    treeshake: true,
    minify: false, // Set to true for production builds
    sourcemap: true,
    tsconfig: "./tsconfig.build.json",
});
