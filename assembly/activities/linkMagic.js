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
  console.log("writing matcheded guides again...");
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
        if (langtab.id != "none" && langtab.id != "na") {
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
  console.log("link magic on references...");
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
          console.log(node.id);
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
      console.log(refWritePath);
      await fs.writeFile(refWritePath, refString);
    }
    isReference = false;
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
  const docsLinkRegex = /\/[a-zA-Z0-9-_]+[a-zA-Z0-9-_#/]*/gm;
  const docsImageRegex =
    "!\\[([a-zA-Z0-9-_#.&\\s]+)\\]\\(([a-zA-Z0-9-_/.]+)\\)";
  const lines = raw_content.toString().split("\n");
  let new_lines = [];
  let line_count = 0;
  for (let line of lines) {
    const imageRegex = RegExp(docsImageRegex, "gm");
    const image = imageRegex.exec(line);
    let matchLinks = true;
    if (image !== null) {
      line = centeredImage(image);
      matchLinks = false;
    }
    if (matchLinks) {
      const lineLinks = line.match(docsLinkRegex);
      if (lineLinks !== null) {
        for (const match of lineLinks) {
          const link = link_index.find((item) => {
            return `/${item.node_id}` === match;
          });
          if (link !== undefined) {
            line = await replaceLinks(line, match, link, current_guide_id);
          }
        }
      }
    }
    if (line == "" && (line_count == 0 || line_count == lines.length - 1)) {
      // silently drop it on purpose
    } else {
      new_lines.push(line);
    }
    line_count++;
    matchLinks = true;
  }
  raw_content = new_lines.join("\n");
  return raw_content;
}

function centeredImage(image) {
  return `<div class="tdiw"><div class="tditw"><p class="tdit">${image[1]}</p></div><div class="tdiiw"><img class="tdi" src="${image[2]}" alt="${image[1]}" /></div></div>`;
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
