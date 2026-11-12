# Private scheduled essay publication

Release: **14 November 2026, 10:00 Europe/Rome (09:00 UTC)**.

Planned permalink: `/blog/im-going-to-destroy-everything-that-disturbs-my-peace/`.

The website is a Next.js static export, deployed by Render from `samusaddd/my-web` on `main`. A future frontmatter date alone cannot refresh a static deployment. The repository is public, so the unpublished manuscript and artwork are stored in an authenticated AES-256-GCM bundle instead of plaintext source. Its dedicated decryption key is a GitHub Actions repository secret; no hosting credentials or personal GitHub tokens are stored in the workflow.

`.github/workflows/scheduled-essay.yml` starts cloud runners at 08:35 and 08:55 UTC on 14 November. A runner waits until 09:00 UTC, refreshes `main`, validates the authenticated payload and every file hash, checks the approved manuscript, installs the existing locked dependencies, runs publication tests, and builds the complete export. Only then does it commit the article, artwork, asset notes, RSS and release status with the repository-scoped `GITHUB_TOKEN`. Render's existing automatic deployment publishes that commit.

Fallback runs are configured at 09:05, 09:20, 09:40 and 10:15 UTC. The release is idempotent and refuses early publication. Existing files that differ from the approved release stop the job for review. The schedule disables itself after the article, artwork, soundtrack, sharing/comments, homepage feature, archive, RSS and sitemap are confirmed live.

GitHub cron jobs can start late or be dropped, and Render needs time to build and propagate. This is an unattended release with a strict no-earlier-than boundary, not a guarantee of second-exact visibility at 10:00. The early warm-up runners and later retries reduce those timing risks.

## Confirming the schedule

The manual `verify` mode decrypts and checks the bundle only in runner memory, never extracting unpublished files. It records `armed` in `.github/publication/protecting-peace-status.json`, commits that status using the same cloud token used for release, and confirms that Render serves the resulting commit via the generated `/deployment.json` receipt. It also verifies the article, artwork, homepage, archive, RSS and sitemap do not expose this release. The status file contains the verification run URL. A successful verification run confirms the cloud-to-Render path today; it is distinct from Saturday's actual publication.

The workflow must remain `active` and the repository secret `PROTECTING_PEACE_RELEASE_KEY` must remain available. A manual `publish` run is time-gated; running it before the warm-up window fails without writing content. To cancel, disable this workflow and remove its dedicated secret. Never replace the encrypted bundle without also updating its matching key and integrity manifest.

## Artwork and reading experience

The private release contains a 2560 × 1440 WebP hero, 800/1600 px responsive covers, 1200 × 630 WebP and JPEG previews, and a 1080 × 1350 portrait image. The hero export uses the native 1672 × 941 image; enlarging it does not add photographic detail. At release, the asset note records the original prompt and crop/export details.

The approved manuscript is unchanged. The existing article template supplies the HTML headline, metadata, reader font choices, section navigation, sharing and public comments. The only inserted body component is the official compact, lazy Spotify player for **Outro — M83**, after the introduction and before the first section. Playback remains user initiated, with a regular Spotify fallback link.
