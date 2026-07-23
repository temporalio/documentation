const fs = require('fs');
const path = require('path');

module.exports = function cloudRegionCountsPlugin(context, options = {}) {
  const regionFiles = options.regionFiles || {};

  const resolveRegionFile = (filePath) =>
    path.isAbsolute(filePath) ? filePath : path.join(context.siteDir, filePath);

  const countRegions = (filePath) => {
    const source = fs.readFileSync(filePath, 'utf8');
    return (source.match(/^###\s+/gm) || []).length;
  };

  const resolvedRegionFiles = Object.fromEntries(
    Object.entries(regionFiles).map(([provider, filePath]) => [
      provider,
      resolveRegionFile(filePath),
    ])
  );

  return {
    name: 'cloud-region-counts',
    getPathsToWatch() {
      return Object.values(resolvedRegionFiles);
    },
    async loadContent() {
      const counts = Object.fromEntries(
        Object.entries(resolvedRegionFiles).map(([provider, filePath]) => [
          provider,
          countRegions(filePath),
        ])
      );

      return { counts };
    },
    async contentLoaded({ content, actions }) {
      actions.setGlobalData(content);
    },
  };
};
