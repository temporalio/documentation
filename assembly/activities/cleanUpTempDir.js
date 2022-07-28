import fs from "fs-extra";
import path from "path";

export async function cleanUpTempDir(config) {
  console.log("cleaning up temporary storage files...");
  const tempPath = path.join(config.rootDir, config.tempWriteDir);
  await fs.remove(tempPath);
  return;
}
