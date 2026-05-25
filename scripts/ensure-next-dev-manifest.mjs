import { mkdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const manifestPath = path.join(process.cwd(), ".next", "server", "middleware-manifest.json");
const manifest = {
  version: 3,
  middleware: {},
  functions: {},
  sortedMiddleware: []
};

async function ensureManifest() {
  if (existsSync(manifestPath)) {
    return;
  }

  await mkdir(path.dirname(manifestPath), { recursive: true });
  await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
}

ensureManifest().catch((error) => {
  console.error("Failed to ensure Next middleware manifest:", error);
  process.exitCode = 1;
});
