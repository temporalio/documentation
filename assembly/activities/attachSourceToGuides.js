import readdirp from "readdirp";
import fs from "fs-extra";
import path from "path";

export async function attachSourceToGuides(config) {
  console.log("attaching source content to guide configurations...");
  const infoNodeReadPath = path.join(
    config.root_dir,
    config.temp_write_dir,
    config.source_info_nodes_file_name
  );
  const sourceInfoNodes = await fs.readJSON(infoNodeReadPath);
  const guideConfigs = {cfgs: []};
  const guidesReadPath = path.join(config.root_dir, config.guide_configs_path);
  for await (const entry of readdirp(guidesReadPath)) {
    const raw_content = await fs.readJSON(entry.fullPath);
    guideConfigs.cfgs.push(raw_content);
  }
  guideConfigs.cfgs = await attachNodes(guideConfigs.cfgs, sourceInfoNodes);
  const writePath = path.join(
    config.root_dir,
    config.temp_write_dir,
    config.guide_configs_with_attached_nodes_file_name
  );
  await fs.writeJSON(writePath, guideConfigs);
  return;
}

async function attachNodes(guideConfigs, infoNodes) {
  let updatedCfgs = [];
  for (let cfg of guideConfigs) {
    cfg = await findMatches(cfg, infoNodes);
    updatedCfgs.push(cfg);
  }
  return updatedCfgs;
}

async function findMatches(guideConfig, infoNodes) {
  console.log(`finding matches for ${guideConfig.id}...`);
  const newSections = [];
  for (const section of guideConfig.sections) {
    if (section.type == "langtabs") {
      section.langtabs = await matchLangTabs(section.langtabs, infoNodes);
      newSections.push(section);
    } else {
      section.node = await matchNode(section.id, infoNodes);
      newSections.push(section);
    }
  }
  guideConfig.sections = newSections;
  return guideConfig;
}

async function matchLangTabs(langtabs, infoNodes) {
  let updatedTabs = [];
  for (const langtab of langtabs) {
    if (langtab.id != "none" && langtab.id != "na") {
      langtab.node = await matchNode(langtab.id, infoNodes);
    }
    updatedTabs.push(langtab);
  }
  return updatedTabs;
}

async function matchNode(id, infoNodes) {
  const match = infoNodes.find((node) => {
    return node.id === id;
  });
  if (match == undefined) {
    throw `Can't find a matching node for ${id}`;
  }
  return match;
}
