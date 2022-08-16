import graymatter from "gray-matter";
import readdirp from "readdirp";
import fs from "fs-extra";
import path from "path";

export async function genSourceObjects(config) {
  console.log("getting documentation page paths...");
  const filePaths = [];
  for (const dirName of config.contentSourceDirs) {
    const readDir = path.join(config.rootDir, dirName);
    for await (const entry of readdirp(readDir)) {
      // can add more ignores here
      // example:
      // if (!entry.fullPath.includes("learning-paths"))
      filePaths.push(entry);
    }
  }
  console.log("generating docs JSON objects...");
  const docsObjects = [];
  for (const filePath of filePaths) {
    const rawContent = await fs.readFile(`${filePath.fullPath}`);
    const meta = graymatter(rawContent);
    docsObjects.push({readdirp: filePath, graymatter: meta});
  }
  const writePath = path.join(
    config.rootDir,
    config.tempWriteDir,
    config.sourceObjectsFileName
  );
  await fs.writeJSON(writePath, docsObjects);
  return;
}
