// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  // Use Vercel preset for self-deployment; Lovable sandbox overrides this automatically.
  nitro: {
    preset: "vercel",
    // Force-inline tslib so Vercel serverless functions can resolve it at runtime.
    // Nitro v3 beta sometimes leaves tslib as external when chunking react-remove-scroll.
    externals: {
      inline: ["tslib"],
    },
    // Proxy /api requests to the backend to bypass browser Mixed Content errors
    routeRules: {
      "/api/**": { proxy: "http://54.179.77.51:5000/**" },
    },
  } as any,
});
