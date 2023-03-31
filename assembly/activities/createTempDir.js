import fs from "fs-extra";
import path from "path";

export async function createTempDir(config) {
  console.log("creating temp directory...");
  let dirPath = path.join(config.root_dir, config.temp_write_dir);
  await fs.ensureDir(dirPath);
  dirPath = path.join(config.root_dir, config.temp_write_dir, config.temp_archive_dir);
  await fs.ensureDir(dirPath);
  return;
}
