import test from "node:test";
import assert from "node:assert/strict";
import { createCipheriv, randomBytes } from "node:crypto";
import {
  decodeRelease,
  releaseIsDue,
  sha256,
} from "../scripts/release-bundle.mjs";

const at = "2026-11-14T09:00:00.000Z";
function fixture(overrides = {}) {
  const body = "An approved paragraph.";
  const post = `---\ndate: "${at}"\npublishAt: "${at}"\nsoundtrack: {"spotifyId": "4iCkPQ18CbkZfCKKBUCEgq"}\n---\n\n${body}\n`;
  const file = "src/content/posts/test.mdx";
  const key = randomBytes(32),
    iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", key, iv);
  const payload = {
    releaseAt: at,
    slug: "test",
    files: { [file]: Buffer.from(post).toString("base64") },
    ...overrides,
  };
  const data = Buffer.concat([
    cipher.update(JSON.stringify(payload)),
    cipher.final(),
  ]);
  const bundle = Buffer.from(
    JSON.stringify({
      iv: iv.toString("base64"),
      tag: cipher.getAuthTag().toString("base64"),
      data: data.toString("base64"),
    }),
  );
  return {
    bundle,
    key: key.toString("hex"),
    config: {
      releaseAt: at,
      slug: "test",
      bundleSha256: sha256(bundle),
      manuscriptSha256: sha256(body),
      files: { [file]: sha256(post) },
    },
  };
}

test("Rome 10:00 CET is a strict 09:00 UTC release boundary", () => {
  assert.equal(releaseIsDue(at, Date.parse(at) - 1), false);
  assert.equal(releaseIsDue(at, Date.parse(at)), true);
  assert.equal(releaseIsDue(at, Date.parse(at) + 1), true);
  assert.throws(() => releaseIsDue("invalid"));
});
test("Authenticated release decrypts with exact approved bytes", () => {
  const { bundle, key, config } = fixture();
  assert.equal(decodeRelease(bundle, key, config).size, 1);
});
test("Missing and incorrect keys fail closed", () => {
  const { bundle, key, config } = fixture();
  assert.throws(() => decodeRelease(bundle, "", config));
  assert.throws(() =>
    decodeRelease(bundle, randomBytes(32).toString("hex"), config),
  );
  assert.throws(() =>
    decodeRelease(Buffer.concat([bundle, Buffer.from(" ")]), key, config),
  );
});
test("Wrong file list, manuscript, identity and traversal cannot be released", () => {
  const { bundle, key, config } = fixture();
  assert.throws(() => decodeRelease(bundle, key, { ...config, slug: "other" }));
  assert.throws(() =>
    decodeRelease(bundle, key, { ...config, manuscriptSha256: "0".repeat(64) }),
  );
  assert.throws(() => decodeRelease(bundle, key, { ...config, files: {} }));
  const malicious = fixture({
    files: { "../secrets": Buffer.from("no").toString("base64") },
  });
  malicious.config.files = { "../secrets": sha256("no") };
  assert.throws(
    () => decodeRelease(malicious.bundle, malicious.key, malicious.config),
    /Unsafe release path/,
  );
});
