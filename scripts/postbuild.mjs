#!/usr/bin/env node
/**
 * postbuild.mjs
 * Copies packages that Nitro v3 leaves as external (bare package imports)
 * into the Vercel serverless function directory so Node.js can resolve them.
 */
import { cpSync, existsSync, mkdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const fnDir = resolve(root, ".vercel/output/functions/__server.func");

// Packages that Nitro v3 beta fails to bundle inline for the vercel preset
const modulesToCopy = ["tslib"];

for (const mod of modulesToCopy) {
  const src = resolve(root, "node_modules", mod);
  const dest = resolve(fnDir, "node_modules", mod);

  if (!existsSync(src)) {
    console.warn(`⚠️  ${mod} not found in node_modules — skipping`);
    continue;
  }

  mkdirSync(dirname(dest), { recursive: true });
  cpSync(src, dest, { recursive: true });
  console.log(`✓ Copied ${mod} → ${dest}`);
}

console.log("postbuild complete.");
