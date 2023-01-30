import { join } from 'path';
import { chmod } from 'fs/promises';
import { finished } from 'stream/promises';

import fetch from 'node-fetch';
import zlib from 'zlib';
import tar from 'tar-fs';
import mkdirp from 'mkdirp';
import rimraf from 'rimraf';
import kleur from 'kleur';

if (process.env.VERCEL) process.exit(0);

const reportError = (error, exitCode = 1, callback) => {
  console.error(kleur.bgRed('Error:'), kleur.red(error));
  if (callback && typeof callback === 'function') {
    callback();
  }
  process.exit(exitCode);
};

const destinationDirectory = './bin';
const destination = join(destinationDirectory, 'cli');

const latestRelease = await fetch(
  'https://api.github.com/repos/temporalio/cli/releases/latest',
).then((response) => response.json());

let platform = process.platform;
let arch = process.arch;

if (arch === 'x64') arch = 'amd64';

let downloadUrl;

const isCorrectDownloadLink = (asset) => {
  if (!asset.name.includes(platform)) return false;
  if (!asset.name.includes(arch)) return false;
  return true;
};

for (const asset of latestRelease.assets) {
  if (isCorrectDownloadLink(asset))
    downloadUrl = new URL(asset.browser_download_url);
}

if (!downloadUrl) {
  reportError(
    `A valid download link for your platform (${platform}) and architecture (${arch}) could not be found.`,
  );
}

rimraf(destination, (error) => {
  if (error) {
    console.error(error);
    process.exit(2);
  }
});
await mkdirp(destinationDirectory);

console.log(
  kleur.bgYellow('Downloading:'),
  kleur.yellow().underline(downloadUrl.href),
);

try {
  const response = await fetch(downloadUrl.href);

  await finished(
    response.body.pipe(zlib.createGunzip()).pipe(tar.extract(destination)),
  );

  await chmod(destination, 0o755);

  console.log(
    kleur.bgGreen('Download complete:'),
    kleur.green().underline(join(destination, 'temporal')),
  );
} catch (error) {
  reportError(error, 2, () =>
    rimraf(destination, (error) => reportError(error)),
  );
}

