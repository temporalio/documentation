import fs from "fs-extra";
import path from "path";

export async function genGitAttributes(config) {
  console.log(`generating the gitignore file...`);
  const matchedGuidesFilePath = path.join(config.root_dir, config.temp_write_dir, config.attached_nodes_file_name);
  let matchedGuides = await fs.readJSON(matchedGuidesFilePath);

  let str = "";
  for (const g of matchedGuides.cfgs) {
    str = `${str}${path.join(config.content_write_dir, g.file_dir, g.file_name)} linguist-generated=true\n`;
  }

  const gitAttributesWritePath = path.join(config.root_dir, ".gitattributes");
  await fs.writeFile(gitAttributesWritePath, str);
  return;
}
