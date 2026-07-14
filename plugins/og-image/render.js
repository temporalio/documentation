const fs = require('fs');
const path = require('path');
const satori = require('satori').default;
const { Resvg } = require('@resvg/resvg-js');
const sharp = require('sharp');
const { TITLE_COLOR, SUBTITLE_COLOR, FOOTER_COLOR } = require('../../src/constants/ogImageColors');

const CARD_WIDTH = 1200;
const CARD_HEIGHT = 630;

// Bump this whenever the card layout/design changes (including the encoding
// step below) so cached images invalidate even though the underlying page
// content didn't change.
const TEMPLATE_VERSION = 7;

// The icon spans the full height of the lockup's viewBox (0-395 of 0-395),
// so rendering the whole icon+wordmark asset at LOGO_HEIGHT makes the icon
// itself exactly LOGO_HEIGHT square (matches Figma's ~60x60 icon spec)
// while keeping the already-correct icon-to-wordmark proportions intact.
const LOGO_HEIGHT = 60;
const LOGO_ASPECT_RATIO = 1571 / 395;

const DESCRIPTION_MAX_LINES = 3;

function dataUri(assetPath, mimeType) {
  const data = fs.readFileSync(assetPath);
  return `data:${mimeType};base64,${data.toString('base64')}`;
}

let assetsPromise;
function loadAssets() {
  if (!assetsPromise) {
    const fontsDir = path.resolve(__dirname, '../../src/fonts');
    assetsPromise = Promise.resolve({
      fonts: [
        {
          name: 'Aeonik',
          data: fs.readFileSync(path.join(fontsDir, 'Aeonik/Aeonik-Light.woff')),
          weight: 300,
          style: 'normal',
        },
        {
          // Static instance derived from the variable font at wght=400,
          // opsz=14 (via `fonttools varLib.instancer`) — same reason as
          // Noto Sans Mono below, satori's font parser can't load a
          // variable font directly, and Google Fonts doesn't publish a
          // static build of this family either.
          name: 'Inter',
          data: fs.readFileSync(path.join(fontsDir, 'Inter/Inter-Regular.ttf')),
          weight: 400,
          style: 'normal',
        },
        {
          // Static instance derived from the variable font at wght=400,
          // wdth=100 (via `fonttools varLib.instancer`) — satori's font
          // parser (an older opentype.js fork) crashes on the variable font
          // itself (no fvar table support), so we can't load it directly.
          name: 'Noto Sans Mono',
          data: fs.readFileSync(path.join(fontsDir, 'Noto Sans Mono/NotoSansMono-Regular.ttf')),
          weight: 400,
          style: 'normal',
        },
      ],
      logo: dataUri(path.resolve(__dirname, '../../static/img/assets/temporal-logo.svg'), 'image/svg+xml'),
      background: dataUri(path.resolve(__dirname, '../../static/img/assets/og-background.png'), 'image/png'),
    });
  }
  return assetsPromise;
}

function buildTree({ title, description }, { logo, background }) {
  return {
    type: 'div',
    props: {
      style: {
        width: '100%',
        height: '100%',
        display: 'flex',
        position: 'relative',
      },
      children: [
        {
          type: 'img',
          props: {
            src: background,
            width: CARD_WIDTH,
            height: CARD_HEIGHT,
            style: { position: 'absolute', top: 0, left: 0 },
          },
        },
        {
          type: 'div',
          props: {
            style: {
              position: 'relative',
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '64px',
              fontFamily: 'Inter',
            },
            children: [
              {
                type: 'div',
                props: {
                  style: { display: 'flex', flexDirection: 'column', gap: 24 },
                  children: [
                    {
                      type: 'div',
                      props: {
                        style: {
                          display: 'flex',
                          fontFamily: 'Aeonik',
                          fontSize: 75,
                          fontWeight: 300,
                          color: TITLE_COLOR,
                          lineHeight: 1.15,
                          maxWidth: '92%',
                        },
                        children: title,
                      },
                    },
                    description
                      ? {
                          type: 'div',
                          props: {
                            style: {
                              display: 'block',
                              fontFamily: 'Inter',
                              fontSize: 30,
                              fontWeight: 400,
                              color: SUBTITLE_COLOR,
                              lineHeight: 1.35,
                              maxWidth: '80%',
                              lineClamp: DESCRIPTION_MAX_LINES,
                            },
                            children: description,
                          },
                        }
                      : null,
                  ].filter(Boolean),
                },
              },
              {
                type: 'div',
                props: {
                  style: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
                  children: [
                    {
                      type: 'img',
                      props: { src: logo, width: Math.round(LOGO_HEIGHT * LOGO_ASPECT_RATIO), height: LOGO_HEIGHT },
                    },
                    {
                      type: 'div',
                      props: {
                        style: {
                          display: 'flex',
                          fontFamily: 'Noto Sans Mono',
                          fontSize: 25,
                          fontWeight: 400,
                          color: FOOTER_COLOR,
                        },
                        children: 'DOCS.TEMPORAL.IO',
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
      ],
    },
  };
}

async function renderCard({ title, description }) {
  const { fonts, logo, background } = await loadAssets();
  const svg = await satori(buildTree({ title, description }, { logo, background }), {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    fonts,
  });
  const resvg = new Resvg(svg, {
    fitTo: { mode: 'width', value: CARD_WIDTH },
  });
  const png = resvg.render().asPng();

  // resvg's PNG encoder has no compression/quality knobs. A textured photo-
  // like background (grid lines + gradient + grain) compresses terribly as
  // lossless PNG (~320KB/card even palette-quantized) — palette quantization
  // works well for flat/gradient-only art but not this kind of detail.
  // JPEG is built for exactly this kind of content: quality 80 lands at
  // ~70KB/card with no visible artifacting around the text edges (checked
  // at 2x zoom), an ~80% reduction over the palette-PNG approach.
  return sharp(png).jpeg({ quality: 80 }).toBuffer();
}

module.exports = { renderCard, TEMPLATE_VERSION, CARD_WIDTH, CARD_HEIGHT, IMAGE_EXTENSION: 'jpg' };
