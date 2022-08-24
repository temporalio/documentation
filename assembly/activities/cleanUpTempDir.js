import fs from "fs-extra";
import path from "path";

export async function cleanUpTempDir(config) {
  console.log("cleaning up temporary storage files...");
  const tempPath = path.join(config.root_dir, config.temp_write_dir);
  await fs.remove(tempPath);
  return;
}
