import fs from "fs-extra";
import path from "path";
import graymatter from "gray-matter";

export async function genSourceObjects(config) {
  console.log("generating docs JSON objects...");
  const readPath = path.join(
    config.rootDir,
    config.tempWriteDir,
    config.sourcePathsFileName
  );
  const docsPaths = await fs.readJSON(readPath);
  const docsObjects = [];
  for (const docsPath of docsPaths) {
    const rawContent = await fs.readFile(`${docsPath.fullPath}`);
    const meta = graymatter(rawContent);
    docsObjects.push({readdirp: docsPath, graymatter: meta});
  }
  const writePath = path.join(
    config.rootDir,
    config.tempWriteDir,
    config.sourceObjectsFileName
  );
  await fs.writeJSON(writePath, docsObjects);
  return;
}
