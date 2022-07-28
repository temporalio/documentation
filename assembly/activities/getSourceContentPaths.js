import readdirp from "readdirp";
import fs from "fs-extra";
import path from "path";

export async function getSourceContentPaths(config) {
  console.log("getting documentation page paths...");
  const filePaths = [];
  const readDir = path.join(config.rootDir, config.contentSourceDir);
  for await (const entry of readdirp(readDir)) {
    // can add more ignores here
    if (!entry.fullPath.includes("learning-paths")) {
      const s = JSON.stringify(entry);
      filePaths.push(entry);
    }
  }
  const writePath = path.join(
    config.rootDir,
    config.tempWriteDir,
    config.sourcePathsFileName
  );
  await fs.writeJSON(writePath, filePaths);
  return;
}
