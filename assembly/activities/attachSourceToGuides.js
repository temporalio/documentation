import readdirp from "readdirp";
import fs from "fs-extra";
import path from "path";

export async function attachSourceToGuides(config) {
    console.log("attaching source content to guide configuartions...");
    const sourceInfoNodes = await fs.readJSON(config.source_info_nodes_file_name);
    const guideConfigs = {cfgs: []};
    const readPath = path.join(config.root_dir, config.guide_configs_path);
    for await (const entry of readdirp(readPath)) {
        const raw_content = await fs.readJSON(entry.fullPath);
        guideConfigs.cfgs.push(raw_content);
    }
    guideConfigs = attachNodes(guideConfigs, sourceInfoNodes);
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
    for (let cfg of guideConfigs.cfgs) {
      cfg = await findMatches(cfg, infoNodes);
      updatedCfgs.push(cfg);
    }
    guideConfigs.cfgs = updatedCfgs;
    return guideConfigs;
}
  
async function findMatches(guideConfig, infoNodes) {
    console.log(`finding matches for ${guide_config.id}...`);
    for (section of guideConfig.sections) {
      if (section.type != "langtabs") {
        section.node = await matchNode(section.id, infoNodes)
      } else {
        
      }
    }
    let updated_h2_sections = [];
    for (let h2_section of guide_config.h2_sections) {
      h2_section = await matchinfoNodesToSection(h2_section, infoNodes);
      updated_h2_sections.push(h2_section);
    }
    guide_config.h2_sections = updated_h2_sections;
    return guide_config;
}
  
async function matchinfoNodesToSection(h2_section, infoNodes) {
    console.log("matching infoNodes to sections...");
    let updated_h3_sections = [];
    for (const h3_section of h2_section.h3_sections) {
      if (h3_section.type == "lang-tabs") {
        h3_section.langs = await matchLangTabs(h3_section.langs, infoNodes);
      } else {
        h3_section.file = await matchNode(h3_section.path, infoNodes);
      }
      if (h3_section.h4_sections != undefined) {
        updated_h4_sections = [];
        for (h4_section of h3_section.h4_sections) {
          if (h4_section.type == "lang-tabs") {
            h4_section.langs = await matchLangTabs(h4_section.langs, infoNodes);
          } else {
            h4_section.file = await matchNode(h4_section.path, infoNodes);
          }
          updated_h4_sections.push(h4_section);
        }
        h3_section.h4_sections = updated_h4_sections;
      }
      updated_h3_sections.push(h3_section);
    }
    h2_section.h3_sections = updated_h3_sections;
    return h2_section;
}
  
async function matchLangTabs(langs, infoNodes) {
    let updated_langs = [];
    for (lang of langs) {
      if (lang.path != "none") {
        lang.file = await matchNode(lang.path, infoNodes);
      }
      updated_langs.push(lang);
    }
    return updated_langs;
}
  
async function matchNode(id, infoNodes) {
    const file = infoNodes.find((obj) => {
      return obj.path === `${path}${FILE_EXTENSION}`;
    });
    if (file == undefined) {
      console.log(`Can't find a file for ${path}`);
    }
    return file;
}