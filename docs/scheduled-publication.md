# Private scheduled essay publication

Planned release: **Saturday 14 November 2026, 10:00 Europe/Rome (09:00 UTC)**.

Planned permalink: `/blog/im-going-to-destroy-everything-that-disturbs-my-peace/`.

The website uses a Next.js static export, deployed automatically by Render from `samusaddd/my-web/main`. A future frontmatter date alone cannot refresh a static deployment. The approved manuscript and artwork are held in the separate PRIVATE repository `samusaddd/my-web-scheduled-publications`; no plaintext article or image is pushed to this public website repository before the release time.

## Cloud publication

A one-time Sites cloud task is linked to the website's existing reader-comments service (`appgprj_6af3acf153348191a2cd5682ec57184c`). This is a cloud task, independent of the author's computer and Codex desktop. It reads the private vault's saved `CLOUD-PUBLICATION.md` and `release.json`, obtains GitHub access from the connected app at execution time, and copies the eight approved files to the existing website in one atomic commit after the time boundary. No personal token is stored in a prompt, repository or hosting environment. The comments service itself is unchanged.

The release checks each file's content-addressed Git blob SHA, preserves the latest main tree, and updates main with an expected-head lease. It refuses early publication or overwriting a conflicting release file. Render then builds the article, latest-essay feature, archive, RSS and sitemap from that commit. The generated `/deployment.json` receipt identifies the actual deployed source SHA.

The original GitHub Actions attempt could not start: GitHub reported `The job was not started because your account is locked due to a billing issue.` That workflow was disabled, its dedicated secret removed, and the unusable workflow/encrypted bundle removed from the current source. It is not the publication mechanism.

## Evidence and timing limits

The saved cloud task confirms its exact time and enabled status. A separate one-time cloud verification task checks private vault access, the approved file hashes and soundtrack placement, writes a harmless verification record through the connected GitHub app, and confirms that commit reaches Render while the article and artwork remain hidden. Its record is `.github/publication/protecting-peace-cloud-verification.json`. Verification is distinct from actual Saturday publication.

Cloud task startup and Render build/propagation can add several minutes after 10:00. The release is unattended and strictly no earlier than the requested time; second-exact visibility cannot be guaranteed. Check the cloud task's saved state and its completed verification record before claiming scheduling is operational.

On 12 November the platform confirmed the publication task enabled with its exact Saturday timestamp. The separate cloud verification task completed without creating the expected verification record. Therefore the schedule is saved, but successful unattended publication has not been demonstrated. Do not describe this as a guaranteed release. The private GitHub vault and largest-image base64 transport were separately verified through the connected GitHub app in the authoring session.

## Article and artwork

The manuscript is preserved exactly. The author's latest instruction places **Outro — M83** immediately after the first opening paragraph, matching the other essays. The official Spotify iframe is lazy, responsive, 152 px tall, starts without autoplay, and has an accessible title and a regular Spotify fallback link. The existing editorial layout supplies HTML headings, reader font choices, navigation, metadata, sharing and public comments.

Private image outputs: `protecting-my-peace-hero.webp` (2560 × 1440), `protecting-my-peace-og.webp` (1200 × 630), and `protecting-my-peace-social.webp` (1080 × 1350), plus 800/1600 px responsive covers and a JPEG social-preview fallback. The hero is exported from a native 1672 × 941 original; resizing adds no photographic detail. The private asset note records the built-in generation prompt and crop/export details.
