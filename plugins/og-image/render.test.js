// Guards the card layout against renderer changes (for example a satori
// upgrade). A layout regression such as the footer being pushed off the card
// still produces a valid image, so the build can't catch it. These tests
// render real cards and assert where satori placed the footer.
//
// Run by .github/workflows/check-og-image-render.yml whenever the plugin, its
// fonts, or the satori/resvg/sharp dependencies change.

const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { renderSvg, renderCard, CARD_WIDTH, CARD_HEIGHT } = require('./render');

// Matches the 64px padding in render.js's content column.
const PADDING = 64;
const TOLERANCE = 2;

const CARDS = {
  short: { title: 'Workflows', description: 'A short description.' },
  longest: {
    title: 'A very long page title that wraps onto the maximum number of lines allowed',
    description:
      'A long description that also wraps onto several lines so the content column is as tall as it can get on a real card.',
  },
  noDescription: { title: 'Title with no description' },
};

// The logo is the only <image> besides the full-card background, and satori
// reports its position as attributes on the element.
function findLogo(svg) {
  const images = [...svg.matchAll(/<image\b[^>]*>/g)].map((m) => m[0]);
  const attr = (tag, name) => Number((tag.match(new RegExp(`\\b${name}="([\\d.]+)"`)) || [])[1]);
  const logos = images
    .map((tag) => ({ x: attr(tag, 'x'), y: attr(tag, 'y'), width: attr(tag, 'width'), height: attr(tag, 'height') }))
    .filter((box) => box.width < CARD_WIDTH);
  assert.equal(logos.length, 1, `expected exactly one logo <image>, found ${logos.length}`);
  return logos[0];
}

describe('og-image card layout', () => {
  for (const [name, card] of Object.entries(CARDS)) {
    it(`keeps the footer logo inside the card padding (${name})`, async () => {
      const svg = await renderSvg(card);
      assert.match(svg, new RegExp(`height="${CARD_HEIGHT}"`), 'SVG should keep the card height');

      const logo = findLogo(svg);
      assert.ok(Number.isFinite(logo.y), 'logo position should be reported by satori');
      const bottom = logo.y + logo.height;
      assert.ok(
        bottom <= CARD_HEIGHT - PADDING + TOLERANCE,
        `footer logo bottom is at ${bottom}px; it should end by ${CARD_HEIGHT - PADDING}px so the footer stays on the card`,
      );
      assert.ok(logo.x >= PADDING - TOLERANCE, `footer logo left edge is at ${logo.x}px, expected >= ${PADDING}px`);
    });
  }

  it('encodes a JPEG with the expected dimensions', async () => {
    const sharp = require('sharp');
    const meta = await sharp(await renderCard(CARDS.short)).metadata();
    assert.equal(meta.format, 'jpeg');
    assert.equal(meta.width, CARD_WIDTH);
    assert.equal(meta.height, CARD_HEIGHT);
  });
});
