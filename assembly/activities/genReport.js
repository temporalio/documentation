import fs from "fs-extra";
import path from "path";
import { format } from "date-format-parse";

export async function genReport(config) {
  console.log(`generating docs assembly report...`);
  let str = "";
  str = `${str}# Docs Assembly Workflow report\n\n`;
  str = `${str}Last assembled: ${format(new Date(), "dddd MMMM DD YYYY HH:mm:ss A ZZ")}\n\n`;
  const sourceNodesPath = path.join(config.root_dir, config.temp_write_dir, config.source_info_nodes_file_name);
  const sourceObjects = await fs.readJSON(sourceNodesPath);
  const matchedGuidesPath = path.join(config.root_dir, config.temp_write_dir, config.attached_nodes_file_name);
  const matchedGuides = await fs.readJSON(matchedGuidesPath);
  let totalNodes = 0;
  let totalGuides = 0;
  for (const cfg of matchedGuides.cfgs) {
    totalGuides++;
    for (const section of cfg.sections) {
      if (section.type == "langtabs") {
        totalNodes = totalNodes + 4;
      } else {
        totalNodes++;
      }
    }
  }
  str = `${str}${totalGuides} guide configurations found.\n\n`;
  str = `${str}${sourceObjects.length} information nodes found.\n\n`;
  str = `${str}${totalNodes} information nodes are attached to guides.\n\n`;
  str = `${str}The "Link Magic" Activity has transformed the following "information node" identifiers into site paths:\n\n`;
  const linkMappingPath = path.join(config.root_dir, config.temp_write_dir, config.link_mapping_file_name);
  const linkMappings = await fs.readJSON(linkMappingPath);
  for (const mapping of linkMappings) {
    str = `${str}${mapping.node_id} -> ${mapping.maps_to}\n\n`;
  }
  str = `${str}\n`;
  const reportFilePath = path.join(config.root_dir, config.assembly_report_file_name);
  await fs.writeFile(reportFilePath, str);
  return;
}
