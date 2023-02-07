import {exec} from 'child_process';
import path from "path";
import { chmod } from 'fs/promises';
import { finished } from 'stream/promises';
import { mkdirp } from 'fs-extra';

import fetch from 'node-fetch';
import tar from 'tar-fs';
import zlib from 'zlib';

export async function genCLI(config) {

    console.log("generating CLI documentation...");

    const FilePathCLI = path.join(
        config.root_dir,
        config.content_write_dir,
        "cli"

    );

    // TODO: have an alternative link in place until new release comes out

    // get executables

    /*const latestRelease = await fetch(
        'https://api.github.com/repos/temporalio/cli/releases/latest',
      ).then((response) => response.json());*/
   
    const mainBranch = exec(
        'git clone https://github.com/temporalio/cli.git',
      );
    console.log ("git repo cloned.");

    // find correct one
    let platform = process.platform;
    let arch = process.arch;
    
    if (arch === 'x64') arch = 'amd64';
    
    let downloadUrl;
    
   // const isCorrectDownloadLink = (asset) => {
   //   if (!asset.name.includes(platform)) return false;
   //   if (!asset.name.includes(arch)) return false;
   //   return true;
   // };
    
   // for (const asset of mainBranch.assets) {
    //  if (isCorrectDownloadLink(asset))
   //     downloadUrl = new URL(asset.browser_download_url);
   // }
    
    //if (!downloadUrl) {
     // reportError(
    //    `A valid download link for your platform (${platform}) and architecture (${arch}) could not be found.`,
    //  );
   // }

   // const response = await fetch(downloadUrl.href);

   // await finished(
    //  response.body.pipe(zlib.createGunzip()).pipe(tar.extract(FilePathCLI)),
   // );

    // extract file
    await mkdirp(FilePathCLI);


    // TODO: change to reflect docs (temporal to doc)
     exec('go run ./cmd/doc', (err, stdout, stderr) => {
        if (err) {
            // node couldn't execute the command
            console.log("Error: could not execute binary.")
            return;
        }   
    }); 
    console.log("Executed.")

    await chmod(FilePathCLI, 0o755);

    // delete everything except documentation
}

