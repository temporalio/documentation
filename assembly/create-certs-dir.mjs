import * as fs from "node:fs/promises";

const targetDir = "/assembly/secure";

await fs.mkdir(targetDir);
await fs.writeFile(`${targetDir}/docs-assembly.pem`, process.env.TEMPORAL_CLIENT_CERT);
await fs.writeFile(`${targetDir}/client.key`, process.env.TEMPORAL_CLIENT_KEY);
