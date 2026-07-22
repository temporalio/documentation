// Aeonik Light/Regular are used above the fold on every page (headings,
// sidebar nav), so we preload them via docusaurus.config.js's headTags and
// vercel.json's Link header — letting the browser fetch them before it even
// has HTML to parse a <link> tag from. Both need the literal webpack output
// filename, which is content-hashed and only changes if these specific font
// files' bytes change (verified: unrelated site/CSS changes and repeat
// builds do not affect the hash).
//
// bin/check-font-preload-hash.js fails `yarn build` if these drift from the
// real build output, and prints the values to paste in here.
module.exports = {
  AEONIK_LIGHT_FILENAME: 'Aeonik-Light-c944de5d59061b5eca77f8b08852df3b.woff2',
  AEONIK_REGULAR_FILENAME: 'Aeonik-Regular-5daa2b042642b01633b5ba8273b0d396.woff2',
};
