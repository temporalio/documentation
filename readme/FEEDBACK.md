# Feedback endpoint (`/api/feedback`)

`https://docs.temporal.io/api/feedback` takes feedback from two places:

- **Agents** report problems they hit with the docs or with Temporal itself: a wrong flag, a missing page, an SDK
  that behaves differently from what a page says.
- **The page feedback widget** records a reader's Yes or No answer to "Was this page helpful?", plus an optional
  reason and comment.

Each accepted submission is stored as one private Vercel Blob. A daily digest posts a summary to Slack, where the
docs team fixes docs problems and forwards product problems to the team that owns them.

Status: the endpoint is live but not advertised. The widget, the digest, and the agent-facing copy in `llms.txt` and
the `.md` pages ship in later pull requests.

## Agent reports

Send either a `POST` with a JSON body or a `GET` with the same fields as query parameters. Many agent fetch tools can
only send `GET`, so both write a report.

```
POST https://docs.temporal.io/api/feedback
Content-Type: application/json

{"title": "...", "message": "...", "category": "documentation", "page_url": "https://docs.temporal.io/cli/workflow.md"}
```

```
GET https://docs.temporal.io/api/feedback?title=...&message=...&category=product&agent=claude-code
```

| Field | Required | Limit | Purpose |
| --- | --- | --- | --- |
| `title` | Yes | 120 characters (400 if longer) | One-line summary |
| `message` | Yes | 2,000 (400 if longer) | What happened |
| `expected` | No | 1,000 (400 if longer) | What the docs said, or what the agent expected |
| `context` | No | 1,000 (400 if longer) | What the agent was trying to do |
| `category` | No | `documentation`, `docs_search`, `product`, `other` | Defaults to `other` |
| `severity` | No | `high` (blocked), `medium` (workaround), `low` (annoyance) | Defaults to `medium` |
| `page_url` | No | 300 (400 if longer) | The page the report is about |
| `product_version` | No | 64 (cut) | SDK, CLI, or server version |
| `agent` | No | 64 (cut) | The calling agent's name |
| `src` | No | 32 (cut) | Which surface the agent found the endpoint on |

The categories and severities match the Temporal Docs MCP server's `give_feedback` tool, so reports from both can be
read together.

A `GET` without a `title` and `message` returns 400 and writes nothing, so a crawler or link prefetcher that follows
the bare URL doesn't create a record.

`page_url` is normalized so reports about one page group together, however the sender reached it:

- A path or a `docs.temporal.io` URL loses its query and fragment.
- A `.md` URL maps to the HTML page, and `/index.md` maps to `/`.
- `vercel.json` redirects are followed to the current page.
- A URL on another host, such as a GitHub issue, is kept as sent.

A stored report returns `202 { id, message }`. The message tells the agent it doesn't need to send the report again.

## Widget submissions

The widget follows the pattern on Stripe's docs. The Yes or No click is stored right away, whether or not the reader
goes on to pick a reason or write a comment. A reason or comment sent later belongs to the same entry:

1. **The reader clicks Yes or No.** The widget sends
   `POST { "channel": "widget", "page_url": "...", "rating": "up" | "down" }`. The response is
   `202 { id, amend_token }`.
2. **The reader picks a reason or writes a comment.** The widget sends
   `POST { "channel": "widget", "id", "amend_token", "rating", "reason", "comment" }`. The response is `202 { id }`.

The amendment is stored as its own Blob next to the entry, not as an overwrite. Overwriting would mean reading the
entry back first, and Blob's cache can return a stale copy for up to 60 seconds. Readers merge an entry with its
amendments by `id`, and the latest amendment wins, so a reader can change their rating after a misclick.

`amend_token` is an HMAC of the entry `id`, keyed with `FEEDBACK_LOG_SALT`. An amendment needs it and has to arrive
within 30 minutes of the rating, so no one else can change an entry. A wrong token or a late amendment returns 403.

| Field | Values |
| --- | --- |
| `rating` | `up`, `down` |
| `reason` for `down` | `inaccurate`, `not_found`, `hard_to_understand`, `code_sample_errors`, `other` |
| `reason` for `up` | `accurate`, `solved_problem`, `easy_to_understand`, `helped_decide`, `other` |
| `comment` | 1,000 characters. Accepted only with a `reason` |

A reason that doesn't belong to the rating returns 400. The widget channel accepts `POST` only, and `page_url` must be a
docs page.

## Errors

Errors are JSON `{ error }`. A 400, 405, or 413 also includes a `usage` string.

| Status | Meaning |
| --- | --- |
| 400 | A missing or invalid field, or a body that isn't JSON |
| 403 | A widget amendment with the wrong `amend_token`, or after its 30-minute window |
| 405 | A method other than `GET`, `POST`, or `OPTIONS` |
| 413 | A body over 8 KB |
| 500 | `FEEDBACK_LOG_SALT` or `BLOB_READ_WRITE_TOKEN` is unset. Nothing is stored |
| 503 | The Blob write failed. The sender can try again |

The Blob write finishes before the response is sent, unlike `/api/retrieve`'s log. Feedback that isn't stored is
lost, so the sender is told when that happens.

## Code

| File | What it does |
| --- | --- |
| `api/feedback.js` | The Vercel Function: reading the request, the amendment check, the Blob write |
| `api/_feedback-lib.js` | Parsing, `page_url` normalization, entry IDs, and amend tokens, with no I/O. Tested in `api/_feedback-lib.test.js` |
| `api/_log.js` | `header()`, `ipHash()`, and `putRecord()`, shared with `api/retrieve.js` |
| `api/_feedback.test.js` | Handler tests with Blob stubbed |

The `Test API Functions` workflow (`.github/workflows/test-api.yml`) runs `node --test 'api/*.test.js'` on pull
requests that change `api/`, `vercel.json`, or `bin/redirect-utils.js`.

## Configuration

These are Vercel project environment variables, set for Production and Preview:

| Variable | Value |
| --- | --- |
| `FEEDBACK_LOG_SALT` | **Required.** A random string used to hash caller IPs and to sign amend tokens. Use a different value from `RETRIEVE_LOG_SALT`. Rotating it invalidates amend tokens issued in the last 30 minutes |
| `BLOB_READ_WRITE_TOKEN` | **Required.** Added by Vercel when the private Blob store is connected to the project. The same store as `/api/retrieve`, under a different prefix |

## Limits

- **Vercel Firewall rate limit.** Add a rule on `/api/feedback` that caps calls per IP, for example 10 per minute. It's
  set in the Vercel dashboard, not in this repository, so record the current threshold and action here when you change
  it. Not set yet.
- **Field and body limits.** Text fields over their limit return 400, and a body over 8 KB returns 413.
- **No CORS headers.** Agents call from a server or a tool, and the widget posts from the same origin.
- **Nothing is cached.** Every response is `Cache-Control: no-store`, because a `GET` writes a record too.

## Storage

Each entry is one Blob at `feedback/YYYY-MM-DD/<id>.json`. A widget amendment is at
`feedback/YYYY-MM-DD/<id>.amend-<amendment-id>.json`, in the entry's day folder even when it arrives after midnight
UTC. An `id` starts with the UTC time to the millisecond, for example `20261026T153012345Z-a1b2c3d4`, so entries sort
in time order.

| Field | In | Meaning |
| --- | --- | --- |
| `id`, `ts` | Entries | Entry ID and request time |
| `kind` | All | `report` (agent), `rating` (widget), or `amendment` (widget) |
| `channel` | All | `agent` or `widget` |
| `amended_at` | Amendments | Time of the amendment. `id` is the entry it amends |
| The fields above | All | As parsed. `amend_token` is never stored |
| `ua`, `country` | All | `User-Agent` and `x-vercel-ip-country` |
| `ip_hash` | All | First 16 hex characters of SHA-256 of the salt and IP. Raw IPs aren't stored |
| `deployment` | All | `production`, `preview`, or `development` |
| `bot_verdict` | Widget entries | `unchecked` until Vercel BotID is added |

Each request also writes one JSON line (`"event":"feedback"`) to the runtime logs, with the status, kind, channel,
`id`, category, severity, agent, and `src`. Free text from the public goes only to the Blob store, never to the
runtime logs.

To download the records, run `vercel blob list --prefix feedback/` from a linked checkout, or use the Storage tab in
the Vercel dashboard.

## Retention and privacy

The store holds free text from the public. Treat it as sensitive, and don't copy records out of the store except into
the Slack digest or as aggregate counts. Delete records older than 180 days. Duncan Mackenzie owns the store and the
deletion.

Before the widget or the agent-facing copy ships, the owner of the docs privacy policy must confirm that it covers
storing these comments and reports.
