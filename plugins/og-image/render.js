const fs = require('fs');
const path = require('path');
const satori = require('satori').default;
const { Resvg } = require('@resvg/resvg-js');
const sharp = require('sharp');

const CARD_WIDTH = 1200;
const CARD_HEIGHT = 630;

// Bump this whenever the card layout/design changes (including the encoding
// step below) so cached images invalidate even though the underlying page
// content didn't change.
const TEMPLATE_VERSION = 4;

const GRADIENT_FROM = '#3730a3';
const GRADIENT_TO = '#0a0a17';
const TITLE_COLOR = '#f8fafc';
const SUBTITLE_COLOR = '#9ca3af';
const ACCENT_COLOR = '#1d4ed8';
const FOOTER_COLOR = '#6b7280';

const DESCRIPTION_MAX_LINES = 3;

function dataUri(svgPath) {
  const svg = fs.readFileSync(svgPath, 'utf8');
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
}

let assetsPromise;
function loadAssets() {
  if (!assetsPromise) {
    const fontsDir = path.resolve(__dirname, '../../src/fonts');
    assetsPromise = Promise.resolve({
      fonts: [
        {
          name: 'Aeonik',
          data: fs.readFileSync(path.join(fontsDir, 'Aeonik/Aeonik-Regular.woff')),
          weight: 400,
          style: 'normal',
        },
        {
          name: 'Poppins',
          data: fs.readFileSync(path.join(fontsDir, 'Poppins/Poppins-Regular.ttf')),
          weight: 400,
          style: 'normal',
        },
        {
          name: 'Poppins',
          data: fs.readFileSync(path.join(fontsDir, 'Poppins/Poppins-SemiBold.ttf')),
          weight: 600,
          style: 'normal',
        },
      ],
      logo: dataUri(path.resolve(__dirname, '../../static/img/assets/temporal-logo.svg')),
    });
  }
  return assetsPromise;
}

function buildTree({ title, description, section }, logo) {
  return {
    type: 'div',
    props: {
      style: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundImage: `linear-gradient(135deg, ${GRADIENT_FROM} 0%, ${GRADIENT_TO} 65%)`,
        padding: '64px',
        fontFamily: 'Poppins',
      },
      children: [
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              alignSelf: 'flex-start',
              backgroundColor: ACCENT_COLOR,
              color: '#ffffff',
              fontSize: 22,
              fontWeight: 600,
              letterSpacing: 1,
              padding: '10px 20px',
              borderRadius: 6,
              textTransform: 'uppercase',
            },
            children: section,
          },
        },
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
                    fontSize: 58,
                    fontWeight: 400,
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
                        fontSize: 26,
                        fontWeight: 400,
                        color: SUBTITLE_COLOR,
                        lineHeight: 1.4,
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
              { type: 'img', props: { src: logo, width: 170, height: 43 } },
              {
                type: 'div',
                props: {
                  style: { display: 'flex', fontSize: 22, color: FOOTER_COLOR },
                  children: 'docs.temporal.io',
                },
              },
            ],
          },
        },
      ],
    },
  };
}

async function renderCard({ title, description, section }) {
  const { fonts, logo } = await loadAssets();
  const svg = await satori(buildTree({ title, description, section }, logo), {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    fonts,
  });
  const resvg = new Resvg(svg, {
    fitTo: { mode: 'width', value: CARD_WIDTH },
  });
  const png = resvg.render().asPng();

  // resvg's PNG encoder has no compression/quality knobs, and the gradient
  // background compresses poorly as full-color lossless PNG (~230KB/card).
  // Re-encoding through a quantized (palette) PNG cuts that by ~85% with no
  // visible quality loss, since sharp dithers the limited palette.
  return sharp(png).png({ palette: true, compressionLevel: 9 }).toBuffer();
}

module.exports = { renderCard, TEMPLATE_VERSION, CARD_WIDTH, CARD_HEIGHT };
