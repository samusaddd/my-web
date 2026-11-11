import { test } from "node:test";
import assert from "node:assert/strict";
import { isPostPublished } from "../src/lib/publication.mjs";

const release = "2026-11-13T09:00:00+01:00";
test("scheduled publication respects Berlin time and its exact boundary", () => {
  const data = { publishAt: release };
  assert.equal(isPostPublished(data, Date.parse("2026-11-13T07:59:59.999Z")), false);
  assert.equal(isPostPublished(data, Date.parse("2026-11-13T08:00:00.000Z")), true);
});
test("drafts and malformed schedules fail closed", () => {
  assert.equal(
    isPostPublished({ draft: true, publishAt: release }, Date.parse("2027-01-01")),
    false,
  );
  for (const publishAt of [null, 42, "not a date", ""])
    assert.equal(isPostPublished({ publishAt }), false);
});
test("existing published posts remain published", () => assert.equal(isPostPublished({}), true));
