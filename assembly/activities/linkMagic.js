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
  await linkMagicReferences(config, matchedGuides.full_index);
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

async function linkMagicReferences(config, link_index) {
  const sourceNodesPath = path.join(
    config.root_dir,
    config.temp_write_dir,
    config.source_info_nodes_file_name
  );
  let sourceNodes = await fs.readJSON(sourceNodesPath);
  let isReference = false;
  for (const node of sourceNodes) {
    if (node.tags !== undefined) {
      tagloop: for (const tag of node.tags) {
        if (tag == "reference") {
          node.markdown_content = await parseAndReplace(
            node.markdown_content,
            link_index,
            ""
          );
          isReference = true;
          break tagloop;
        }
      }
    }
    if (isReference) {
      const refString = await genRefString(node);
      const refWritePath = path.join(
        config.root_dir,
        config.content_write_dir,
        `${node.id}.md`
      );
      await fs.writeFile(refWritePath, refString);
    }
  }
  return;
}

async function genRefString(node) {
  const parts = node.id.split("/");
  const id = parts[1];
  let refString = `---
id: ${id}
title: ${node.title}
description: ${node.description}
sidebar_label: ${node.label}\n`;

  if (node.tags != undefined) {
    refString = `${refString}tags:\n`;
    for (const tag of node.tags) {
      refString = `${refString} - ${tag}\n`;
    }
  }
  refString = `${refString}---\n\n`;
  refString = `${refString}<!-- This file is generated. Do not edit it directly. -->\n\n`;
  refString = `${refString}${node.markdown_content}`;
  return refString;
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
        const link = link_index.find((item) => {
          return `/${item.node_id}` === match;
        });
        if (link !== undefined) {
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
}

async function replaceLinks(line, replaceable, link, current_guide_id) {
  let new_path = "";
  if (link.guide_id != current_guide_id) {
    if (link.file_dir != "/") {
      new_path = `/${link.file_dir}/${link.guide_id}#${link.local_ref}`;
    } else {
      new_path = `/${link.guide_id}#${link.local_ref}`;
    }
  } else {
    new_path = `#${link.local_ref}`;
  }
  line = line.replaceAll(replaceable, new_path);
  return line;
}
