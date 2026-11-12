import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { setTimeout } from "node:timers/promises";
import { decodeRelease, releaseIsDue } from "./release-bundle.mjs";

const configPath = ".github/publication/protecting-peace.json";
const statusPath = ".github/publication/protecting-peace-status.json";
const config = JSON.parse(fs.readFileSync(configPath, "utf8"));
const mode = process.argv[2];
const git = (...args) => execFileSync("git", args, { encoding: "utf8" }).trim();

if (mode === "wait") {
  const remaining = Date.parse(config.releaseAt) - Date.now();
  if (!Number.isFinite(remaining) || remaining > 35 * 60_000)
    throw new Error("Outside release warm-up window");
  if (Date.now() > Date.parse(config.releaseAt) + 48 * 3600_000)
    throw new Error("Release window has expired");
  while (!releaseIsDue(config.releaseAt))
    await setTimeout(
      Math.min(30_000, Date.parse(config.releaseAt) - Date.now()),
    );
  console.log(
    "Publication time reached. No content was written during the wait.",
  );
} else if (mode === "verify" || mode === "publish") {
  if (mode === "publish" && !releaseIsDue(config.releaseAt))
    throw new Error("Refusing early publication");
  const files = decodeRelease(
    fs.readFileSync(config.bundle),
    process.env.ESSAY_RELEASE_KEY,
    config,
  );
  if (mode === "publish") {
    for (const [name, bytes] of files) {
      if (fs.existsSync(name) && !fs.readFileSync(name).equals(bytes))
        throw new Error("Existing release file differs; review required");
      fs.mkdirSync(path.dirname(name), { recursive: true });
      fs.writeFileSync(name, bytes);
    }
  } else {
    if (releaseIsDue(config.releaseAt))
      throw new Error("Verification mode cannot arm a past release");
    for (const name of files.keys())
      if (fs.existsSync(name))
        throw new Error("Unpublished release file is already public");
  }
  fs.writeFileSync(
    statusPath,
    JSON.stringify(
      {
        state: mode === "verify" ? "armed" : "released",
        releaseAt: config.releaseAt,
        timeZone: config.timeZone,
        bundleSha256: config.bundleSha256,
        checkedAt: new Date().toISOString(),
        runUrl: `https://github.com/${process.env.GITHUB_REPOSITORY}/actions/runs/${process.env.GITHUB_RUN_ID}`,
      },
      null,
      2,
    ) + "\n",
  );
  console.log(
    mode === "verify"
      ? "Encrypted manuscript and artwork verified in memory. Release armed; content remains private."
      : "Release files validated and prepared after the publication boundary.",
  );
} else if (mode === "commit") {
  const status = JSON.parse(fs.readFileSync(statusPath, "utf8"));
  if (status.bundleSha256 !== config.bundleSha256)
    throw new Error("Release status mismatch");
  const releasing = status.state === "released";
  if (releasing && !releaseIsDue(config.releaseAt))
    throw new Error("Refusing early commit");
  if (!releasing && status.state !== "armed")
    throw new Error("Unknown release state");
  const paths = releasing
    ? [...Object.keys(config.files), "public/rss.xml", statusPath]
    : [statusPath];
  git("add", "--", ...paths);
  git("diff", "--cached", "--check");
  const staged = git("diff", "--cached", "--name-only")
    .split("\n")
    .filter(Boolean);
  if (staged.some((name) => !paths.includes(name)))
    throw new Error("Unexpected staged changes");
  if (staged.length) {
    git(
      "-c",
      "user.name=github-actions[bot]",
      "-c",
      "user.email=41898282+github-actions[bot]@users.noreply.github.com",
      "commit",
      "-m",
      releasing
        ? "Publish the scheduled protecting-my-peace essay"
        : "Verify and arm the private Saturday essay release",
    );
    git("push", "origin", "HEAD:main");
  }
  const commit = git("rev-parse", "HEAD");
  fs.appendFileSync(process.env.GITHUB_OUTPUT, `commit=${commit}\n`);
  console.log(`Verified source commit: ${commit}`);
} else throw new Error("Expected wait, verify, publish or commit");
