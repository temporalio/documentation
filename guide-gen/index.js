#!/usr/bin/env node
const fs = require("fs-extra");
const readdirp = require("readdirp");
const path = require("path");
const graymatter = require("gray-matter");

__dirname = path.resolve();

const DOCS_PATH = `${__dirname}/docs`;
const FILE_EXTENSION = ".md";
// const A_HREF_REGEX = /<a href="([^\'\"]+)">/g;
// const URL_REGEX = /([^\'\"]+)/g;

const CONCEPTS_CONFIG = require("./guide-configs/concepts.json");

const GUIDE_CONFIGS = [CONCEPTS_CONFIG];

// File is the class that contains a filename and lines of the file
class File {
  constructor(filename, path, fullpath) {
    this.filename = filename;
    this.path = path;
    this.fullpath = fullpath;
  }
}

run();

async function run() {
  let files = await getFilePaths();
  //console.log(files);
  files = await getFileContents(files);
  // console.log(files);
  let gfs = await attachFiles(GUIDE_CONFIGS, files);

  gfs = await generateGuides(gfs, files);

  console.log(gfs[0].guide_string);

  await writeGuides(gfs);
}

async function getFilePaths() {
  const file_paths = [];
  for await (const entry of readdirp(DOCS_PATH)) {
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

async function attachFiles(guide_configs, files) {
  let updated_configs = [];
  for (let guide_config of guide_configs) {
    guide_config = await findMatches(guide_config, files);
    updated_configs.push(guide_config);
  }
  return updated_configs;
}

async function findMatches(guide_config, files) {
  let h2_sections = guide_config.h2_sections;
  let updated_h2_sections = [];
  for (const h2_section of guide_config.h2_sections) {
    const updated_h2_section = await matchFilesToSection(h2_section, files);
    updated_h2_sections.push(updated_h2_section);
  }
  guide_config.h2_sections = h2_sections;
  return guide_config;
}

async function matchFilesToSection(h2_section, files) {
  let updated_h2_section = h2_section;
  let updated_h3_sections = [];
  for (const h3_section of h2_section.h3_sections) {
    const file = files.find((obj) => {
      return obj.path === `${h3_section.path}${FILE_EXTENSION}`;
    });
    h3_section.file = file;
    updated_h3_sections.push(h3_section);
  }
  updated_h2_section.h3_sections = updated_h3_sections;
  return updated_h2_section;
}

async function generateGuides(guide_configs, files) {
  updated_configs = [];
  for (let guide_config of guide_configs) {
    guide_config = await generateGuide(guide_config, files);
    updated_configs.push(guide_config);
  }
  return updated_configs;
}

async function generateGuide(guide_config, files) {
  let guide_string = frontmatter(guide_config);
  for (const h2_section of guide_config.h2_sections) {
    guide_string = `${guide_string}## ${h2_section.header}\n`;
    for (const h3_section of h2_section.h3_sections) {
      let markdown = "";
      if (h3_section.type == "lang-tabs") {
        markdown = await generateLangTabs(h3_section, files);
      } else {
        markdown = h3_section.file.raw_content
      }

      if (h3_section.header != "none") {
        guide_string = `${guide_string}### ${h3_section.header}\n`;
      }
      guide_string = `${guide_string}${markdown}`;
      guide_string = `${guide_string}\n`;
    }
  }
  guide_config.guide_string = guide_string;
  return guide_config;
}

async function generateLangTabs(h3_section, files) {
  let tabs = {};
  for (const file of files) {
    for (const tab of h3_section.langs) {
      if (tab.path != "none") {
        if (`${tab.path}${FILE_EXTENSION}` == file.path) {
          tab.markdown = file.raw_content;
        }
      } else {
        tab.markdown = "Content is not available";
      }
      tabs[tab.lang] = tab
    }
  }
  h3_section.tabs = tabs;
  return await generateTabString(h3_section);
}

async function generateTabString(h3_section) {
  let tab_string = `<Tabs\n`;
  tab_string = `${tab_string}defaultValue="go"\n`;
  tab_string = `${tab_string}groupId="site-lang"\n`;
  tab_string = `${tab_string}values={[{label: 'Go', value: 'go'},{label: 'Java', value: 'java'},{label: 'PHP', value: 'php'},{label: 'Typescript', value: 'typescript'},]}>\n\n`;
  tab_string = `${tab_string}<TabItem value="go">\n\n`;
  tab_string = `${tab_string}${h3_section.tabs.go.markdown}\n\n`;
  tab_string = `${tab_string}</TabItem>\n`;
  tab_string = `${tab_string}<TabItem value="java">\n\n`;
  tab_string = `${tab_string}${h3_section.tabs.java.markdown}\n\n`;
  tab_string = `${tab_string}</TabItem>\n`;
  tab_string = `${tab_string}<TabItem value="php">\n\n`;
  tab_string = `${tab_string}${h3_section.tabs.php.markdown}\n\n`;
  tab_string = `${tab_string}</TabItem>\n`;
  tab_string = `${tab_string}<TabItem value="typescript">\n\n`;
  tab_string = `${tab_string}${h3_section.tabs.typescript.markdown}\n\n`;
  tab_string = `${tab_string}</TabItem>\n`;
  tab_string = `${tab_string}</Tabs>\n`
  return tab_string;
}

function frontmatter(guide_config) {
  let guide_string = `---\n`;
  guide_string = `${guide_string}id: ${guide_config.id}\n`;
  guide_string = `${guide_string}title: ${guide_config.title}\n`;
  guide_string = `${guide_string}sidebar_label: ${guide_config.sidebar_label}\n`;
  guide_string = `${guide_string}description: ${guide_config.description}\n`;
  guide_string = `${guide_string}---\n`;
  guide_string = `${guide_string}\n`;
  if (guide_config.add_tabs_support) {
    guide_string = `${guide_string}import Tabs from '@theme/Tabs';\n`;
    guide_string = `${guide_string}import TabItem from '@theme/TabItem';\n\n`;
  }
  return guide_string;
}

async function writeGuides(guide_configs) {
  for (const guide_config of guide_configs) {
    fs.writeFile(
      path.join(DOCS_PATH, guide_config.file_name),
      guide_config.guide_string
    );
  }
}
