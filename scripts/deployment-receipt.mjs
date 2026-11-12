import fs from "node:fs";
import { execFileSync } from "node:child_process";

let commit =
  process.env.RENDER_GIT_COMMIT || process.env.GITHUB_SHA || "local-preview";
try {
  commit =
    process.env.RENDER_GIT_COMMIT ||
    execFileSync("git", ["rev-parse", "HEAD"], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
} catch {}
fs.writeFileSync(
  "public/deployment.json",
  JSON.stringify({ commit, builtAt: new Date().toISOString() }) + "\n",
);
