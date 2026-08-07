# Temporal Documentation Site Utilities

This file documents utilities meant to support repository health. These utilities are not meant for use by contributors.

## check-orphan-pages

[**Docusaurus**](https://docusaurus.io) serves all files, whether they are mentioned in sidebars.js or not.
[**Algolia**](https://algolia.com) will index these files so they show up in search, even though we intend to hide them.

`bin/check-orphan-pages.js` (run via `yarn check:orphans`) audits unreferenced docs files so they can be evaluated and,
if needed, hidden in Docusaurus. It scans every `.md`/`.mdx` file under `docs/` and reports the ones that are **not
reachable from any sidebar entry** in `sidebars.js` (this repo's `documentation` sidebar and its `tctl` sidebar are both
checked).

It helps you find:

- Stray or deprecated documentation pages that aren't in the site navigation
- Files that are publicly accessible but unintentionally published
- Gaps in `id:` usage where default IDs don't match sidebar references

A page is automatically exempt, no action needed, when it is:

- Excluded from the docs build entirely (a leading-underscore partial, matching `docusaurus.config.js`'s `docs.exclude`
  globs) — these are never rendered as standalone pages, so they can't be orphaned
- Frontmatter `draft: true` — Docusaurus renders drafts in preview mode but never in production, so there's nothing to
  warn about
- Frontmatter `unlisted: true` — Docusaurus's own mechanism for a page that renders and gets a real URL, but is
  deliberately left out of navigation. Prefer this over `draft: true` for a page that must stay linkable (some
  "deprecated" pages are intentionally left visible outside navigation and linked from other pages — setting those to
  `draft` would 404 those inbound links and break `yarn build`/CI/Vercel).

Anything else not in the sidebar is either a real gap (add it to `sidebars.js`) or a deliberate, tracked exception
recorded in `bin/orphan-pages-baseline.json` with a note explaining why.

**Please note**:

- The `sidebars.js` file does not use `/path/to/file.mdx`. It uses `/path/to/folder/your-file-id`, which uses the
  `id: your-file-id` declared in the file's YAML frontmatter if present, or else the filename.
- Slugs are not equivalent to ids. Slugs determine the URL; ids are what `sidebars.js` uses to stitch pages into
  navigation. A file can have a `slug` and still be an orphan if no sidebar entry references its `id`.

### What it does

1. **Requires `sidebars.js` directly** (rather than regex-scraping it) and walks every sidebar array, collecting every
   doc id referenced by a plain string, a `{type: 'doc', id}` item, or a category's own `link.id` plus its nested
   `items` (recursively).
2. **Walks every `.md`/`.mdx` file under `docs/`**, skipping anything the docs build itself would exclude.
3. For each remaining file, computes its doc id from directory + frontmatter `id` override (or filename), and checks
   it against the collected set of sidebar ids.
4. Anything not covered, not `draft`, and not `unlisted` is compared against `bin/orphan-pages-baseline.json`. New
   orphans not in the baseline fail the check (exit code 2); baseline entries that are no longer orphaned are reported
   as stale so the baseline doesn't accumulate exceptions nobody needs anymore.

### Usage

```bash
yarn check:orphans                                    # report
node ./bin/check-orphan-pages.js --json                # machine-readable
node ./bin/check-orphan-pages.js --update-baseline      # accept all current gaps into the baseline
```

### Work

After running the check, review each newly flagged file carefully.

- Some files may be intentionally excluded from the sidebar, such as deprecated pages or internal partials — mark
  those `unlisted: true` in frontmatter, which needs no baseline entry.
- Others may be unintentional omissions that should be added to `sidebars.js`.
- Others are known, accepted exceptions for now — add them to `bin/orphan-pages-baseline.json` with a note explaining
  why (an empty note means "not yet reviewed").

For each flagged file, decide whether it:

- Should be deleted or archived
- Should have `unlisted: true` frontmatter added (Docusaurus v3+), if it must stay linkable from other pages
- Needs a matching `id:` in the frontmatter
- Belongs in `sidebars.js` but was accidentally left out or commented out

This utility highlights potential issues — it's up to you to decide what belongs in our published documentation.

## visual-comparison

The `visual-comparison` label triggers the visual comparison workflow on the PR. The workflow will do the following:

1. Stands up an instance of the docs site and using Chromium to simulate a browser
2. Takes screenshots of every page of the docs. This is done in parallel with four shards.
3. Compares the screenshots against a baseline, which is taken by the `screenshot-capture` workflow weekly on Sunday.
4. Flags any significant deviation from the expected visual result using `playwright` snapshot testing.

This is useful when you make a change to the docs site that touches the `yarn.lock` file, since changes in the
dependencies may alter the CSS load order and cause unexpected changes even if you didn't make any specific CSS changes.
