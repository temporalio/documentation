import graymatter from "gray-matter";
import readdirp from "readdirp";
import fs from "fs-extra";
import path from "path";

export async function attachSourceToGuides(config) {
    console.log("attaching source content to guide configuartions...");
    const sourceInfoNodes = await fs.readJSON(config.sourceInfoNodesFileName);

    const guide_configs = {
        cfgs: [],
    };
    const readPath = path.join(config.rootDir, config.guideConfigsPath);
    for await (const entry of readdirp(readPath)) {
        console.log(entry);
        const raw_content = await fs.readJSON(entry.fullPath);
        guide_configs.cfgs.push(raw_content);
    }



  console.log("generating docs JSON objects...");
  const docsObjects = [];
  for (const filePath of filePaths) {
    const rawContent = await fs.readFile(`${filePath.fullPath}`);
    const meta = graymatter(rawContent);
    docsObjects.push({readdirp: filePath, graymatter: meta});
  }
  const writePath = path.join(
    config.rootDir,
    config.tempWriteDir,
    config.sourceInfoNodesFileName
  );
  await fs.writeJSON(writePath, docsObjects);
  return;
}



async function attachFiles(guide_configs, files) {
    let updated_cfgs = [];
    for (let cfg of guide_configs.cfgs) {
      cfg = await findMatches(cfg, files);
      updated_cfgs.push(cfg);
    }
    guide_configs.cfgs = updated_cfgs;
    return guide_configs;
  }
  
  async function findMatches(guide_config, files) {
    console.log(`finding matches for ${guide_config.id}...`);
    let updated_h2_sections = [];
    for (let h2_section of guide_config.h2_sections) {
      h2_section = await matchFilesToSection(h2_section, files);
      updated_h2_sections.push(h2_section);
    }
    guide_config.h2_sections = updated_h2_sections;
    return guide_config;
  }
  
  async function matchFilesToSection(h2_section, files) {
    console.log("matching files to sections...");
    let updated_h3_sections = [];
    for (const h3_section of h2_section.h3_sections) {
      if (h3_section.type == "lang-tabs") {
        h3_section.langs = await matchLangTabs(h3_section.langs, files);
      } else {
        h3_section.file = await matchPath(h3_section.path, files);
      }
      if (h3_section.h4_sections != undefined) {
        updated_h4_sections = [];
        for (h4_section of h3_section.h4_sections) {
          if (h4_section.type == "lang-tabs") {
            h4_section.langs = await matchLangTabs(h4_section.langs, files);
          } else {
            h4_section.file = await matchPath(h4_section.path, files);
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
  
  async function matchLangTabs(langs, files) {
    let updated_langs = [];
    for (lang of langs) {
      if (lang.path != "none") {
        lang.file = await matchPath(lang.path, files);
      }
      updated_langs.push(lang);
    }
    return updated_langs;
  }
  
  async function matchPath(path, files) {
    const file = files.find((obj) => {
      return obj.path === `${path}${FILE_EXTENSION}`;
    });
    if (file == undefined) {
      console.log(`Can't find a file for ${path}`);
    }
    return file;
  }