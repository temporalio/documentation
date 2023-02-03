import {exec} from 'child_process';
import path from "path";
import { chmod } from 'fs/promises';
import { finished } from 'stream/promises';

import fetch from 'node-fetch';
import zlib from 'zlib';
import tar from 'tar-fs';

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

    // set destination for both the executable
    // and the documents we're generating

    await finished(
      response.body.pipe(zlib.createGunzip()).pipe(tar.extract(destination)),
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

