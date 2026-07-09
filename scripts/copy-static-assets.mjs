// Copies the non-TypeScript source files (index.html, styles.css) from
// src/ into public/ as part of `npm run build`. tsc only handles .ts, so
// this fills the gap without pulling in a bundler for two static files.
import { copyFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const files = ["index.html", "styles.css"];

mkdirSync(join(projectRoot, "public"), { recursive: true });

for (const file of files) {
  copyFileSync(join(projectRoot, "src", file), join(projectRoot, "public", file));
  console.log(`Copied src/${file} -> public/${file}`);
}
