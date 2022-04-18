#!/usr/bin/env node
const fs = require('fs-extra');
const readdirp = require('readdirp');
const path = require('path');
const graymatter = require('gray-matter');

__dirname = path.resolve();
// const JSON_PATH = `${__dirname}/src/routes/terms/[slug]/terms.json`;
// const DOCS_DIR = `docs`;
// const CONCEPT_DIR = `concepts`;
const DOCS_PATH = `${__dirname}/docs`;
// const TEMP_DIR = `temp-dir`;
// const A_HREF_REGEX = /<a href="([^\'\"]+)">/g;
// const URL_REGEX = /([^\'\"]+)/g;


const conceptsConfig = require("./guide-configs/concepts.json");
// import conceptsConfig from "./guide-configs/concepts.json";


// File is the class that contains a filename and lines of the file
class File {
  constructor(filename, path, fullpath) {
    this.filename = filename;
    this.path = path;
    this.fullpath = fullpath;
    this.lines = [];
  }
  // fileString converts the array of lines into a string
  fileString() {
    return `${this.lines.join("\n")}\n`;
  }
}

run();
// Entry point
// const octokit = new Octokit();
// // const repo_stuff = await getRepos();
// // await cleanUp(TEMP_DIR, '');
// let files = await getFilePaths();
// console.log(files);
// files = await getFileContents(files);
// files = await generateHTML(files);
// await customAdds(files);
// await writeToJSON(files);
// console.log(files);

async function run() {
  let files = await getFilePaths();
  //console.log(files);
  files = await getFileContents(files);
  //console.log(files);
}

async function mkDir(level1, level2) {
  try {
    await fs.ensureDir(path.join(level1, level2))
    console.log("directory exists");
  } catch (err) {
    console.error(err)
  }
  return;
}

async function cleanUp(level1, level2) {
  await fs.remove(path.join(level1, level2));
  return;
}

async function getFilePaths(){
  const file_paths = [];
  for await (const entry of readdirp(DOCS_PATH)) {
    console.log(entry);
    const file = new File(entry.basename, entry.path, entry.fullPath);
    file_paths.push(file);
  }
  return file_paths;
}

async function getFileContents(files) {
  const updated_files = [];
  for (const file of files) {
    const raw_content = await fs.readFile(`${file.fullpath}`);
    const gm = graymatter(raw_content);
    file.raw_content = gm.content;
    file.frontmatter = gm.data;
    file.is_empty = gm.isEmpty;
    file.excerpt = gm.excerpt;
    updated_files.push(file);
  }
  return updated_files;
}

// async function generateHTML(files) {
//   const updated_files = [];
//   const md = new MarkdownIt();
//   for (const file of files) {
//     file.html = md.render(file.raw_content);
//     updated_files.push(file);
//   }
//   return updated_files;
// }

async function customAdds(files) {
  const updated_files = [];
  for (const file of files) {
    const new_lines = [];
    const lines = file.html.split("\n");
    file.links = [];
    for (let line of lines) {
      if (line.includes("<a ")) {
        const links = await getLinks(line);
        file.links.push(...links);
        line = await addOnHover(line, links);
      }
      new_lines.push(line);
    }
    file.html = new_lines.join('\n');
    updated_files.push(file);
  }
  return updated_files;
}

async function getLinks (html_line) {
  const matches = html_line.match(A_HREF_REGEX);
  let links = [];
  for (const m of matches) {
    links.push(await convertToLink(m));
  }
  //console.log(links);
  return links;
}

async function convertToLink(m) {
  const parts = m.match(URL_REGEX);
  const url = parts[1];
  const link = {
    "url": url,
    "replace": m,
  };
  switch(url[0]) {
    case "/":
    link.type = "local";
    break;
    case "h":
    link.type = "remote";
    break;
    case "#":
    link.type = "anchor";
    break;
    default:
    link.type = "unknown";
  }
  return link;
}

async function addOnHover(line, links) {
  for (const link of links) {
    if(link.type == "local") {
      const new_html = `<a on:hover=\{handleLocalLinkHover(${link.url})}\ href="${link.url}">`
      // const new_html = `&lt;a on:hover={handleLocalLinkHover(${link.url})} href=&quot;${link.url}&quot;&gt;`
      line = line.replace(link.replace, new_html);
    }
  }
  //console.log(line);
  return line;
}

async function writeToJSON(files) {
  const jsonContent = JSON.stringify(files);
  await fs.writeFile(JSON_PATH, jsonContent, 'utf8');
  return;
}
