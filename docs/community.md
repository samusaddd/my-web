# Article sharing, reader comments and scheduled publication

All article pages use the same sharing and comment components. Sharing supports the native device share sheet when available, clipboard copying with a selectable-link fallback, WhatsApp, LinkedIn, Facebook, X and email. Links include the current essay's title and canonical URL. Social and email links remain usable without JavaScript.

The comment form asks only for a display name and plain-text comment. Comments are stored in a separate managed D1 service and are visible to independent visitors. The service is public intentionally; readers do not need a website or GitHub account. The app loads comments near the end of the essay, preserves a draft on posting failure, supports pagination and permits deletion by the browser that posted a comment. The server applies request validation, bounded body sizes, atomic posting limits, a honeypot and private owner moderation.

Backend source and operational notes are in `services/comments`. The frontend's only service configuration is the public API origin in `src/components/article-comments.tsx`. Production secrets are kept in the managed service environment and are absent from the website bundle and Git source. The website retains its established GitHub and Render deployment.

## Publication history

“You Don't Know Their Story. And They Don't Get to Write Yours.” was originally scheduled for 13 November 2026 at 09:00 Europe/Berlin. At the author's request, it was released early on **12 November 2026**. Its `date` is 2026-11-12 and the `publishAt` restriction has been removed. The original manuscript and signed writing date are preserved. The soundtrack is Matilda by Harry Styles after the first paragraph.

`src/lib/publication.mjs` is shared by the post loader and RSS generator. A future release time excludes an essay's content from homepage features, archives, related links, RSS and sitemap. Its permalink serves a no-index release notice, explicitly replacing any older published HTML retained by the static host. The manuscript is not included in that export. Malformed schedules fail closed. The boundary is tested at 08:00 UTC, equivalent to 09:00 Berlin on that date.

The one-time Codex task `publish-you-don-t-know-their-story` was cancelled when the author requested immediate publication. Future scheduled releases still require a rebuild and deployment at the release time; changing the clock alone does not update a deployed static export.
