import fs from "fs-extra";
import path from "path";

export async function linkMagic(config) {
  console.log("replacing links in guide content...");
  const matchedGuidesPath = path.join(
    config.root_dir,
    config.temp_write_dir,
    config.guide_configs_with_attached_nodes_file_name
  );
  let matchedGuides = await fs.readJSON(matchedGuidesPath);
  const updatedGuides = [];
  for (let guideCfg of matchedGuides.cfgs) {
    guideCfg = await replaceWithLocalRefs(guideCfg, matchedGuides.full_index);
    updatedGuides.push(guideCfg);
  }
  matchedGuides.cfgs = updatedGuides;
  await fs.writeJSON(matchedGuidesPath, matchedGuides);
  return;
}

async function replaceWithLocalRefs(guideConfig, fullIndex) {
  const updatedSections = [];
  for (let section of guideConfig.sections) {
    if (section.type == "langtabs") {
      const updatedLangTabs = [];
      for (let langtab of section.langtabs) {
        if (langtab.id != "none") {
          langtab.node.markdown_content = await parseAndReplace(
            langtab.node.markdown_content,
            fullIndex,
            guideConfig.id
          );
        }
        updatedLangTabs.push(langtab);
      }
      section.langtabs = updatedLangTabs;
    } else {
      section.node.markdown_content = await parseAndReplace(
        section.node.markdown_content,
        fullIndex,
        guideConfig.id
      );
    }
    updatedSections.push(section);
    guideConfig.sections = updatedSections;
  }
  return guideConfig;
}

async function parseAndReplace(raw_content, link_index, current_guide_id) {
  // const docsLinkRegex = /\/docs\/[a-zA-Z0-9-_]*\/[a-zA-Z0-9-_]*/gm;
  const docsLinkRegex = /\/[a-zA-Z0-9-_]+[a-zA-Z0-9-_#/]*/gm;
  const lines = raw_content.toString().split("\n");
  let new_lines = [];
  let line_count = 0;
  for (let line of lines) {
    const line_links = line.match(docsLinkRegex);
    if (line_links !== null) {
      for (const match of line_links) {
        // const replaceable = match.substring(6);
        const link = link_index.find((obj) => {
          //console.log(`Index path: ${obj.path} Match: ${match}`);
          return `/${obj.id}` === match;
        });
        if (link != undefined) {
          line = await replaceLinks(line, match, link, current_guide_id);
        }
      }
    }
    if (line == "" && (line_count == 0 || line_count == lines.length - 1)) {
      // silently drop it on purpose
    } else {
      new_lines.push(line);
    }
    line_count++;
  }
  raw_content = new_lines.join("\n");
  return raw_content;

  async function replaceLinks(line, replaceable, link, current_guide_id) {
    let new_path = "";
    if (link.guide != current_guide_id) {
      if (link.guide_dir != "/") {
        new_path = `/${link.guide_dir}/${link.guide_id}#${link.local_ref}`;
      } else {
        new_path = `/${link.guide_id}#${link.local_ref}`;
      }
    } else {
      new_path = `#${link.local_ref}`;
    }
    line = line.replaceAll(replaceable, new_path);
    return line;
  }
}
