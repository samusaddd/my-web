import fs from "node:fs";
import { setTimeout } from "node:timers/promises";
import { decodeRelease } from "./release-bundle.mjs";

const config = JSON.parse(
  fs.readFileSync(".github/publication/protecting-peace.json", "utf8"),
);
const files = decodeRelease(
  fs.readFileSync(config.bundle),
  process.env.ESSAY_RELEASE_KEY,
  config,
);
const mode = process.argv[2];
const expectedCommit = process.argv[3];
const origin = "https://samirseddiqi.it";
const route = `/blog/${config.slug}/`;
const urls = ["/", "/blog/", "/rss.xml", "/sitemap.xml", route];
const opening = "There's a kind of exhaustion that sleep doesn't fix.";
const closing =
  "I'm going to stop destroying myself to keep the peace with the world.";
const get = async (url) => {
  const response = await fetch(
    `${origin}${url}${url.includes("?") ? "&" : "?"}releaseCheck=${Date.now()}`,
    {
      signal: AbortSignal.timeout(30_000),
      headers: { "Cache-Control": "no-cache" },
    },
  );
  return {
    status: response.status,
    type: response.headers.get("content-type") || "",
    text: (await response.text()).replace(/&#(?:x27|39);|&apos;/g, "'"),
  };
};
const deadline = Date.now() + 20 * 60_000;
let problem = "Deployment has not propagated";
while (Date.now() < deadline) {
  try {
    const receipt = await get("/deployment.json");
    if (
      receipt.status !== 200 ||
      JSON.parse(receipt.text).commit !== expectedCommit
    )
      throw new Error("Waiting for Render to serve the cloud-generated commit");
    const pages = await Promise.all(urls.map(get));
    if (mode === "verify") {
      if (
        pages.some(
          (p) => p.text.includes(opening) || p.text.includes(config.slug),
        )
      )
        throw new Error("Unexpected premature article exposure");
      const assets = await Promise.all(
        [...files.keys()]
          .filter((name) => name.startsWith("public/images/"))
          .map((name) => get(name.slice(6))),
      );
      if (
        assets.some(
          (asset) => asset.status === 200 && asset.type.startsWith("image/"),
        )
      )
        throw new Error("Unpublished artwork is accessible");
    } else {
      if (pages.some((p) => p.status !== 200 || !p.text.includes(config.slug)))
        throw new Error(
          "Waiting for article, homepage, archive, RSS and sitemap",
        );
      const article = pages.at(-1).text;
      if (
        !article.includes(opening) ||
        !article.includes(closing) ||
        !article.includes("4iCkPQ18CbkZfCKKBUCEgq") ||
        !article.includes('id="share-essay"') ||
        !article.includes('id="comments"')
      )
        throw new Error("Article integration is incomplete");
      const image = await get("/images/articles/protecting-my-peace-hero.webp");
      if (image.status !== 200)
        throw new Error("Article artwork has not deployed");
    }
    console.log(
      mode === "verify"
        ? "Confirmed: cloud-token push reached Render; manuscript, artwork, indexes and feeds remain private."
        : "Confirmed: article, artwork, soundtrack, sharing, comments, homepage, archive, RSS and sitemap are deployed.",
    );
    process.exit(0);
  } catch (error) {
    problem = error.message;
    console.log(problem);
  }
  await setTimeout(30_000);
}
throw new Error(problem);
