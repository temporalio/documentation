#!/usr/bin/env node
const fs = require("fs-extra");
const readdirp = require("readdirp");
const path = require("path");
const graymatter = require("gray-matter");

__dirname = path.resolve();

const DOCS_PATH = `${__dirname}/docs`;
const GUIDE_CONFIGS_PATH = `${__dirname}/guide-gen/guide-configs`;
const FILE_EXTENSION = ".md";

// const WORKFLOW_CONCEPTS_CONFIG = require("./guide-configs/concepts.json");
// const WORKFLOW_CONCEPTS_CONFIG = require("./guide-configs/concepts.json");
//
// const APP_DEV_CONFIG = require("./guide-configs/app-dev.json");
//
// const GUIDE_CONFIGS = {
//   cfgs: [CONCEPTS_CONFIG, APP_DEV_CONFIG],
// };

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
  let guide_configs = await getConfigs();
  // Search and identify files in the docs diretory
  let files = await getFilePaths();
  // Read all of the file contents
  files = await getFileContents(files);
  // Attach the file to the corresponding section in each guide
  guide_configs = await attachFiles(guide_configs, files);
  // Generate a full index of anchors in the guides
  guide_configs = await generateLinkIndexes(guide_configs);
  // Replace relevant links with guide anchors
  guide_configs = await replaceWithLocalRefs(guide_configs);
  // Generate the full Markdown for each guide
  guide_configs = await generateGuides(guide_configs);
  // Write the Markdown guides to files
  await writeGuides(guide_configs);
}

async function getConfigs() {
  const file_paths = [];
  const guide_configs = {
    cfgs: [],
  };
  for await (const entry of readdirp(GUIDE_CONFIGS_PATH)) {
    const file = new File(entry.basename, entry.path, entry.fullPath);
    file_paths.push(file);
  }
  for (const file of file_paths) {
    const raw_content = await fs.readFile(`${file.fullpath}`);
    guide_configs.cfgs.push(JSON.parse(raw_content));
  }
  return guide_configs;
}

async function getFilePaths() {
  console.log("getting file paths to sections...");
  const file_paths = [];
  for await (const entry of readdirp(DOCS_PATH)) {
    const file = new File(entry.basename, entry.path, entry.fullPath);
    file_paths.push(file);
  }
  return file_paths;
}

async function getFileContents(files) {
  console.log("getting file contents...");
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
  let updated_cfgs = [];
  for (let cfg of guide_configs.cfgs) {
    cfg = await findMatches(cfg, files);
    updated_cfgs.push(cfg);
  }
  guide_configs.cfgs = updated_cfgs;
  return guide_configs;
}

async function findMatches(guide_config, files) {
  console.log(`finding matches for ${guide_config.id}...`);
  let updated_h2_sections = [];
  for (let h2_section of guide_config.h2_sections) {
    h2_section = await matchFilesToSection(h2_section, files);
    updated_h2_sections.push(h2_section);
  }
  guide_config.h2_sections = updated_h2_sections;
  return guide_config;
}

async function matchFilesToSection(h2_section, files) {
  console.log("matching files to sections...");
  let updated_h3_sections = [];
  for (const h3_section of h2_section.h3_sections) {
    if (h3_section.type == "lang-tabs") {
      h3_section.langs = await matchLangTabs(h3_section.langs, files);
    } else {
      h3_section.file = await matchPath(h3_section.path, files);
    }
    if (h3_section.h4_sections != undefined) {
      updated_h4_sections = [];
      for (h4_section of h3_section.h4_sections) {
        if (h4_section.type == "lang-tabs") {
          h4_section.langs = await matchLangTabs(h4_section.langs, files);
        } else {
          h4_section.file = await matchPath(h4_section.path, files);
        }
        updated_h4_sections.push(h4_section);
      }
      h3_section.h4_sections = updated_h4_sections;
    }
    updated_h3_sections.push(h3_section);
  }
  h2_section.h3_sections = updated_h3_sections;
  return h2_section;
}

async function matchLangTabs(langs, files) {
  let updated_langs = [];
  for (lang of langs) {
    if (lang.path != "none") {
      lang.file = await matchPath(lang.path, files);
    }
    updated_langs.push(lang);
  }
  return updated_langs;
}

async function matchPath(path, files) {
  const file = files.find((obj) => {
    return obj.path === `${path}${FILE_EXTENSION}`;
  });
  if (file == undefined) {
    console.log(`Can't find a file for ${path}`);
  }
  return file;
}

async function generateGuides(guide_configs) {
  updated_cfgs = [];
  for (let cfg of guide_configs.cfgs) {
    cfg = await generateGuide(cfg);
    updated_cfgs.push(cfg);
  }
  guide_configs.cfgs = updated_cfgs;
  return guide_configs;
}

async function generateGuide(guide_config) {
  console.log("generating guide...");
  let guide_string = await frontmatter(guide_config);
  for (const h2_section of guide_config.h2_sections) {
    if (h2_section.header != "none") {
      guide_string = `${guide_string}## ${h2_section.header}\n\n`;
    }
    for (const h3_section of h2_section.h3_sections) {
      let markdown = "";
      if (h3_section.type == "lang-tabs") {
        markdown = await generateLangTabs(h3_section);
      } else {
        markdown = h3_section.file.raw_content;
      }
      if (h3_section.header != "none") {
        guide_string = `${guide_string}### ${h3_section.header}\n\n`;
      }
      guide_string = `${guide_string}${markdown}`;
      guide_string = `${guide_string}\n\n`;
      if (h3_section.h4_sections != undefined) {
        for (h4_section of h3_section.h4_sections) {
          if (h4_section.type == "lang-tabs") {
            markdown = await generateLangTabs(h4_section);
          } else {
            markdown = h4_section.file.raw_content;
          }
          if (h4_section.header != "none") {
            guide_string = `${guide_string}#### ${h4_section.header}\n\n`;
          }
          guide_string = `${guide_string}${markdown}`;
          guide_string = `${guide_string}\n\n`;
        }
      }
    }
  }
  guide_config.guide_string = guide_string;
  return guide_config;
}

async function generateLangTabs(h3_section) {
  let tabs = {};
  for (const tab of h3_section.langs) {
    if (tab.path != "none") {
      tab.markdown = tab.file.raw_content;
    } else {
      tab.markdown = "Content is not available";
    }
    tabs[tab.lang] = tab;
  }
  h3_section.tabs = tabs;
  const markdown = await generateTabString(h3_section);
  return markdown;
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
  tab_string = `${tab_string}</Tabs>`;
  return tab_string;
}

async function frontmatter(guide_config) {
  let guide_string = `---\n`;
  guide_string = `${guide_string}id: ${guide_config.id}\n`;
  guide_string = `${guide_string}title: ${guide_config.title}\n`;
  guide_string = `${guide_string}sidebar_label: ${guide_config.sidebar_label}\n`;
  guide_string = `${guide_string}description: ${guide_config.description}\n`;
  guide_string = `${guide_string}toc_max_heading_level: ${guide_config.toc_max_heading_level}\n`;
  guide_string = `${guide_string}---\n\n`;
  guide_string = `${guide_string}<!-- THIS FILE IS GENERATED. DO NOT EDIT THIS FILE DIRECTLY -->\n\n`;
  if (guide_config.add_tabs_support) {
    guide_string = `${guide_string}import Tabs from '@theme/Tabs';\n`;
    guide_string = `${guide_string}import TabItem from '@theme/TabItem';\n\n`;
  }
  guide_string = `${guide_string}${guide_config.description}\n\n`;
  return guide_string;
}

async function writeGuides(guide_configs) {
  for (const guide_config of guide_configs.cfgs) {
    fs.writeFile(
      path.join(DOCS_PATH, guide_config.file_name),
      guide_config.guide_string
    );
  }
}

async function generateLinkIndexes(guide_configs) {
  let updated_cfgs = [];
  let full_index = [];
  for (let cfg of guide_configs.cfgs) {
    cfg = await generateLinkIndex(cfg);
    full_index.push(...cfg.link_index);
    updated_cfgs.push(cfg);
  }
  guide_configs.cfgs = updated_cfgs;
  guide_configs.full_link_index = full_index;
  return guide_configs;
}

async function generateLinkIndex(guide_config) {
  console.log(`generating link index for ${guide_config.id}...`);
  let link_index = [];
  for (const h2_section of guide_config.h2_sections) {
    let h3_index = 0;
    for (const h3_section of h2_section.h3_sections) {
      if (h3_section.header == "none" && h2_section.header == "none") {
        link_index.push({
          guide: guide_config.id,
          local_ref: "",
          path: h3_section.path,
        });
      } else if (
        h3_section.header == "none" &&
        h3_section.type != "lang-tabs"
      ) {
        link_index.push({
          guide: guide_config.id,
          local_ref: localRef(h2_section.header),
          path: h3_section.path,
        });
      } else if (h3_section.type != "lang-tabs") {
        link_index.push({
          guide: guide_config.id,
          local_ref: localRef(h3_section.header),
          path: h3_section.path,
        });
      } else if (h3_section.type == "lang-tabs") {
        for (const lang of h3_section.langs) {
          let header = "";
          if (h3_index > 0) {
            header = h2_section.h3_sections[h3_index - 1].header;
          } else {
            header = h2_section.header;
          }
          link_index.push({
            guide: guide_config.id,
            local_ref: localRef(header),
            path: lang.path,
          });
        }
      }
      if (h3_section.h4_sections != undefined) {
        let h4_index = 0;
        for (h4_section of h3_section.h4_sections) {
          if (h4_section.header == "none" && h4_section.type != "lang-tabs") {
            link_index.push({
              guide: guide_config.id,
              local_ref: localRef(h3_section.header),
              path: h4_section.path,
            });
          } else if (h4_section.type != "lang-tabs") {
            link_index.push({
              guide: guide_config.id,
              local_ref: localRef(h4_section.header),
              path: h4_section.path,
            });
          } else if (h4_section.type == "lang-tabs") {
            for (const lang of h4_section.langs) {
              let header = "";
              if (h4_index > 0) {
                header = h3_section.h4_sections[h4_index - 1].header;
              } else {
                header = h3_section.header;
              }
              link_index.push({
                guide: guide_config.id,
                local_ref: localRef(header),
                path: lang.path,
              });
            }
          }
          h4_index++;
        }
      }
      h3_index++;
    }
  }
  guide_config.link_index = link_index;
  return guide_config;

  function localRef(a_string) {
    a_string = a_string.toLowerCase();
    a_string = a_string.replaceAll(" ", "-");
    return a_string;
  }
}

async function replaceWithLocalRefs(guide_configs) {
  let updated_cfgs = [];
  for (let cfg of guide_configs.cfgs) {
    cfg = await prepToReplace(cfg, guide_configs.full_link_index);
    updated_cfgs.push(cfg);
  }
  guide_configs.cfgs = updated_cfgs;
  return guide_configs;
}

async function prepToReplace(cfg, link_index) {
  updated_h2_sections = [];
  for (h2_section of cfg.h2_sections) {
    updated_h3_sections = [];
    for (h3_section of h2_section.h3_sections) {
      if (h3_section.type == "lang-tabs") {
        h3_section.langs = await parseLangs(
          h3_section.langs,
          link_index,
          cfg.id
        );
      } else {
        h3_section.file.raw_content = await parseAndReplace(
          h3_section.file.raw_content,
          link_index,
          cfg.id
        );
      }
      if (h3_section.h4_sections != undefined) {
        let updated_h4_sections = [];
        for (h4_section of h3_section.h4_sections) {
          if (h4_section.type == "lang-tabs") {
            h4_section.langs = await parseLangs(
              h4_section.langs,
              link_index,
              cfg.id
            );
          } else {
            h4_section.file.raw_content = await parseAndReplace(
              h4_section.file.raw_content,
              link_index,
              cfg.id
            );
          }
          updated_h4_sections.push(h4_section);
        }
        h3_section.h4_sections = updated_h4_sections;
      }
      updated_h3_sections.push(h3_section);
    }
    h2_section.h3_sections = updated_h3_sections;
    updated_h2_sections.push(h2_section);
  }
  cfg.h2_sections = updated_h2_sections;
  return cfg;

  async function parseLangs(langs, link_index, cfg_id) {
    updated_langs = [];
    for (lang of langs) {
      if (lang.path != "none") {
        lang.file.raw_content = await parseAndReplace(
          lang.file.raw_content,
          link_index,
          cfg_id
        );
      }
      updated_langs.push(lang);
    }
    return updated_langs;
  }
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
      for (match of line_links) {
        // const replaceable = match.substring(6);
        const link = link_index.find((obj) => {
          console.log(`Index path: ${obj.path} Match: ${match}`);
          return obj.path === match;
        });
        if (link != undefined) {
          line = await replaceLinks(line, replaceable, link, current_guide_id);
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
    let updated = "";
    if (link.guide != current_guide_id) {
      line = line.replaceAll(replaceable, `${link.guide}/#${link.local_ref}`);
    } else {
      line = line.replaceAll(`/docs/${replaceable}`, `#${link.local_ref}`);
    }
    return line;
  }
}
