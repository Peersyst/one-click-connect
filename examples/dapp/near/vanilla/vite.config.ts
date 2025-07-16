import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import { viteCommonjs } from "@originjs/vite-plugin-commonjs";

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        viteCommonjs(),
        nodePolyfills({
            include: ["buffer", "events"],
            globals: {
                global: true,
                Buffer: false,
                process: false,
            },
        }),
    ],
    server: {
        port: 3000,
    },
});
