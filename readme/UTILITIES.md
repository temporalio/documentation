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

## snipsync-coverage

`bin/report-snipsync-coverage.js` (run via `yarn report:snipsync-coverage`) reports how much of the SDK code in `docs/`
comes from Snipsync. Code that Snipsync pulls from a sample repository is built in that repository's CI. Code written
into a page by hand isn't compiled anywhere, so the percentage is the share of SDK code we know builds.

The headline counts non-blank lines inside fenced code blocks tagged with an SDK language: Python, TypeScript or
JavaScript, Go, Java, C#, Ruby, PHP, and Rust. A second line counts every fenced block except mermaid diagrams. A block
counts as synced when it sits between `SNIPSTART` and `SNIPEND` markers, in either the `<!-- -->` or the `{/* */}` form.
The source link Snipsync writes above a block isn't counted as code, but its URL is how the report attributes synced
lines to a source repository.

The report breaks the numbers down by section (the top-level directory under `docs/`, with `develop/` split by SDK), by
language, and by source repository.

```bash
yarn report:snipsync-coverage                                       # the working tree
yarn report:snipsync-coverage --ref <ref>                           # docs/ at a commit, without a checkout
yarn report:snipsync-coverage --base origin/main                    # what this branch changes
yarn report:snipsync-coverage --history --since 2026-01-01 --every month   # the trend, as CSV
```

Add `--json` or `--markdown` to any of the first three. `--history` samples the last commit in each day, week (the
default), or month on the first-parent history of `origin/main` (or `--branch`), oldest first.

The Snipsync Coverage workflow runs the comparison on every pull request that changes `docs/`, writes it to the job
summary, and keeps one PR comment up to date. It only comments when the SDK line counts change. On `main` it writes the
current numbers to the job summary. Nothing is stored. The numbers depend only on the files in `docs/`, so `--history`
rebuilds the trend whenever you need it.

The code block parser lives in `bin/code-blocks.js`, so other scripts that need to tell synced code from hand-written
code can share it.

## validate-redirects

`bin/validate-redirects.js` (run via `yarn check:redirects`) checks the `redirects` in `vercel.json` for rules that
can't work as written. It runs in the Check Redirects workflow on every pull request and fails on findings.

Vercel compiles each `source` with path-to-regexp 6.1.0 and applies the first rule that matches. The script uses that
same library, installed as the `vercel-path-to-regexp` dependency, so a rule matches in the script exactly when it
matches in production. It builds the set of URLs the site serves from `docs/`, `src/pages/`, and `static/` (using the
same URL resolution as the `markdown-pages` plugin), not from `build/`.

| Check                     | What it finds                                                                                          |
| ------------------------- | ------------------------------------------------------------------------------------------------------ |
| `invalid-pattern`         | A source that doesn't compile.                                                                         |
| `source-no-leading-slash` | A source that doesn't start with `/`.                                                                  |
| `source-trailing-slash`   | A source ending in `/`. Vercel redirects `/x/` to `/x` before matching, so it never matches.           |
| `source-fragment`         | A source containing `#`. Browsers never send the fragment.                                             |
| `glued-param`             | `/foo:path*` instead of `/foo/:path*`, which matches only text appended to `foo`, never `/foo/bar`.    |
| `relative-destination`    | A destination with no leading `/` or scheme, which resolves against the requested URL.                 |
| `undefined-param`         | A destination that uses a `:name` the source doesn't define.                                           |
| `duplicate-source`        | The same source twice. The later rule never runs.                                                      |
| `shadowed`                | A rule whose every match is already claimed by an earlier rule, such as `/cookbook` after `/cookbook/:path*`. |
| `redirect-loop`           | A rule that loops back on itself or takes more than 10 hops.                                           |
| `hides-live-page`         | A source that is a page the site serves, which makes the page unreachable.                             |
| `broken-destination`      | A destination that, after following further redirects, isn't a page the site serves.                   |

A parameterized rule such as `/foo/:path*` also matches `/foo`, so it shadows any later rule for `/foo`. Put the more
specific rule first.

Pages from the `ai-cookbook/` repository are cloned at build time, so `/ai/cookbook/*` destinations, tag pages, and
Vercel functions are treated as served without being verified. The script does not check that a destination's `#anchor`
exists on the page.

Known, accepted findings are recorded with a note in `bin/redirect-baseline.json`. The check also fails on baseline
entries that no longer match a finding. Regenerate the baseline with
`node bin/validate-redirects.js --update-baseline`, then fill in the note for each new entry. `--json` prints the
findings as JSON.

`bin/check-redirects-for-moved-pages.js` is a separate check: it uses the same matcher to fail a pull request that moves
or deletes a docs page without adding a redirect.

`api/markdown-not-found.js` uses the same matcher at request time, so a redirect for a page path also covers the page's
`.md` URL. Don't add a separate `.md` rule unless a wildcard rule would catch the `.md` URL first. See
[Moved pages](./MARKDOWN_PIPELINE.md#moved-pages).

## visual-comparison

The `visual-comparison` label triggers the visual comparison workflow on the PR. The workflow will do the following:

1. Stands up an instance of the docs site and using Chromium to simulate a browser
2. Takes screenshots of every page of the docs. This is done in parallel with four shards.
3. Compares the screenshots against a baseline, which is taken by the `screenshot-capture` workflow weekly on Sunday.
4. Flags any significant deviation from the expected visual result using `playwright` snapshot testing.

This is useful when you make a change to the docs site that touches the `yarn.lock` file, since changes in the
dependencies may alter the CSS load order and cause unexpected changes even if you didn't make any specific CSS changes.
