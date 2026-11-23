# Recommendations endpoint (`/api/recommend`)

`https://docs.temporal.io/api/recommend` is a topic search for the Temporal Cloud "Recommended for you" panel
(cloud.temporal.io). It forwards the topics to Kapa's Retrieval API with a server-side key and returns docs pages as
cards: a title, a one-sentence description, a content type, and a URL. Cards come from the docs, the
temporal.io blog, and learn.temporal.io.

It's separate from [`/api/retrieve`](./AGENT-RETRIEVE.md). That endpoint returns passages for AI agents. This one returns
one card per page, adds CORS headers so a browser can call it, and has its own Kapa integration, so the two kinds of
traffic stay apart in Kapa analytics and the log. It isn't advertised in `llms.txt` or in page text.

## Request and response

```
GET https://docs.temporal.io/api/recommend?q=<topics>&sdk=<sdk>&usecase=<text>&os=<os>&limit=<1-10>&src=<surface>&agent=<name>
```

| Parameter | Required | Limit | Purpose |
| --- | --- | --- | --- |
| `q` | Yes | 500 characters (400 if longer) | The topics as text, such as `Python data pipelines getting started`. Kapa searches by meaning, so the caller joins its topic chips into one string |
| `sdk` | No | One of `python`, `ruby`, `rust`, `dotnet`, `java`, `typescript`, `php`, `go` (ignored otherwise) | The SDK the user works in. A hint, not a filter. See [How the user context is used](#how-the-user-context-is-used) |
| `usecase` | No | 100 characters (cut) | What the user is building, in plain words, such as `data pipeline`, `AI agent`, or `SDLC`. The list isn't fixed |
| `os` | No | `windows`, `linux`, or `macos` (ignored otherwise) | The user's operating system. Logged only for now, because adding it to the search text made results worse |
| `limit` | No | Whole number from 1 to 10, default 6 (400 otherwise) | The most cards to return. Ask for more than the panel shows, so a dismissed card can be replaced without another request |
| `src` | No | 32 characters (cut) | Which surface called. Defaults to `cloud-ui`. Logged only |
| `agent` | No | 64 characters (cut) | The caller's name. Logged and sent to Kapa as the client name |

The response is a JSON object. `count` is the number of cards available, and `cards` holds the first `limit` of them,
most relevant first:

```json
{
  "count": 9,
  "cards": [
    {
      "title": "Route GPU and high-memory Activities to dedicated Workers",
      "description": "Give GPU, high-memory, and CPU Activities their own Task Queues so each runs only on Workers with the right hardware.",
      "type": "guide",
      "type_label": "Guide",
      "url": "https://docs.temporal.io/guides/route-specialized-workloads?utm_source=recommendation"
    }
  ]
}
```

- One card per page. Several passages from the same page count once.
- For a docs page, `title` is the frontmatter title, with the folder's `section_title` appended on SDK pages
  ("Versioning - Python SDK"), the same as the browser tab title, and `description` is the frontmatter description. For
  a blog or Learn page, they're the page's `og:title` (without Learn's " | Learn Temporal" suffix) and `og:description`.
- `count` is how many distinct pages Kapa found that have a card, before `limit` cut the list. Kapa returns at most 15
  passages, so `count` is at most 15. It isn't the number of pages in the docs that match the topics. Use it to tell
  whether a Refresh or "show more" has anything left to show.
- Every `url` has `utm_source=recommendation`, for docs, blog, and Learn pages. A docs `url` also has `language=<sdk>`
  and `os=<os>` when the request sent a recognized `sdk` and `os`, so the page opens on the user's tabs (see
  [Opening docs pages on the user's tabs](#opening-docs-pages-on-the-users-tabs)). Strip the query string to get the
  canonical page URL.
- `cards` can hold fewer than `limit` cards, or none (`{ "count": 0, "cards": [] }`). Results that have no title and
  description on record are dropped.
- The response never contains passage text. A card links to the page, not to the passage that matched.
- Errors are JSON `{ error }`. A 400 or 405 also includes a `usage` string.

### How the user context is used

`sdk`, `usecase`, and `os` are hints. They don't filter anything, so a Python user can still get a design pattern or a
blog post that uses Java.

1. `usecase` and `sdk` are added to the text sent to Kapa after the topics. `q=data pipelines`, `usecase=data pipeline`,
   and `sdk=dotnet` search for `data pipelines for data pipeline (.NET)`. The SDK goes in parentheses because phrasing
   such as "using the Python SDK" made Kapa return SDK setup pages and lose the topic. `os` is not added to the query,
   for the same reason: it pulled in "Set up a local development environment" pages. It's parsed and logged only.
1. When `sdk` is set, docs pages under `/develop/<another-sdk>/` move after the other cards. Blog posts, Learn pages,
   guides, references, and the requested SDK's pages keep Kapa's order, and nothing is dropped. `usecase` changes only the
   search text, and `os` changes nothing yet.

`sdk` and `os` accept common spellings (`.NET`, `golang`, `node`, `darwin`, `mac`) in any case. A value that isn't
recognized is ignored and the request still succeeds, so a hint in an unexpected form never breaks the panel. The
mapping is in `api/_recommend-lib.js`.

### Opening docs pages on the user's tabs

Many docs pages show a different code sample or command per SDK or operating system in a tab group. Docusaurus reads a
group's selection from the URL when the group has `queryString` set, so a docs card's `url` carries the user's context:

```
https://docs.temporal.io/develop/python/set-up-your-local-python?utm_source=recommendation&language=python&os=macos
```

- `language` selects the tab in `groupId="language"` groups and `os` the tab in `groupId="os"` groups. Every tab in the
  group on the page switches together. The values are the same `sdk` and `os` values the request accepts.
- A page without such a group ignores the parameters. Blog and Learn pages don't get them.
- The selection applies to that page view only. It isn't saved for later pages unless the user clicks a tab.
- Hand-written language tabs are keyed on the SDK name (`python`, `typescript`, `go`, `java`, `dotnet`). Pages that use
  `SdkTabs` are keyed on short codes (`py`, `ts`, `rb`, `rs`), so `SdkTabs` rewrites `language=python` to `language=py`
  on load (`src/components/elements/Sdk/SdkTabs.js`). When a tab group is added with a new value, make it match the SDK
  name.

### What the endpoint can't provide

- **Why a card matched.** The API doesn't return the matching topics. The panel's "Matches: …" label has to be built by
  the caller from its own topics.
- **Personalization.** Ranking is Kapa's relevance to the text sent. The endpoint knows nothing about the user.
- **Saved items, dismissed items, history.** The caller keeps that state.

## Content types

`type` comes from the page's host and URL path, not from frontmatter. Docs pages use the first matching path prefix:

| Page | `type` | `type_label` |
| --- | --- | --- |
| `docs.temporal.io/guides` | `guide` | Guide |
| `docs.temporal.io/quickstarts` | `tutorial` | Tutorial |
| `docs.temporal.io/develop` | `how-to` | How-to |
| `docs.temporal.io/references`, `/cli` | `reference` | Reference |
| Any other docs page | `docs` | Docs |
| Every `learn.temporal.io` page | `tutorial` | Tutorial |
| `temporal.io/blog/<post>` | `blog` | Blog |

Docs rules are `TYPE_RULES` in `api/_recommend-lib.js`. The Learn and blog rules are in `typeForUrl` in the same file.
A result on any other host, or on a temporal.io page that isn't a blog post, isn't returned.

## Snapshot of external page metadata

Kapa returns only a passage and a URL for blog and Learn pages, and a passage is an excerpt, not a page summary. So
`api/_external-content.json` holds a snapshot of every page's `og:title` and `og:description`, keyed by URL without the
anchor, query, or trailing slash. It's committed, not generated in the build, so a slow or down third-party site can't
break a docs deploy.

`bin/write-external-content.js` builds it:

1. Reads `temporal.io/sitemap.xml` (URLs that are `/blog/<slug>`) and `learn.temporal.io/sitemap.xml` (every page except
   the root, tag pages, and search).
1. Fetches each page, six at a time, retrying dropped connections, 429s, and 5xx responses. A page without a title, or
   with a description shorter than 30 characters, is left out. Both would show as bad card text.
1. Keeps the previous entry for a page that still fails after retries, and drops pages that left the sitemap.
1. Refuses to write when more than 10% of pages fail or a sitemap lists no matching pages.

A full run takes a few minutes. Run `node bin/write-external-content.js --check` to fetch without writing.

The `Update External Content Snapshot` workflow (`.github/workflows/update-external-content.yml`) runs it weekly, on
Mondays at 09:00 UTC, and on demand, and opens a pull request when the file changes. It reuses one branch,
`update-external-content/weekly-update`. A new post is missing from cards until that pull request merges, and a page
Kapa has indexed but the sitemap doesn't list is never returned.

## Code

| File | What it does |
| --- | --- |
| `api/recommend.js` | The Vercel Function: validation, the Kapa call, CORS, logging |
| `api/_recommend-lib.js` | Parameter parsing, content types, and card building, with no I/O. Tested in `api/_recommend-lib.test.js`. Reuses the allowlist and redirect handling from `api/_retrieve-lib.js` |
| `bin/write-content-manifest.js` | Writes `api/_content-manifest.json`. Tested in `bin/write-content-manifest.test.js` |
| `bin/write-external-content.js` | Writes `api/_external-content.json`. Tested in `bin/write-external-content.test.js`. See [Snapshot of external page metadata](#snapshot-of-external-page-metadata) |
| `api/_recommend.test.js` | Handler tests with Kapa, Blob, and the manifest stubbed |

The manifest maps each page's URL path to its title and description. It's generated from frontmatter by `yarn prebuild`
(which `yarn build` runs first), uses the same routing and folder-default helpers as the `markdown-pages` plugin, and is
gitignored. It leaves out `draft`, `unlisted`, and `llm_exclude` pages and pages without a `title` and `description`.
`vercel.json` lists it, and `api/_external-content.json`, in `includeFiles` for the function. If the docs manifest is missing
at runtime, the endpoint returns 500.

Run `node bin/write-content-manifest.js` after changing page titles or descriptions to refresh it locally.

## Configuration

Vercel project environment variables, set for Production and Preview. The endpoint reuses the variables from
[AGENT-RETRIEVE.md](./AGENT-RETRIEVE.md#configuration):

| Variable | Value |
| --- | --- |
| `KAPA_RECOMMEND_INTEGRATION_ID` | **Required.** A separate Kapa HTTP API integration for this endpoint, so its traffic and users are separate in Kapa analytics. When it's unset the endpoint returns 500 |
| `KAPA_API_KEY`, `KAPA_PROJECT_ID` | Same as `/api/retrieve` |
| `RETRIEVE_URL_ALLOWLIST` | Same as `/api/retrieve`. Results outside it are dropped before cards are built. It must list `temporal.io/blog` and `learn.temporal.io` for those cards to appear |
| `RETRIEVE_LOG_SALT` | Same as `/api/retrieve`. Changing it resets the user counts for both endpoints |
| `BLOB_READ_WRITE_TOKEN` | Same store as `/api/retrieve`, under the `recommend-log/` prefix |

## Limits and cost

Every call that reaches Kapa counts against the team limits for the key. The same three things bound the cost as for
`/api/retrieve`:

- **Vercel Firewall rate limit.** Add a rule on `/api/recommend` in the Vercel dashboard, separate from the one on
  `/api/retrieve`, and record the threshold and action here. The function has no rate limit of its own. This is the only
  limit on how much a caller can spend, so the endpoint shouldn't go live before it's set.
- **CDN cache.** A 200 response carries `Cache-Control: public, s-maxage=300, stale-while-revalidate=60`, so the same URL
  isn't sent to Kapa again for five minutes. Errors are `no-store`. A cache hit never reaches the function, so it isn't
  logged. Callers shouldn't add per-user parameters to the URL, which would defeat the cache. For the same reason a
  Refresh with unchanged topics returns the same cards for up to five minutes.
- **Timeout.** `maxDuration` is 15 seconds in `vercel.json`, longer than the 10-second Kapa timeout. A timeout returns 504.

## CORS

Every response, including errors and the `OPTIONS` preflight, sends `Access-Control-Allow-Origin: *`, so the Cloud UI
can call the endpoint from the browser. Any web page can also call it, and a browser can't hold a secret, so the rate
limit is the control, not the origin.

Once the product team gives us their production and staging domains, restrict it: read an optional
`RECOMMEND_ALLOWED_ORIGINS` list, and when it's set, echo the request `Origin` only if it's listed, add `Vary: Origin`,
and send no CORS header otherwise. An origin check stops other websites from calling it in a browser, not scripts, so
keep the rate limit.

## Request log

Each request writes one record to the private Blob store at `recommend-log/YYYY-MM-DD/<timestamp>-<random>.json`, and the
same record as one JSON line (`"event":"recommend"`) to the runtime logs. The Blob write happens after the response is
sent, and a failed write never fails the request.

| Field | Meaning |
| --- | --- |
| `ts` | Request time (ISO 8601) |
| `q`, `limit`, `src`, `agent` | The parameters as parsed |
| `sdk`, `usecase`, `os` | The user context, with `sdk` and `os` after mapping (`null` when absent or not recognized) |
| `ua`, `origin`, `country` | `User-Agent`, `Origin`, and `x-vercel-ip-country` headers. The origin is logged, not enforced |
| `ip_hash` | First 16 hex characters of SHA-256 of the salt and IP. Raw IPs aren't stored |
| `deployment` | `production`, `preview`, or `development` |
| `fetched_count` | Results Kapa returned |
| `skipped_count` | Results that didn't become a card: outside the allowlist, not a docs page, or not in the manifest. Repeats of a page already carded aren't counted |
| `card_count` | Cards returned |
| `total_count` | The response's `count`: cards available before `limit` |
| `status`, `upstream_status` | Status returned to the caller, and Kapa's status |
| `latency_ms` | Time spent in the function |
| `top_pages` | `url` of the first three cards, without the `utm_source` parameter |

`q` and `usecase` hold text a signed-in Cloud user chose or typed. Treat the store as sensitive, as for `/api/retrieve`. Whoever
owns the docs privacy policy must confirm it covers this log before the endpoint goes live. Kapa receives each query with a
hashed user ID and the `agent` name, never the IP.

## Not built yet

- The origin allowlist described under [CORS](#cors).
- A daily health check like `bin/check-retrieve-health.js`.
- A log report like `yarn report:retrieve-log`.
- One request that searches several topics at once. Callers that want a card per topic send one request per topic.
