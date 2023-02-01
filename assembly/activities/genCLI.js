import {exec} from 'child_process';

export async function genCLI(config) {

    const response = await fetch(downloadUrl.href);
    await finished(
        response.body.pipe(zlib.createGunzip()).pipe(tar.extract(destination)),
    );
    await chmod(destination, 0o755);
    
    exec('go run ./cmd/doc', (err, stdout, stderr) => {
        if (err) {
            // node couldn't execute the command
            return;
        }   
    });
}

