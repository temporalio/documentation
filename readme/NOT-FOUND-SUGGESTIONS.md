# 404 suggested pages

A missing docs URL gets a list of up to four suggested pages from Algolia, in the server response. Agents that never run
the page's JavaScript see the list too.

## How it works

1. `vercel.json` rewrites an unmatched path with no file extension to `api/not-found.js`. Rewrites run after the
   filesystem check, so real pages and assets are unaffected. A missing URL with an extension (`/img/x.png`) keeps the
   normal 404. A `.md` URL or a request with `Accept: text/markdown` goes to `api/markdown-not-found.js`.
2. `pathToSearch` in `api/_not-found-lib.js` builds the Algolia search from the path. Its text is lowercase, split on
   anything that isn't a letter or digit, no pure numbers, no repeated words, at most 8 words. `/develop/python/workflow-versioning.md`
   becomes `develop python workflow versioning`.
3. `searchSuggestions` sends the string to the Algolia index the site search uses
   (`src/constants/algolia.js`, a public search-only key). It searches only page titles (H1) and H2 headings, because
   body text and deeper headings matched too loosely: a search for "durable timer" suggested Schedules, a concept
   readers confuse with Timers. A hit whose H1 matched suggests the page. A hit that matched only in an H2 suggests that
   section ("Page: Section", linked to its anchor). It keeps the first hit for each `docs.temporal.io` page, skips the
   requested page, and gives up after 2 seconds. Any failure means no suggestions, so the 404 is never worse than
   before.
   Two rules shape the search. The last path segment is the page name, so its words are required and the words from
   parent segments (`develop`, `workflows`) are optional (Algolia's `optionalWords`). When a whole segment names an
   SDK (`python`, `typescript`, `java`, `go`, `dotnet`, `ruby`, `php`, `rust`), it becomes an `sdk_language` facet filter
   and leaves the text query. Without that, `/develop/php/basics` searched title and H2 text for "php", found none, and
   Algolia's `removeWordsIfNoResults: allOptional` setting dropped the word and returned other SDKs' pages. SDK pages are
   titled with the index's `section_title` ("PHP SDK: Workflow basics"), since "Workflow basics" alone doesn't say which SDK.
4. The response keeps status 404 and `noindex`. HTML responses are the static `/404.html` with the list injected before
   `</body>`. The page is fetched from the deployment that is answering (the request host outside production, `docs.temporal.io`
   in production), because it names that build's JavaScript files. Markdown responses add a "Suggested pages" section. Both are cached at the CDN for an hour, per path.

The suggestions come from the search index. The requested path and the search string are never written into the response.

## Reader experience

In the raw HTML the list sits after the page body. In a browser, `src/theme/NotFound/Content/index.tsx` reads the JSON copy
of the list (`#not-found-suggestions-data`), shows it inside the page layout, and hides the server's copy. It reads the
data after mount so hydration matches the server HTML.

A reader who reaches a missing URL by client-side navigation never hits the server and sees the 404 page without
suggestions.

## Measuring clicks

Each link carries `utm_source=docs-404&utm_medium=suggestion&utm_campaign=404-suggestions&utm_content=<rank>`, where rank
is the position in the list. There is no `utm_term`, so the search string isn't copied into analytics URLs.

- **Browsers:** `src/theme/Root.tsx` fires `Docs 404 Suggestion Followed` (`url`, `rank`, `referrer`) when
  `utm_source=docs-404` is present and the reader has consented to analytics, then removes the `utm_` parameters from the
  address bar. It pairs with `Docs Page Not Found` for a 404 to suggestion funnel.
- **Agents:** they don't run Amplitude. Count requests with `utm_source=docs-404` in the Vercel request logs.

## Tests

`node --test api/_not-found-lib.test.js` covers path-to-query conversion, result filtering, escaping, UTM links, and
Algolia failures.
