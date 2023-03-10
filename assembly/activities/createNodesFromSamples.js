import fs from "fs-extra";
import path from "path";
import rangeParser from "parse-numeric-range";

const docsAsSourceRegex = "(?:\\/\\*)(?: @dacx\\n)(id:.*)(?:\n)(title:.*)(?:\\n)(label:.*)(?:\\n)(description:.*)(?:\\n)(lines:.*)(?:\\n@dacx \\*\\/)";
const docsAsSource = RegExp(docsAsSourceRegex, "gm");
const codeBlocks = '```';

export async function createNodesFromSamples(config) {
  console.log("creating nodes from samples...");
  const readPath = path.join(
    config.root_dir,
    config.temp_write_dir,
    config.samples_file_paths_filename,
  );
  const filePaths = await fs.readJSON(readPath);
  for (const repoPaths of filePaths) {
    for (const file of repoPaths.repo_files) {
      const ext = path.extname(file.name);
      const lang = ext.slice(1);
      if (isDACX(file.name) && isSupportedExtension(ext)) {
        const sourceURL = parseURL(repoPaths.source_url, file);
        await createNodes(config, file, lang, sourceURL)
      }
    }
  }
  async function createNodes(config, file, lang, sourceURL){
    
    const sampleFileReadPath = path.join(
      config.root_dir,
      config.temp_write_dir,
      file.directory,
      file.name,
    );
    const raw = await fs.readFile(sampleFileReadPath);
    const contents = raw.toString('utf8');
    const fileLines = contents.split('\n');
    const nodeData = findMetaData(contents);
    if(nodeData.length > 0) {
      const nodes = await parseData(nodeData, fileLines, lang)
      await writeNodes(nodes, config, sourceURL);
    }
  }

  async function writeNodes(nodes, config, sourceURL) {
    for (const node of nodes) {
      let writeStr = "";
      writeStr = `${writeStr}---\n`;
      writeStr = `${writeStr}id: ${node.metadata.id}\n`;
      writeStr = `${writeStr}title: ${node.metadata.title}\n`;
      writeStr = `${writeStr}sidebar_label: ${node.metadata.label}\n`;
      writeStr = `${writeStr}description: ${node.metadata.description}\n`;
      writeStr = `${writeStr}---\n\n`;
      for (const narLine of node.narrative_lines) {
        writeStr = `${writeStr}${narLine}\n`;
      }
      writeStr = `${writeStr}\n`;
      writeStr = `${writeStr}${genSourceLinkHTML(sourceURL)}\n\n`;
      writeStr = `${writeStr}${codeBlocks}${node.metadata.lang}\n\n`;
      for (const codeLine of node.code_lines) {
        writeStr = `${writeStr}${codeLine}\n`;
      }
      writeStr = `${writeStr}${codeBlocks}\n\n`;
      const nodeWritePath = path.join(
        config.root_dir,
        config.docs_src,
        `${node.metadata.lang}`,
        `${node.metadata.id}.md`,
      )
      await fs.writeFile(nodeWritePath, writeStr);
    }
  }

  async function parseData(nodeData, fileLines, lang) {
    const nodes = [];
    for (const match of nodeData) {
      const node = {};
      node.metadata = {
        id: trimUP(match[1]),
        title: trimUP(match[2]),
        label: trimUP(match[3]),
        description: trimUP(match[4]),
        lines: rangeParser(trimUP(match[5])),
        lang: lang,
      }
      node.inverse_content = [];
      let previousNum = 0;
      for (const lineNum of node.metadata.lines) {
        if (previousNum == 0) {
          node.inverse_content.push(fileLines[lineNum-1]);
          previousNum = lineNum;
        } else {
          if ((lineNum - previousNum) > 1) {
            node.inverse_content.push("// ...");
          }
          node.inverse_content.push(fileLines[lineNum-1]);
          previousNum = lineNum;
        }
      }
      node.narrative_lines = [];
      node.code_lines = [];
      let codeMode = true;
      let skip = false;
      for (const invLine of node.inverse_content) {
        if (invLine.includes("/*")) {
          codeMode = false;
          skip = true;
        }
        if (invLine.includes("*/")) {
          codeMode = true;
          skip = true;
        }
        if(!skip && !codeMode) {
          node.narrative_lines.push(invLine);
        }
        if (!skip && codeMode) {
          node.code_lines.push(invLine);
        }
        skip = false;
      }
      nodes.push(node);
    }
    return nodes;
  }
}

function findMetaData(contents) {
  const dacMatches = [];
  let data;
  while ((data = docsAsSource.exec(contents)) !== null) {
    dacMatches.push(data);
  }
  return dacMatches;
}

function trimUP(str) {
  const strs = str.split(":");
  return strs[1].trim();
}

function isSupportedExtension(ext) {
  switch(ext){
    case ".go":
      return true;
    default:
      return false;
  }
}
function isDACX(str) {
  str.toLowerCase();
  if(str.includes("_dacx")) {
    return true;
  } else {
    return false;
  }
}

function parseURL(repoPath, file) {
  const parts = file.directory.split("/");
  const dirParts = parts.slice(1);
  const directory = dirParts.join(...dirParts);
  const sourceURL = repoPath + "/" + path.join(
    directory,
    file.name,
  );
  return sourceURL;
}

function genSourceLinkHTML(link) {
  return `<a class="dacx-source-link" href="${link}">View source code</a>`;
}
