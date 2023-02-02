import {exec} from 'child_process';

export async function genCLI(config) {

    console.log("generating CLI documentation...");

    // put release or link to branch in here
    // set destination for both the executable
    // and the documents we're generating

    //const response = await fetch(downloadUrl.href);
    const response = await fetch('https://github.com/temporalio/cli/tree/auto-generate-cli-docs');
    //const destination = config.rootdir;
    await finished(
        response.body.pipe(zlib.createGunzip()).pipe(tar.extract(destination)),
    );
    await chmod(destination, 0o755);
    
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

