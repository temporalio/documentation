# Amplitude analytics

docs.temporal.io sends events to the **Temporal** Amplitude project (ID `653026`), which it shares with temporal.io and
Temporal Cloud. To limit a chart to the docs site, filter on `[Amplitude] Page Domain` is `docs.temporal.io`.

The site records clicks in two ways:

- **Autocapture.** Amplitude's browser SDK sends `[Amplitude] Element Clicked` for every link and button click. Each event
  carries the element's text, href, and DOM hierarchy. Any `data-amp-track-<name>` attribute on the element arrives as
  the property `[Amplitude] Element Attributes.<name>`.
- **Explicit events.** Code calls `trackEvent()` from `src/utils/analytics.ts`. Use an explicit event when autocapture
  can't identify the action: a keyboard shortcut, an icon-only button, or a control whose result matters more than the
  click itself.

Both kinds of tracking only run when the reader has analytics consent. Amplitude itself loads through Google Tag
Manager (container `GTM-TSXFPF2`), which `static/scripts/googletag.js` starts with the reader's consent state on every
page load.

Check consent with `hasDocsAnalyticsConsent()` from `src/utils/analyticsConsent.js` (`trackEvent()` already does), not
by reading the `consent` cookie alone. In US states with an opt-out privacy law, the consent banner grants analytics by
default but records that only in localStorage. The banner sends the `consent_granted` event that loads Amplitude only
the first time, so `googletag.js` reads the same localStorage record to load Amplitude on return visits.
`googletag.js` can't import the helper, so it repeats the rule. Tests in `src/utils/analyticsConsent.test.js` check
that the two agree.

## Navbar

| What | How it's tracked | Properties |
| ---- | ---------------- | ---------- |
| Navbar links (Home, SDKs, and so on) | `[Amplitude] Element Clicked` | `Element Attributes.nav-item`: the label from `docusaurus.config.js`. `Element Attributes.nav-surface`: `navbar`, `mobile-menu`, or `dropdown` |
| Logo | `[Amplitude] Element Clicked` | `Element Attributes.nav-item`: `Logo` |
| Search | `Docs Search Opened` | `method`: `button` or `shortcut`. `shortcut`: `mod+k` or `/` |
| Theme toggle | `Docs Theme Changed` | `from`, `to`: `light`, `dark`, or `system` |
| Ask AI | `Docs Ask AI Opened` | `surface`: `navbar` or `search`. `widget_loaded` (navbar only): `false` when the Kapa script didn't load. `query` (search only): the search text |

`nav-item` stays in English when a reader's browser translates the page, so group by it rather than by
`[Amplitude] Element Text`. The attributes are set in `src/components/TemporalNavbarLink.js` and `src/theme/Logo/index.js`.

temporal.io sends its own `Ask AI Opened` and `Ask AI Question Asked` events. The docs event uses a `Docs` prefix so the
two don't mix in charts that don't filter by domain.

## Other events

| Event | Fired from | Properties |
| ----- | ---------- | ---------- |
| `Search Result Clicked` | `src/theme/SearchBar/trackSearchEvent.ts` | `objectID`, `url` |
| `Search No Results` | `src/theme/SearchBar/trackSearchEvent.ts` | `query` |
| `Sidebar Collapsed`, `Sidebar Expanded` | `src/theme/DocSidebar/Desktop/CollapseButton`, `src/theme/DocRoot/Layout/Sidebar/ExpandButton` | none |
| `Docs Page Not Found` | `src/theme/NotFound/Content/index.tsx` | `url`, `referrer`. See [NOT-FOUND-SUGGESTIONS.md](./NOT-FOUND-SUGGESTIONS.md) |
| `Docs 404 Suggestion Followed` | `src/theme/Root.tsx` | `url`, `rank`, `referrer` |
| `Docs Page Feedback`, `Docs Page Feedback Reason` | `src/components/PageFeedback/PageFeedback.tsx` | `rating`, `reason`, `url`. See [FEEDBACK.md](./FEEDBACK.md) |
| `[Amplitude] Element Clicked` on footer social icons | `src/theme/Footer/Copyright/index.tsx` | `Element Attributes.platform` |

## Add tracking

- For a link, add a `data-amp-track-<name>` attribute and let autocapture send it.
- For anything else, call `trackEvent('Docs <Thing> <Past-tense verb>', { ... })`. Start new event names with `Docs` so
  they don't collide with events from temporal.io or Temporal Cloud.
- Add the event to the tables on this page.
