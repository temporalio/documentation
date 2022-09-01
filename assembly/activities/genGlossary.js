import fs from "fs-extra";
import path from "path";

const glossFrontmatter = `---
id: glossary
title: Glossary
description: The following terms have specific definitions within the context of the Temporal Platform.
sidebar_label: Glossary
tags:
  - reference
---

The following terms are used in [Temporal Platform](/concepts/what-is-the-temporal-platform) documentation.`;

export async function genGlossary(config) {
  console.log(`generating the glossary...`);
  const sourceNodesFilePath = path.join(
    config.root_dir,
    config.temp_write_dir,
    config.source_info_nodes_file_name
  );
  let sourceNodes = await fs.readJSON(sourceNodesFilePath);
  let glossStr = `${glossFrontmatter}\n\n`;
  for (const node of sourceNodes) {
    if (node.tags !== undefined) {
      for (const tag of node.tags) {
        if (tag == "term") {
          glossStr = `${glossStr}[${node.label}](${node.id})\n`;
          break;
        }
      }
    }
  }
  const glossaryWritePath = path.join(
    config.root_dir,
    config.content_write_directory,
    glossary_file_name
  );
  await fs.writeFile(glossaryWritePath, glossStr);
  return;
}
