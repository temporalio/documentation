# Agent search endpoint (`/api/retrieve`)

`https://docs.temporal.io/api/retrieve` is a public, no-auth search endpoint for AI agents. It forwards a question to
Kapa's Retrieval API with a server-side key and returns the matching passages from the docs.

It's an **experiment**. The question is whether agents find and use a search URL that's advertised only where agents
read (`llms.txt`, hidden page text, and the per-page `.md` files), and which of those surfaces they find it through.
Agents that can complete an MCP OAuth flow can use the [Temporal Docs MCP Server](https://temporal.mcp.kapa.ai)
instead. This endpoint is for the ones that can't.

## Request and response

```
GET https://docs.temporal.io/api/retrieve?q=<question>&jtb=<job-to-be-done>&src=<surface>&agent=<agent-name>
```

| Parameter | Required | Limit | Purpose |
| --- | --- | --- | --- |
| `q` | Yes | 500 characters (400 if longer) | The question sent to Kapa |
| `jtb` | No | 300 characters (cut) | What the user is trying to do, logged only |
| `src` | No | 32 characters (cut) | Which surface the agent found the URL on, logged only |
| `agent` | No | 64 characters (cut) | The calling agent's name, logged only |

The `src` values used in the advertised copy are `llms`, `docs-page`, and `md-page`. `bin/check-retrieve-links.js` sends
`link-check`. Any other value is logged as sent.

The response is a JSON array, most relevant first:

```json
[
  {
    "content": "…",
    "source_url": "https://docs.temporal.io/develop/python/workflows/versioning.md",
    "page_url": "https://docs.temporal.io/develop/python/workflows/versioning#patching"
  }
]
```

For docs results, `source_url` is the page's raw Markdown and `page_url` is the HTML page to cite. The function follows
`vercel.json` redirects first, so a page Kapa indexed under an old URL points at its current location. The anchor is
kept on `page_url` only, because the `.md` has no anchor targets. Results from other allowed sources
(SDK references, release notes, the blog) come back with both fields set to Kapa's original URL.

Errors are JSON `{ error }`. A 400 or 405 also includes a `usage` string. A result that Kapa returns without a string `content` or `source_url` is dropped and counted in `dropped_count`.

## Code

| File | What it does |
| --- | --- |
| `api/retrieve.js` | The Vercel Function: validation, the Kapa call, logging |
| `api/_retrieve-lib.js` | Parameter parsing and URL rewriting, with no I/O. Tested in `api/_retrieve-lib.test.js` |
| `bin/check-retrieve-links.js` | `yarn check:retrieve-links [baseUrl]`: asks 20 sample questions and checks that every docs `source_url` returns 200 |

`middleware.js` excludes `api/` from Markdown content negotiation. Without that, an agent that sends
`Accept: text/markdown` would be rewritten to `/api/retrieve.md` and get a 404.

## Configuration

These are Vercel project environment variables, set for Production and Preview:

| Variable | Value |
| --- | --- |
| `KAPA_API_KEY` | The `docs-agent-retrieve-experiment` key. It's separate from the widget and MCP keys, so it can be rotated alone |
| `KAPA_PROJECT_ID` | The production Kapa project |
| `KAPA_INTEGRATION_ID` | The `docs-agent-retrieve-experiment` HTTP API integration, which keeps this traffic separate in Kapa analytics |
| `KAPA_SOURCE_IDS` | Comma-separated Kapa source IDs, sent as `source_ids_include`. Set to the 20 web crawl sources. **As of 2026-10-23, Kapa's Retrieval endpoint accepts this field but ignores it**, so `RETRIEVE_URL_ALLOWLIST` does the filtering. It's kept so it takes effect if Kapa starts honoring it. A source group filter can't replace it, because Kapa adds every Global source to any group filter |
| `RETRIEVE_URL_ALLOWLIST` | **Required.** Comma-separated `host` or `host/path-prefix` entries. Results whose URL isn't covered are dropped before the response is built. A prefix matches whole path segments, so `github.com/temporalio/sdk-go/releases` covers `/releases/tag/v1.30.0` but not the private `github.com/temporalio/edu-*` course repos. When it's unset the endpoint returns 500 instead of searching, so a missing variable can't expose results from private sources |
| `RETRIEVE_LOG_SALT` | **Required.** A random string used to hash caller IPs in the log. When it's unset the endpoint returns 500, so no request is logged without a hash |
| `BLOB_READ_WRITE_TOKEN` | Added by Vercel when the private Blob store is connected to the project |

A Vercel Firewall rate-limit rule on `/api/retrieve` caps calls per IP. Every call counts against the Kapa team limits
for the one key.

To revoke access, rotate or delete the key in Kapa and update `KAPA_API_KEY`. The endpoint then returns 502 until a
valid key is set.

## Request log

Each request writes one record to the private Blob store at `retrieve-log/YYYY-MM-DD/<timestamp>-<random>.json`, and the
same record as one JSON line (`"event":"retrieve"`) to the runtime logs. The Blob write happens after the response is
sent, and a failed write never fails the request.

| Field | Meaning |
| --- | --- |
| `ts` | Request time (ISO 8601) |
| `q`, `jtb`, `src`, `agent` | The parameters as parsed |
| `ua` | `User-Agent` header |
| `country` | `x-vercel-ip-country` |
| `ip_hash` | First 16 hex characters of SHA-256 of the salt and IP. Raw IPs aren't stored |
| `deployment` | `production`, `preview`, or `development` |
| `source_ids_sent` | Number of IDs in `KAPA_SOURCE_IDS` sent to Kapa. Kapa ignores them today, so this doesn't mean the search was limited to those sources |
| `dropped_count` | Results Kapa returned that `RETRIEVE_URL_ALLOWLIST` dropped. `result_count` is what's left |
| `status`, `upstream_status` | Status returned to the caller, and Kapa's status |
| `result_count` | Number of results. `0` points at a content gap |
| `latency_ms` | Time spent in the function |
| `top_pages` | `page_url` of the first three results |

The log holds free-text questions from the public. The advertised copy asks agents not to send personal data, but
treat the store as sensitive anyway, and delete it when the experiment is over.

To download the log, run `vercel blob list --prefix retrieve-log/` from a linked checkout, or use the Storage tab in
the Vercel dashboard.
