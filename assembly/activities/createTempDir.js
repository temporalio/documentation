import fs from 'fs-extra';
import path from 'path';

export async function createTempDir(config) {
    console.log("creating temp directory...");
    const dirPath = path.join(config.rootDir, config.tempWriteDir);
    await fs.ensureDir(dirPath);
    return;
}