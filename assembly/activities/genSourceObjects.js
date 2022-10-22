import graymatter from "gray-matter";
import readdirp from "readdirp";
import fs from "fs-extra";
import path from "path";

export async function genSourceObjects(config) {
  console.log("getting documentation page paths...");
  const filePaths = [];
  for (const dirName of config.content_source_dirs) {
    const readDir = path.join(config.root_dir, dirName);
    for await (const entry of readdirp(readDir)) {
      // can add more ignores here
      // example:
      // if (!entry.fullPath.includes("learning-paths"))
      if (path.extname(entry.fullPath) == ".md") {
        filePaths.push(entry);
      }
    }
  }
  console.log("generating docs JSON objects...");
  const docsObjects = [];
  for (const filePath of filePaths) {
    const rawContent = await fs.readFile(`${filePath.fullPath}`);
    const meta = graymatter(rawContent);
    const infoNode = await convertGraymatter(filePath, meta);
    docsObjects.push(infoNode);
  }
  const writePath = path.join(
    config.root_dir,
    config.temp_write_dir,
    config.source_info_nodes_file_name
  );
  await fs.writeJSON(writePath, docsObjects);
  return;
}

async function convertGraymatter(filePath, meta) {
  const nodeId = makeId(filePath.fullPath, meta.data.id);
  const infoNode = {
    file_name: filePath.path,
    file_path: filePath.fullPath,
    id: nodeId,
    title: meta.data.title,
    description: meta.data.description,
    label: meta.data.sidebar_label,
    tags: meta.data.tags,
    markdown_content: meta.content,
    is_empty: meta.isEmpty,
  };
  return infoNode;
}

function makeId(filePath, fileId) {
  let nodeId = "";
  const dir = path.dirname(filePath);
  const dirParts = dir.split("/");
  let pop = true;
  let baseDir = "";
  while (pop) {
    let item = dirParts.pop();
    if (item != "docs" && item != "docs-src") {
      if (baseDir == "") {
        baseDir = item;
      } else {
        baseDir = path.join(item, baseDir);
      }
    } else {
      pop = false;
    }
  }

  if (fileId === undefined) {
    console.log(
      `The file located at ${filePath} is missing an id... using filename...`
    );
    const baseName = path.basename(filePath, ".md");
    nodeId = path.join(baseDir, baseName);
  } else {
    nodeId = path.join(baseDir, fileId);
  }
  return nodeId;
}
