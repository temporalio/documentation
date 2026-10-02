const { extname } = require('node:path');
const { Sync } = require('snipsync/src/Sync');
const { readConfig } = require('snipsync/src/config');
const logger = require('js-logger');

// Snipsync 1.13 supports target extension filters but scans every source file.
// Apply the optional per-origin filter before its snippet parser sees prose.
class SourceFilteredSync extends Sync {
  async getRepos() {
    const repositories = await super.getRepos();
    for (const repository of repositories) {
      const origin = this.origins.find(({ owner, repo, ref }) =>
        owner === repository.owner && repo === repository.repo && ref === repository.ref);
      const extensions = origin?.allowed_source_extensions;
      if (extensions) {
        repository.filePaths = repository.filePaths.filter(({ name }) =>
          extensions.includes(extname(name)));
      }
    }
    return repositories;
  }
}

if (require.main === module) {
  logger.useDefaults();
  const args = process.argv.slice(2);
  const targetIdx = args.indexOf('--target');
  const sync = new SourceFilteredSync(readConfig(logger), logger, {
    targetFilter: targetIdx === -1 ? null : args[targetIdx + 1],
  });
  const operation = args.includes('--clear') ? sync.clear() : sync.run();
  operation.catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}

module.exports = { SourceFilteredSync };
