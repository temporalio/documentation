# Taxonomy

This document describes how content in this repository is classified along
multiple independent facets, in addition to the existing `tags` field. It is
a sibling to `INFORMATION-ARCHITECTURE.md`: that document describes how
content is *organized* (sections, sidebars); this one describes how content
is *classified* (facets, vocabularies).

## Facets

| Facet | Front matter field | Cardinality | Vocabulary file |
|---|---|---|---|
| SDK language | `sdks` | multi-valued | `sdk-languages.yml` |
| Content type | `content_type` | single-valued | `content-types.yml` |

Additional facets (e.g. `use_case`) will be added to this table as they're
scoped, following the same process below.

### Front matter shape

```yaml
---
sdks: [go, python]
content_type: how-to
---
```

`sdks` is an array because a page can legitimately apply to more than one
SDK (e.g. a cross-SDK concept page). `content_type` is a single value
because a page has one primary purpose; if a page seems to need two, that's
usually a sign it should be split, not a sign the field should become an
array.

Both fields are independent of, and do not replace, the existing `tags`
field, which remains available for free-form Docusaurus tag pages.

### Folder-level defaults (`_frontmatter.yml`)

A folder may contain a `_frontmatter.yml` file providing default facet
values for every `.mdx` file in that folder, so pages don't each need to
repeat the same value. This is primarily useful for `sdks`, since
SDK-specific content is already organized by folder (`docs/develop/go/`,
`docs/develop/python/`, etc.). It is less useful for `content_type`, since a
single folder can plausibly mix tutorials, how-tos, and reference pages —
`content_type` should generally stay file-level; reserve folder defaults for
that facet to folders that are genuinely homogeneous.

**Precedence.** File-level front matter overrides the nearest
`_frontmatter.yml`, which overrides any ancestor `_frontmatter.yml` further
up the tree. Resolution is transitive up the full folder path, not limited
to one level.

**Merge strategy.** A file-level value **replaces** the inherited default
entirely; it does not merge with it. This applies to array facets too —
`sdks: [rust]` on a file inside a `go`-defaulted folder means the page is
Rust-only, not `[go, rust]`. Union semantics were considered and rejected:
they make it unclear from reading a single file's front matter what facet
values actually apply to it, and are harder to validate correctly.

**Resolution point.** Inheritance is resolved at **build time**, not just
inside tooling — `markdown.parseFrontMatter` in `docusaurus.config.js`
(via `plugins/shared/sectionFrontMatter.js`) merges folder defaults into
each doc's front matter. This is a hard requirement, not a convenience:
Phase 6 already commits to having the Algolia crawler read `sdks` directly
from the rendered page instead of re-deriving it from the URL (see Phase 0
findings below). The crawler only sees rendered HTML; it cannot walk the
source folder tree itself. So the resolved value has to land in page output
(e.g. a meta tag) regardless of anything else — build-time resolution is a
dependency of work already committed to, not additional scope.

**Ongoing risk, not just a migration-week risk.** Once this exists, a new
file dropped into a folder governed by `_frontmatter.yml` inherits that
folder's facet values automatically, whether or not the author intended
that or even noticed the file exists. This doesn't go away after the
initial backfill. Tooling implications are noted under Phase 3 below;
`CONTRIBUTING.md` should also tell authors to check for a `_frontmatter.yml`
in their folder before assuming a new page has no classification (Phase 7).

`_frontmatter.yml` values are taxonomy input like any front matter value —
they are validated against the same vocabulary YAML files, not exempt from
them.

## Vocabulary values

Each facet's permitted values live in a YAML file at the repository root,
not scattered across doc front matter. Each entry has:

- `id` — the canonical value used in front matter. Stable; do not rename
  without updating every page that uses it.
- `label` — the human-readable display form.
- `description` — optional, for the `content_type` facet, since those
  categories are more judgment-dependent than SDK language names.
- `aliases` — legacy tag/keyword strings that map to this id, used by
  tooling to suggest a fix instead of just failing.

### Proposing a new value

Open a PR against the relevant vocabulary YAML file. Include:
1. The value and why the existing vocabulary doesn't cover it.
2. Which existing pages would use it.

Vocabulary changes are reviewed like any other content PR — no separate
approval process.

## Why this exists (Phase 0 findings)

Before this system, classification lived entirely in two free-form fields,
`tags` and `keywords`, both in front matter. An inventory across 686 files
found:

- **153 distinct `tags` values, 46 of them (30%) used on exactly one file.**
  Several are unintentional duplicates of the same concept: `Activity` (9
  files) vs. `Activities` (61), `Worker` (7) vs. `Workers` (39), `Self-hosted`
  (1) vs. `Self-hosting` (18), `user-groups` (1) vs. `User groups` (3).
- **1,134 distinct `keywords` values, 758 of them (67%) used on exactly one
  file.** This is the signature of page-specific free text, not a shared
  vocabulary.
- **The Algolia crawler config (`initialIndexSettings` / `recordExtractor`)
  does not read `keywords` or `<meta name="keywords">` at all** — it builds
  search records from rendered headings and body text only. Google has also
  ignored the meta-keywords tag for ranking since ~2009. `keywords` is
  therefore confirmed to do no SEO or on-site-search work and is a removal
  candidate as content migrates to the new facets, not something the new
  facets need to preserve.
- **`tags` pages are explicitly excluded from the search crawl**
  (`exclusionPatterns: ["https://docs.temporal.io/tags/**", ...]`), so `tags`
  today only powers the generated tag browse pages, not search relevance.
- **The crawler already derives a rough `sdk_language` search facet from the
  URL path** via `url.pathname.match(/(?:\/|-)(go|java|dotnet|type-?script|python|php|ruby)(?:\/|$)/)`.
  This is a live, real facet in production search today. It was missing
  `rust` (a 20-file gap) — **fixed independently of this taxonomy project**,
  ahead of Phase 6. It's still fragile in the sense that it silently
  produces no facet value for any page whose URL doesn't match the pattern
  at all, which is exactly what Phase 6 replaces: once `sdks` front matter
  exists and is validated (Phase 3), the crawler's `recordExtractor` should
  read that value (via `docsearch:sdks` / `docsearch:content_type` meta tags
  already emitted on each page) instead of re-deriving it from the URL — a
  validated facet source, not a second regex to keep in sync by hand.
- **Docusaurus auto-generates a tag's permalink from its label via lodash's
  `kebabCase` whenever `docs/tags.yml` doesn't set an explicit `permalink`,
  and that splitter mis-slugs any pluralized acronym or unspaced CamelCase
  compound.** Confirmed instances: `Temporal SDKs` → `/tags/temporal-sd-ks`
  instead of `/tags/temporal-sdks` (`SDKs` splits into `SD` + `Ks` because a
  capital immediately followed by lowercase is treated as a new word
  boundary), and `TypeScript SDK` → `/tags/type-script-sdk` instead of
  `/tags/typescript-sdk` (same rule, splits at every capital). Fix is a
  one-line explicit `permalink` per affected entry in `docs/tags.yml`, no
  content changes needed. Other tags likely affected by the same pattern
  should be checked for during Phase 1 legacy `tags` cleanup.
  **This is not just a cosmetic bug: 90-day click analytics (source: internal
  Amplitude dashboard, most recent 90-day window) show `/tags/temporal-sd-ks`
  is the 3rd most-clicked tag link on the entire site — 116 clicks, up from
  31 the period before (3.7x growth) — and `/tags/type-script-sdk` shows the
  same growth pattern (14 → 47).** Both URLs are being actively used,
  bookmarked, and likely indexed by search engines at meaningful volume.
  **Any permalink fix here must ship with a redirect from the old slug to
  the new one** (e.g. via `@docusaurus/plugin-client-redirects`, or at the
  hosting/CDN layer) in the same change — setting the corrected `permalink`
  without a matching redirect breaks a URL that several hundred people a
  quarter are actively clicking.

The most frequent `keywords` values (`explanation`: 60 files, `how-to`: 31,
`term`: 30, `cli reference`: 34, `best practices`: 13) show authors were
already informally sorting content into categories close to the
`content_type` vocabulary above, without a formal field to put them in. That
pattern informed the seed vocabulary but the keyword data itself was not
carried forward — it was too noisy (67% singleton usage) to trust as a data
source directly.

### Traffic data (tag click analytics)

Source: internal Amplitude dashboard, `/tags/*` link clicks on
docs.temporal.io, comparing two 90-day windows (total clicks 815 → 1,773
site-wide across the period). This data confirms several Phase 0 decisions
with real usage rather than just file counts, and changes how two of them
should be executed.

- **The duplicate-tag consolidations are de-risked by real numbers** — in
  every pair identified in Phase 0, the form we'd keep dominates the clicks
  the form we'd retire gets:

  | Keep | Clicks (recent 90d) | Retire | Clicks (recent 90d) |
  |---|---|---|---|
  | `self-hosting` | 171 | `self-hosted` | 1 |
  | `activities` | 35 | `activity` | 2 |
  | `workers` | 29 | `worker` | 3 |
  | `workflows` | 54 | `workflow` | 1 |

  None of these consolidations meaningfully lose traffic. **But each merge
  still needs a redirect from the retired slug to the kept one** — same
  requirement as the `Temporal SDKs` slug fix above, and `self-hosting` is
  the single most-clicked tag link on the site, so a missing redirect there
  is the highest-visibility way this project could visibly break something
  for users.
- **`concepts` is the 4th most-clicked tag link on the site (92 clicks, up
  from 52).** This is exactly the tag flagged earlier as ambiguous between
  the `explanation` and `glossary-term` `content_type` values (both list
  `Concepts` as an alias — see `content-types.yml`). Whatever
  the Phase 4 pilot resolves that ambiguity to, it needs to preserve or
  improve this entry point's discoverability — this is real, sizable
  traffic, not a hypothetical edge case to deprioritize.
- **Out of scope, noted rather than silently ignored:** a handful of URLs
  (`/ai-cookbook/tags/agents`, `/ai-cookbook/tags/claim-check`, etc.) point
  at a separate tag namespace under `/ai-cookbook/`, with negligible clicks
  (0–3 each in either window). That content wasn't part of the Phase 0 file
  inventory (686 files, `docs/` only) and isn't in scope for this project
  unless traffic there changes materially.

## Status

- [x] Phase 0 — discovery
- [x] Phase 1 — controlled vocabularies (this doc + `sdk-languages.yml` /
      `content-types.yml`).
      **Scope added:** every tags.yml permalink fix and every duplicate-tag
      consolidation ships with a redirect from the old slug to the new/kept
      one — see traffic data above; skipping this breaks active, sizable
      click traffic, not just a hypothetical inbound link.
- [x] Phase 2 — front matter schema finalized (`sdks` multi-valued;
      `_frontmatter.yml` precedence/merge rules confirmed; build-time merge
      via `plugins/shared/sectionFrontMatter.js`)
- [ ] Phase 3 — validation tooling. **Scope added:** validate
      `_frontmatter.yml` files against the same vocabularies; resolve
      inheritance per file; report inherited-vs-explicit per file (lint-level,
      not a hard failure) so a folder default silently misapplying to one
      page — the `content_type` risk — is visible in review, not just in the
      generated site; multi-level inheritance test fixtures (folder default →
      subfolder override → file override); check every `docs/tags.yml` entry
      either has an explicit `permalink` or that its lodash-`kebabCase`-
      derived slug survives a strip-and-lowercase sanity comparison, so a new
      pluralized-acronym or CamelCase tag doesn't silently repeat the
      `Temporal SDKs` → `temporal-sd-ks` bug found in Phase 0; flag any
      `docs/tags.yml` permalink change or tag removal that lacks a
      corresponding redirect entry — see traffic data above.
- [ ] Phase 4 — pilot migration. Develop `sdks` folder defaults are in place
      (`docs/develop/<lang>/_frontmatter.yml`); remaining pilot work is
      `content_type` and any pages that need explicit `sdks` overrides.
      **Constraint:** the `explanation`/`glossary-term` split resolved here
      must not reduce discoverability of what `/tags/concepts` currently
      serves (92 clicks, 4th most-clicked tag site-wide) — verify the
      replacement browse/search path surfaces that content at least as well
      before considering this done.
- [ ] Phase 5 — full backfill. `sdks` backfill is now expected to be mostly
      folder-level (`_frontmatter.yml` per SDK folder) rather than per-file;
      `content_type` remains mostly file-level.
- [ ] Phase 6 — consumption layer (browse/filter UI, crawler reconciliation).
      Rendered HTML now includes `docsearch:sdks` and `docsearch:content_type`
      meta tags (`src/theme/DocItem/TaxonomyMeta`) from effective front matter.
      Remaining: point the DocSearch crawler / `attributesForFaceting` and the
      search UI at `sdks` + `content_type` instead of URL-derived
      `sdk_language`.
- [ ] Phase 7 — cleanup of legacy `tags`/`keywords` usage. **Scope added:**
      `CONTRIBUTING.md` note telling authors to check for a
      `_frontmatter.yml` in their folder before assuming a new page has no
      classification.
