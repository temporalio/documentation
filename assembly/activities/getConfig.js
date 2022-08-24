import fs from "fs-extra";
import path from "path";

export async function getConfig(params) {
  console.log("getting configuration...");
  const spot = path.join(params.rootDir, params.assemblyDir, "config.json");
  const config = await fs.readJSON(spot);
  config.root_dir = params.rootDir;
  config.assemblyDir = params.assemblyDir;
  return config;
}
