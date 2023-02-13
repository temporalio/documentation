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
        config.content_write_dir,
        "cli"
    );

    // get executables
    const latestRelease = await fetch(
        'https://api.github.com/repos/temporalio/cli/releases/latest',
      ).then((response) => response.json());

    // find correct one
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

    const response = await fetch(downloadUrl.href);

    await finished(
      response.body.pipe(zlib.createGunzip()).pipe(tar.extract(FilePathCLI)),
    );

    // extract file
    mkdirp(FilePathCLI);
    chmod(FilePathCLI, 0o755);
    chdir(FilePathCLI);
    exec('./temporal-doc-gen', (err, stdout, stderr) => {
        if (err) {
            // node couldn't execute the command
            console.log("Error: could not execute binary.")
            return;
        }   
        RemoveFiles('rm -fv LICENSE README.md temporal-doc-gen')
    }); 

    
}

async function RemoveFiles(pathFunc) {
  exec(pathFunc, (err, stdout, stderr) => {
    if (err) {
      console.log("Couldn't delete a file.")
      return;
    }
  });
}

