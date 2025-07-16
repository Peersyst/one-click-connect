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
        "@noble/hashes",
        /^@noble\//,
        // Add all polyfills to bundle
        "crypto-browserify",
        "buffer",
        "util",
        "stream-browserify",
        "events",
        "path-browserify",
        "os-browserify",
        "url",
        "assert",
        "process",
    ],
    treeshake: true,
    minify: false, // Set to true for production builds
    sourcemap: true,
    tsconfig: "./tsconfig.build.json",
    define: {
        global: "globalThis",
        process: "process",
    },
    esbuildOptions(options) {
        options.define = {
            ...options.define,
            global: "globalThis",
            process: "process",
        };
        options.alias = {
            ...options.alias,
            // Node.js built-in modules
            "node:crypto": "crypto-browserify",
            crypto: "crypto-browserify",
            "node:buffer": "buffer",
            buffer: "buffer",
            "node:util": "util",
            util: "util",
            "node:stream": "stream-browserify",
            stream: "stream-browserify",
            "node:events": "events",
            events: "events",
            "node:path": "path-browserify",
            path: "path-browserify",
            "node:os": "os-browserify",
            os: "os-browserify",
            "node:url": "url",
            url: "url",
            "node:assert": "assert",
            assert: "assert",
            "node:process": "process",
            process: "process",
            // HTTP modules (these will be stubbed since they can't work in browser)
            "node:http": "stream-browserify",
            http: "stream-browserify",
            "node:https": "stream-browserify",
            https: "stream-browserify",
            "node:net": "stream-browserify",
            net: "stream-browserify",
            "node:tls": "stream-browserify",
            tls: "stream-browserify",
        };
    },
});
