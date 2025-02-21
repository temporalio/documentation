# Configurable documentation components

## Images

### `ZoomableImage`

- Original developed with direct `<div>` use, provided a way to display a large image at a smaller size.
- Originally intended for use in instruction lists 
- Now converted to a re-usable component.

#### Compatibility

[x] Dark mode
[x] Light mode
[x] Desktop
[x] Mobile
[x] Accessibility (AX)
[x] Alt text
[x] Should fully develop
[ ] Should deprecate

#### Usage

```
import ZoomableImage from '@site/src/components/zoompic/ZoomableImage';

<ZoomableImage src="/path/to/image" alt="alt text" ariaLabel="accessibility description" /> 

```

### `CaptionedImage`

- Built as a dark- and light-mode alternative to Pretty Images 
- Omits the white background buffering
- Moves the caption _after_ the image.

#### Compatibilities

[x] Dark mode
[x] Light mode
[x] Desktop
[x] Mobile
[x] Alt text
[ ] Accessibility (AX)
[x] Should fully develop

#### Usage

```
import CaptionedImage from '@site/src/components/captioned-image/CaptionedImage';

<CaptionedImage src="/path/to/image" title="Caption, also used for alt text" />
```

Future development:

- Should be redesigned for separate alt descriptions
- Should adopt aria accessibility (AX) standards.
- Possibly offer tweaks for text and image alignment and borders 

### `PrettyImage`

Please avoid. This is not suitable for dark modes. It also takes up quite a lot of vertical space in light mode and the caption appears at the top.

#### Compatibilities

[ ] Dark mode
[x] Light mode
[ ] Desktop
[ ] Mobile
[ ] Accessibility (AX)
[x] Alt text
[ ] Should fully develop
[x] Should deprecate

#### Usage

```
import PrettyImage from '@site/src/components/pretty-image/PrettyImage';

<PrettyImage src="/diagrams/remote-data-encoding.svg" title="Remote data encoding architecture" />
```

./docs/encyclopedia/application-message-passing.mdx
./docs/encyclopedia/detecting-activity-failures.mdx
./docs/encyclopedia/workflows.mdx
./docs/encyclopedia/detecting-workflow-failures.mdx
./docs/encyclopedia/temporal-sdks.mdx
./docs/encyclopedia/retry-policies.mdx
./docs/production-deployment/data-encryption.mdx

### Direct `div` approaches

Please avoid this 'tdiiw' approach. 
(also tditw, tdiw, 27 uses each in the docs)

#### Compatibility

[ ] Dark mode
[x] Light mode
[x] Desktop
[x] Mobile
[ ] Accessibility (AX)
[x] Alt text
[ ] Should fully develop
[x] Should deprecate

#### Usage
```
<div className="tdiiw" height="333">
    <img
      className="img_ev3q"
      src="/img/data-encoder-button.png"
      src="/img/info/data-encoder-button.png"
      alt="Codec Server endpoint browser setting"
    />
  </div>
```

### Direct use of `img`

Should be audited for appropriate use.
It is sometimes unavoidable in tables.

## Disclosures

### `DiscoverableDisclosure`

- Allows expansion of documentation material on demand.
- Reduces vertical consumption of space in documentation for reference-only content.
- An alternate to `<detail><summary></summary></detail>` with better visibility and user experience.

#### Compatibility

[x] Dark mode
[x] Light mode
[x] Desktop
[x] Mobile
[x] Alt text
[x] Accessibility (AX)
[x] Should fully develop
[ ] Should deprecate

#### Usage

```
import DiscoverableDisclosure from '@site/src/components/disclosures/DiscoverableDisclosure';

<DiscoverableDisclosure label="Summary">
Hidden content
</DiscoverableDisclosure>
```

- An optional `prompt="alternate prompt" replaces "Dive deeper -"

## Definitions

### `ExpandableDefinition`

#### Compatibilities

[x] Dark mode
[x] Light mode
[x] Desktop
[x] Mobile
[x] Accessibility (AX)
[x] Should fully develop

#### Usage

```
import ExpandableDefinition from '@site/src/components/definitions/ExpandableDefinition';

<ExpandableDefinition term="a term" tooltip="definition of the term">
```

## Not covered here/yet

- `RelatedRead`
- `ResponsivePlayer`
- `Button`
