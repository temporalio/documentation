import fs from "fs-extra";
import path from "path";

const docsLinkRegex =
  "\\[([a-zA-Z0-9-_#.&`\\s]+)\\]\\(([a-zA-Z0-9-_/.]+)(#[a-zA-Z0-9-_.]+)?\\)";
const linkRegex = RegExp(docsLinkRegex, "gm");
const docsImageRegex = "!\\[([a-zA-Z0-9-_#.&\\s]+)\\]\\(([a-zA-Z0-9-_/.]+)\\)";
const imageRegex = RegExp(docsImageRegex, "gm");

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
  const lines = raw_content.toString().split("\n");
  let new_lines = [];
  let line_count = 0;
  for (let line of lines) {
    const image = imageRegex.exec(line);
    let matchLinks = true;
    if (image !== null) {
      line = centeredImage(image);
      matchLinks = false;
    }
    if (matchLinks) {
      const linkMatches = [];
      let lineLinks;
      while ((lineLinks = linkRegex.exec(line)) !== null) {
        linkMatches.push(lineLinks);
      }
      if (linkMatches.length > 0) {
        for (const match of linkMatches) {
          const link = link_index.find((item) => {
            return `/${item.node_id}` === match[2];
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

function linkPreview(newPath, linkText, nodeTitle, description) {
  return `<a class="tdlp" href="${newPath}">${linkText}<span class="tdlpiw"><img src="/img/link-preview-icon.svg" alt="Link preview icon" /></span><div class="tdlpc"><p class="tdlppt">${nodeTitle}</p><p class="tdlppd">${description}</p><p class="tdlplm"><a href="${newPath}">Learn more</a></p></div></a>`;
}

async function replaceLinks(line, match, link, current_guide_id) {
  let newPath;
  let localRef;
  let replaceable = match[0];
  // define what needs to be replaced
  if (match[3] === undefined) {
    localRef = `#${link.local_ref}`;
  } else {
    localRef = match[3];
  }
  // define the new path
  if (link.guide_id != current_guide_id) {
    if (link.file_dir != "/") {
      newPath = `/${link.file_dir}/${link.guide_id}${localRef}`;
    } else {
      newPath = `/${link.guide_id}${localRef}`;
    }
  } else {
    newPath = `${localRef}`;
  }
  // convert to link preview
  const html = linkPreview(
    newPath,
    match[1],
    link.node_title,
    link.node_description
  );
  line = line.replaceAll(replaceable, html);
  return line;
}
