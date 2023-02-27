import {exec} from 'child_process';
import path from "path";
import { chmod } from 'fs/promises';
import { finished } from 'stream/promises';
import { mkdirp } from 'fs-extra';

import fetch from 'node-fetch';
import tar from 'tar-fs';
import zlib from 'zlib';
import { chdir } from 'process';

export async function genCLI(config) {

    console.log("generating CLI documentation...");

    const FilePathCLI = path.join(
        config.root_dir,
        config.content_source_dirs[0]
    );

    // get executables
    const latestRelease = await fetch(
        'https://api.github.com/repos/temporalio/cli/releases/latest',
      ).then((response) => response.json());

    // find correct one
    let downloadUrl;
    
    const isCorrectDownloadLink = (asset) => {
      if (!asset.name.includes("documentation")) return false;
      return true;
    };
    
    for (const asset of latestRelease.assets) {
      if (isCorrectDownloadLink(asset))
        downloadUrl = new URL(asset.browser_download_url);
    }
    
    if (!downloadUrl) {
      reportError(
        `A valid download link for CLI documentation could not be found.`,
      );
    }

    const response = await fetch(downloadUrl.href);

    await finished(
      response.body.pipe(zlib.createGunzip()).pipe(tar.extract(FilePathCLI)),
    );

    // extract file
    mkdirp(FilePathCLI);
    chdir(FilePathCLI);

    // remove executable, etc.
    cmdLineFiles('mv docs/* .')
    cmdLineFiles('rm -rf docgen LICENSE docs')
}

async function cmdLineFiles(pathFunc) {
  exec(pathFunc, (err, stdout, stderr) => {
    if (err) {
      console.log("Couldn't move or delete a file.")
      return;
    }
  });
}


