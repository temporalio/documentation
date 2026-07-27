# Zoomable images (Stripe-style click-to-expand)

_Added June 2026._

## Summary

Large images in the docs are now **click-to-expand**, matching the behavior on
[Stripe's docs](https://docs.stripe.com/payment-links/buy-button#customize-the-button):

- An image sits in the normal content column at its fitted size.
- **If the image is wider than the space available**, hovering it shows a `zoom-in` cursor and clicking opens a full-width modal of the image at full resolution.
- Inside the modal the cursor is `zoom-out`; clicking the image, clicking the backdrop, pressing `Escape`, or the `×` button closes it and restores the page.
- **If the image already fits, nothing changes** — no cursor change, no modal, no behavioral difference.

The effect is automatic for every image in the docs. Authors do not need to do anything; whether an image is zoomable is decided at runtime by comparing the image's natural pixel width to the width it is actually displayed at.

## Opting out: `<NoZoom>`

Some images are decorative (e.g. the SDK banners on the `/develop` landing pages) and should never expand, even though they are downscaled. Wrap them in `<NoZoom>` to disable the click-to-expand affordance:

```mdx
<NoZoom>

![.NET](/img/assets/banner-dotnet-temporal.png)

</NoZoom>
```

- `<NoZoom>` is registered globally (`src/theme/MDXComponents.tsx`), so **no import is needed** in `.mdx` files. It is also exported from `src/components` for explicit use.
- Leave blank lines around the Markdown image inside the wrapper so MDX parses it as Markdown.
- The wrapper can contain multiple images, links, or captioned images — everything inside it renders as a plain, non-zoomable image.
- It works by providing a React context flag that `ZoomableImage` reads (`useNoZoom()`); when set, the overflow check never marks the image zoomable, so there is no zoom cursor and no modal.

All SDK banners under `docs/develop/**` are wrapped in `<NoZoom>`.

## What changed

| File | Change |
|---|---|
| `src/components/images/ZoomableImage.tsx` *(new)* | Core component. Detects overflow and renders the modal. |
| `src/components/images/ZoomableImage.module.css` *(new)* | Cursor, modal/backdrop, and `height: auto` styles. |
| `src/theme/MDXComponents.tsx` | Overrides the global `img` renderer, so **every Markdown image** (`![alt](src)`) flows through `ZoomableImage`; also registers `<NoZoom>` globally for opt-out. |
| `src/components/images/CaptionedImage.js` | Refactored to delegate to `ZoomableImage` while keeping captions and dark/light support. |
| `src/components/images/ZoomingImage.js`, `EnlargeImage.js` | Legacy components; kept working with their existing props but now open the shared modal instead of an inline toggle / new tab. |
| `src/components/images/NoZoom.tsx` *(new)* | Context wrapper that opts a subtree of images out of zoom. |
| `src/components/index.js` | Exports `ZoomableImage` and `NoZoom`. |

### How overflow is detected

On image load and whenever the column is resized (via a `ResizeObserver`), the component compares `img.naturalWidth` to the rendered `img.clientWidth`. The image is treated as zoomable only when it is being downscaled (`naturalWidth > clientWidth`). This is why the same image can be zoomable on a narrow laptop column (~630px) but not on a wide monitor (~1300px), and why high-resolution ("2x") screenshots — the bulk of our images — are zoomable.

### Aspect-ratio fix (important)

Docusaurus adds intrinsic `width` and `height` attributes to Markdown images (to prevent layout shift). The stock theme image applies a class that forces `height: auto`, so the height scales with the width under `max-width: 100%`. `ZoomableImage` now applies the same `height: auto` rule (`.image` in its CSS module). Without it, images were rendered at their fitted width but full intrinsic height — visibly squished. If you ever see distorted images, this class is the first thing to check.

## Benefits

- **Readable detail on dense screenshots.** Many UI screenshots are 1600–4096px wide and get downscaled into a ~700px column; users can now open them at full resolution.
- **Zero author overhead.** Works on existing and future Markdown images automatically — no new component to remember.
- **No false affordance.** Images that already fit are completely untouched, so we don't invite clicks that do nothing.
- **One consistent interaction.** The older `EnlargeImage` (opened a raw image in a new tab), `ZoomingImage`, and `CaptionedImage zoom="true"` (inline toggles) now share one modal.
- **Accessible modal.** `role="dialog"`, `aria-modal`, `Escape` to close, focusable close button, and body-scroll lock while open.

## Note: dark/light images now load on demand (performance trade-off)

`CaptionedImage` supports a `srcDark` variant. The behavior changed:

- **Before:** both the light and dark `<img>` were rendered into the DOM and swapped with CSS (`visibility`). Both files were downloaded up front, so toggling the site theme was instant.
- **Now:** the active variant is chosen in JavaScript with `useColorMode`, so **only the current theme's image is downloaded.**

**Trade-off:** initial page load fetches one image instead of two (faster, less bandwidth). But if a reader **switches the site theme while the page is open**, the other variant has not been downloaded yet, so it is fetched on the spot — the swapped image may flash or appear blank for a moment on slow connections or for large files. The fetch is cached after the first switch. This only affects images that actually declare a `srcDark`; plain Markdown images have a single source and are unaffected. 

> (in my opinion, this is a fine tradeoff... less bandwidth for the vast majority of cases, I don't believe theme switching is a common activity)

## How to test

1. `yarn start` and open a page with large images, e.g. [`/cloud/billing`](https://docs.temporal.io/cloud/billing) or [`/develop/go/client/temporal-client`](https://docs.temporal.io/develop/go/client/temporal-client).
2. Hover an oversized image → cursor becomes `zoom-in`. Click → full-width modal opens. Click the image / backdrop / `×`, or press `Escape` → it closes and the page scroll is restored.
3. Open a page whose images already fit → confirm there is **no** zoom cursor and clicking does nothing.
4. **Aspect ratio:** confirm images are not squished; compare against production ([docs.temporal.io](https://docs.temporal.io)).
5. **Responsive:** narrow the browser window and reload — images that fit at full width become zoomable as the column shrinks.
6. **Dark/light + captions:** open [`/codec-server`](https://docs.temporal.io/codec-server), toggle the navbar theme switch, and confirm the diagrams swap to their dark/light variants and the captions still render. Note the on-demand fetch described above on first toggle.

## Pages affected

### Pages that previously had explicit zoom — now use the shared modal

These already offered some form of "enlarge". Their interaction is now the unified click-to-expand modal.

| Page | Previous mechanism |
|---|---|
| [/develop/task-queue-priority-fairness](https://docs.temporal.io/develop/task-queue-priority-fairness) | EnlargeImage — click opened the raw image in a new browser tab |
| [/cloud/namespaces](https://docs.temporal.io/cloud/namespaces) | ZoomingImage (thumbnail→inline) + CaptionedImage |
| [/cloud/metrics/prometheus-grafana](https://docs.temporal.io/cloud/metrics/prometheus-grafana) | ZoomingImage (thumbnail→inline) |
| [/cloud/high-availability/ha-connectivity](https://docs.temporal.io/cloud/high-availability/ha-connectivity) | CaptionedImage zoom="true" (inline toggle) |
| [/cloud/migrate/migrate-within-cloud](https://docs.temporal.io/cloud/migrate/migrate-within-cloud) | CaptionedImage zoom="true" (inline toggle) |
| [/nexus](https://docs.temporal.io/nexus) | CaptionedImage zoom="true" (inline toggle) |
| [/nexus/execution-debugging](https://docs.temporal.io/nexus/execution-debugging) | CaptionedImage zoom="true" (inline toggle) |

> **Heads-up / follow-ups:** the new logic only zooms images that genuinely overflow the column, so a few *small* images that were manually marked zoomable no longer zoom:
> - `migrate-within-cloud.mdx` — its four `zoom="true"` images are only 310–751px wide (they fit the column), so they no longer zoom. They'd need higher-resolution sources to be worth expanding.
> - `namespaces.mdx` — the `ZoomingImage` there (`cloud-account-id.png`, 218px) was a tiny thumbnail; expanding it is no longer meaningful. The large `CaptionedImage`s on the same page do zoom.
> - `sdk-metrics-setup.mdx` — imports `ZoomingImage` but never renders it; the unused import can be removed.

### Newly zoomable pages (44)

Pages that did **not** previously have any zoom but contain raster images ≥ 800px wide, which now expand when downscaled. Grouped by area; the width shown is the page's largest image.

> The 60 SDK landing pages under `/develop/**` whose only large image was the shared _1800px_ banner are **excluded**: those banners are now wrapped in `<NoZoom>` (see "Opting out" above), so they no longer zoom.

#### Best practices

- [/best-practices/worker](https://docs.temporal.io/best-practices/worker) — _max 1200px_

#### Temporal Cloud

- [/cloud/billing](https://docs.temporal.io/cloud/billing) — _max 3842px_
- [/cloud/actions-usage](https://docs.temporal.io/cloud/actions-usage) — _max 2796px_
- [/cloud/capacity-modes](https://docs.temporal.io/cloud/capacity-modes) — _max 2686px_
- [/cloud/audit-logs-gcp](https://docs.temporal.io/cloud/audit-logs-gcp) — _max 2548px_
- [/cloud/high-availability/failovers](https://docs.temporal.io/cloud/high-availability/failovers) — _max 2407px_
- [/cloud/export/gcp-export-gcs](https://docs.temporal.io/cloud/export/gcp-export-gcs) — _max 2351px_
- [/cloud/metrics/openmetrics/migration-guide](https://docs.temporal.io/cloud/metrics/openmetrics/migration-guide) — _max 2200px_
- [/cloud/connectivity/gcp-connectivity](https://docs.temporal.io/cloud/connectivity/gcp-connectivity) — _max 2198px_
- [/cloud/connectivity/aws-connectivity](https://docs.temporal.io/cloud/connectivity/aws-connectivity) — _max 1999px_
- [/cloud/export/aws-export-s3](https://docs.temporal.io/cloud/export/aws-export-s3) — _max 1981px_
- [/cloud/nexus](https://docs.temporal.io/cloud/nexus) — _max 1714px_
- [/cloud/terraform-provider](https://docs.temporal.io/cloud/terraform-provider) — _max 1478px_
- [/cloud/migrate/automated](https://docs.temporal.io/cloud/migrate/automated) — _max 1202px_
- [/cloud/api-keys](https://docs.temporal.io/cloud/api-keys) — _max 822px_

#### Develop

- [/develop/worker-performance](https://docs.temporal.io/develop/worker-performance) — _max 2248px_

#### Develop — dotnet

- [/develop/dotnet/client/temporal-client](https://docs.temporal.io/develop/dotnet/client/temporal-client) — _max 4096px_
- [/develop/dotnet/nexus/feature-guide](https://docs.temporal.io/develop/dotnet/nexus/feature-guide) — _max 3542px_
- [/develop/dotnet/best-practices/data-handling](https://docs.temporal.io/develop/dotnet/best-practices/data-handling) — _max 1320px_

#### Develop — go

- [/develop/go/client/temporal-client](https://docs.temporal.io/develop/go/client/temporal-client) — _max 4096px_
- [/develop/go/nexus/feature-guide](https://docs.temporal.io/develop/go/nexus/feature-guide) — _max 3542px_
- [/develop/go/data-handling/data-conversion](https://docs.temporal.io/develop/go/data-handling/data-conversion) — _max 1320px_

#### Develop — java

- [/develop/java/client/temporal-client](https://docs.temporal.io/develop/java/client/temporal-client) — _max 4096px_
- [/develop/java/nexus/feature-guide](https://docs.temporal.io/develop/java/nexus/feature-guide) — _max 3542px_
- [/develop/java/best-practices/data-handling](https://docs.temporal.io/develop/java/best-practices/data-handling) — _max 1320px_

#### Develop — python

- [/develop/python/client/temporal-client](https://docs.temporal.io/develop/python/client/temporal-client) — _max 4096px_
- [/develop/python/nexus/feature-guide](https://docs.temporal.io/develop/python/nexus/feature-guide) — _max 3542px_

#### Develop — ruby

- [/develop/ruby/client/temporal-client](https://docs.temporal.io/develop/ruby/client/temporal-client) — _max 4096px_
- [/develop/ruby/best-practices/data-handling](https://docs.temporal.io/develop/ruby/best-practices/data-handling) — _max 1320px_

#### Develop — typescript

- [/develop/typescript/client/temporal-client](https://docs.temporal.io/develop/typescript/client/temporal-client) — _max 4096px_
- [/develop/typescript/nexus/feature-guide](https://docs.temporal.io/develop/typescript/nexus/feature-guide) — _max 3542px_
- [/develop/typescript/best-practices/debugging](https://docs.temporal.io/develop/typescript/best-practices/debugging) — _max 2702px_

#### Encyclopedia

- [/nexus/operations](https://docs.temporal.io/nexus/operations) — _max 3304px_
- [/handling-messages](https://docs.temporal.io/handling-messages) — _max 2006px_
- [/nexus/registry](https://docs.temporal.io/nexus/registry) — _max 1858px_
- [/nexus/security](https://docs.temporal.io/nexus/security) — _max 1342px_
- [/activity-definition](https://docs.temporal.io/activity-definition) — _max 1154px_
- [/task-queue](https://docs.temporal.io/task-queue) — _max 942px_
- [/encyclopedia/retry-policies](https://docs.temporal.io/encyclopedia/retry-policies) — _max 800px_

#### Evaluate

- [/cloud/limits](https://docs.temporal.io/cloud/limits) — _max 2752px_

#### Production deployment

- [/self-hosted-guide/monitoring](https://docs.temporal.io/self-hosted-guide/monitoring) — _max 2750px_
- [/self-hosted-guide/server-frontend-api-reference](https://docs.temporal.io/self-hosted-guide/server-frontend-api-reference) — _max 2148px_
- [/production-deployment/data-encryption](https://docs.temporal.io/production-deployment/data-encryption) — _max 2004px_
- [/self-hosted-guide/security](https://docs.temporal.io/self-hosted-guide/security) — _max 1407px_

---

_The page lists above cover raster images (PNG/JPG/etc.), which are the large screenshots that motivated this change. SVG diagrams are vector and stay crisp at any size; they only trigger the zoom affordance if they declare an intrinsic width larger than the column, and expanding them adds little._
