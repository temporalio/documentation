import fs from "fs-extra";
import path from "path";

export async function createTempDir(config) {
  console.log("creating temp directory...");
  const dirPath = path.join(config.root_dir, config.temp_write_dir);
  await fs.ensureDir(dirPath);
  return;
}
