# Reader comments

This small, separate service stores public comments for samirseddiqi.it. The existing website stays on its current GitHub / Render deployment. The comments API is published through Sites with a managed Cloudflare D1 database.

Production origin: `https://samir-seddiqi-comments.samusadd.chatgpt.site`.

The logical database binding is `DB`. The schema and generated migrations are checked in. Comment bodies are plain text; the website never interprets them as HTML. Posting is anonymous, uses an exact website-origin allowlist, has bounded request sizes, a honeypot and atomic posting limits. Posting retries use an idempotent comment ID and a random deletion capability. Public reads return only the comment ID, display name, body and date.

Readers can delete their own comments from the browser they posted with. Their browser stores a random deletion token, never a copy of the public conversation. The database stores its SHA-256 hash. Rate-limit records contain a daily salted address hash, counters and times; expired records are removed during new posts. Raw network addresses are not stored in the database.

## Local development

Use Node 22.12 or newer. Run `npm ci`, `npm run check`, and `npm test` here. The tests use an isolated local D1 database and do not write production comments. `npm run dev` runs the API on port 8788; apply the checked-in migration to local D1 before using that preview.

The Wrangler configuration is exclusively for local development. Its placeholder database ID and development-only salt/token are not production credentials. Production bindings and secrets come from Sites. Do not deploy the local Wrangler configuration to an unrelated account.

## Publication

The `.openai/hosting.json` identifies the existing comments service. Reuse it, obtain its source write credential, mirror this service's source to its Sites checkout, build with `npm run build`, and publish with the Sites workflow. The packaging helper includes the `drizzle` migrations. Never recreate the service or database during an update.

Required production secrets are `IP_HASH_SALT` and `ADMIN_TOKEN`; both live in the service's managed runtime environment. `ALLOW_LOCALHOST` is absent in production. The anonymous public API audience is intentional so visitors do not need an account.

## Moderation

The owner manages `ADMIN_TOKEN` through the service's managed environment settings. If its value is unavailable, set a new random token and redeploy the existing version before using the moderation API. Never copy it into the website, a browser bundle, a command argument, or a chat message.

With the token supplied privately as an Authorization bearer header, `GET /v1/moderation` returns the most recent 100 comments with their article slugs. `DELETE /v1/moderation/{comment-id}` removes an abusive comment. Both routes reject unauthenticated requests. Ordinary visitors cannot use the moderation routes or delete another reader's comment.
