import {exec} from 'child_process';
import path from "path";
import { chmod } from 'fs/promises';
import { finished } from 'stream/promises';

import fetch from 'node-fetch';
import zlib from 'zlib';
import tar from 'tar-fs';
import { mkdirp } from 'fs-extra';

export async function genCLI(config) {

    console.log("generating CLI documentation...");

    const FilePathCLI = path.join(
        config.root_dir,
        "CLI"

    );
    // put release or link to branch in here
    const latestRelease = await fetch(
        'https://github.com/temporalio/cli/tree/auto-generate-cli-docs',
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
        console.log(`A valid download link for your platform (${platform}) and architecture (${arch}) could not be found.`)
    }

    await mkdirp(FilePathCLI);

    await finished(
      response.body.pipe(zlib.createGunzip()).pipe(tar.extract(FilePathCLI)),
    );
  
    await chmod(FilePathCLI, 0o755);
    
    exec('go run ./cmd/doc', (err, stdout, stderr) => {
        if (err) {
            // node couldn't execute the command
            console.log("Node couldn't execute the binary.")
            return;
        }   
    });
    console.log("Executed binary.")

    // put documents in their place
}

