import svgParser from "svg-parser";
import sizeOf from "image-size";
import fs from "fs-extra";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { localRef } from "../common/index.js";

const docsLinkRegex = "\\[([a-zA-Z0-9-_#.&`',?\\s]+)\\]\\(([a-zA-Z0-9-_/.]+)(#[a-zA-Z0-9-_.]+)?\\)";
const linkRegex = RegExp(docsLinkRegex, "gm");
const docsImageRegex = "!\\[([a-zA-Z0-9-_#.&\\s]+)\\]\\(([a-zA-Z0-9-_/.]+)\\)";
const imageRegex = RegExp(docsImageRegex, "gm");
let rootDir = "";
const linkMapping = [];

export async function linkMagic(config) {
  rootDir = config.root_dir;
  console.log("replacing links in guide content...");
  const matchedGuidesPath = path.join(config.root_dir, config.temp_write_dir, config.attached_nodes_file_name);
  let matchedGuides = await fs.readJSON(matchedGuidesPath);
  const updatedGuides = [];
  for (let guideCfg of matchedGuides.cfgs) {
    guideCfg = await replaceWithLocalRefs(guideCfg, matchedGuides.full_index);
    updatedGuides.push(guideCfg);
  }
  matchedGuides.cfgs = updatedGuides;
  console.log("writing matcheded guides again...");
  await fs.writeJSON(matchedGuidesPath, matchedGuides);
  const linkMappingPath = path.join(config.root_dir, config.temp_write_dir, config.link_mapping_file_name);
  await fs.writeJSON(linkMappingPath, linkMapping);
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
      section.node.markdown_content = await parseAndReplace(section.node.markdown_content, fullIndex, guideConfig.id);
    }
    updatedSections.push(section);
    guideConfig.sections = updatedSections;
  }
  return guideConfig;
}

// async function genRefString(node) {
//   const parts = node.id.split("/");
//   const id = parts[1];
//   let refString = `---
// id: ${id}
// title: ${node.title}
// description: ${node.description}
// sidebar_label: ${node.label}\n`;

//   if (node.tags != undefined) {
//     refString = `${refString}tags:\n`;
//     for (const tag of node.tags) {
//       refString = `${refString} - ${tag}\n`;
//     }
//   }
//   refString = `${refString}---\n\n`;
//   refString = `${refString}<!-- This file is generated. Do not edit it directly. -->\n\n`;
//   refString = `${refString}${node.markdown_content}`;
//   return refString;
// }

async function parseAndReplace(raw_content, link_index, current_guide_id) {
  const lines = raw_content.toString().split("\n");
  let new_lines = [];
  let line_count = 0;
  for (let line of lines) {
    const image = imageRegex.exec(line);
    let matchLinks = true;
    if (image !== null) {
      const dimensions = getImageDimensions(image[2]);
      line = centeredImage(image, dimensions);
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

function centeredImage(image, dimensions) {
  return `<div class="tdiw"><div class="tditw"><p class="tdit">${image[1]}</p></div><div class="tdiiw"><img class="img_ev3q" src="${image[2]}" alt="${image[1]}" height="${dimensions.height}" width="${dimensions.width}" /></div></div>`;
}

function linkPreview(newPath, linkText, link) {
  const id = uuidv4();
  let tags = "";
  if (link.node_tags.length > 0) {
    tags = `<div class="preview-modal-tags">`;
    for (let t of link.node_tags) {
      t = localRef(link.node_id, t);
      tags = `${tags}<a class="preview-modal-tag" href="/tags/${t}">${t}</a> `;
    }
    tags = tags.slice(0, -1);
    tags = `${tags}</div>`;
  }
  return `[${linkText}](${newPath}) <span id="i-${id}" class="clickable-i clickable-link-preview">i</span><div id="preview-modal-${id}" class="preview-modal"><div class="modal-header"><div id="x-${id}" class="clickable-x clickable-link-preview">x</div><b>Link preview:</b>&nbsp;&nbsp<a href="${newPath}">${newPath}</a></div><div class="preview-modal-title">${link.node_title}</div><div class="preview-modal-description">${link.node_description}</div>${tags}</div>`;
}

function getImageDimensions(imgPath) {
  const ext = path.extname(imgPath);
  const filePath = path.join(rootDir, "static", imgPath);
  if (ext == "svg") {
    const svgFile = fs.readFileSync(`${filePath}`, "utf8");
    const svg = svgParser.parse(svgFile);
    return { width: svg.children[0].properties.width, height: svg.children[0].properties.height };
  } else {
    const dimensions = sizeOf(filePath);
    return { width: dimensions.width, height: dimensions.height };
  }
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
    if (link.slug == "none") {
      if (link.file_dir != "/") {
        newPath = `/${link.file_dir}/${link.guide_id}${localRef}`;
      } else {
        newPath = `/${link.guide_id}${localRef}`;
      }
    } else {
      newPath = `${link.slug}${localRef}`;
    }
  } else {
    newPath = `${localRef}`;
  }
  // convert to link preview
  const html = linkPreview(newPath, match[1], link);
  line = line.replaceAll(replaceable, html);
  pushToLinkMapping(link.node_id, newPath);
  return line;
}

function pushToLinkMapping(nodeId, newPath) {
  if (!alreadyThere(nodeId)) {
    linkMapping.push({
      node_id: nodeId,
      maps_to: newPath,
    });
  }
  function alreadyThere(nodeId) {
    for (const item of linkMapping) {
      if (item.node_id == nodeId) {
        return true;
      }
    }
    return false;
  }
}
