import fs from "fs-extra";
import path from "path";

function translateLanguageName(name) {
  const map = {
    golang: "go",
    javalang: "java",
    python: "python",
    tscript: "typescript",
    phplang: "php",
  };
  return map[name] || name;
}

async function sortBySidebarPosition(filePaths) {
  // Asynchronously get sidebar_position for each file
  const getSidebarPosition = async (file) => {
    const content = await fs.readJSON(file);
    return content.sidebar_position || Infinity; // Defaulting to Infinity ensures files without this field go to the end
  };

  const positions = await Promise.all(filePaths.map(getSidebarPosition));

  // Sorting based on the extracted positions
  filePaths.sort((a, b) => {
    return positions[filePaths.indexOf(a)] - positions[filePaths.indexOf(b)];
  });
}

async function getFilesInDirectory(directory, extension) {
  let filesList = [];
  const files = await fs.readdir(directory);

  for (const file of files) {
    const absolutePath = path.join(directory, file);
    const fileStat = await fs.stat(absolutePath);

    if (fileStat.isDirectory()) {
      filesList = filesList.concat(await getFilesInDirectory(absolutePath, extension));
    } else if (path.extname(absolutePath) === extension) {
      filesList.push(absolutePath);
    }
  }
  return filesList;
}

async function getMetadataFromMarkdown(filePath) {
  const content = await fs.readFile(filePath, "utf8");
  const yamlFrontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);

  if (yamlFrontmatterMatch) {
    const yamlData = yamlFrontmatterMatch[1];
    const titleMatch = yamlData.match(/^title:\s*(.*)$/m);
    const descriptionMatch = yamlData.match(/^description:\s*(.*)$/m);

    return {
      title: titleMatch ? titleMatch[1].trim() : "",
      description: descriptionMatch ? descriptionMatch[1].trim() : "",
    };
  }
  return { title: "", description: "" };
}
async function generateTableOfContents(config, files) {
  const filesByLanguage = files.reduce((groups, file) => {
    const language = path.basename(path.dirname(file));
    if (!groups[language]) {
      groups[language] = [];
    }
    groups[language].push(file);
    return groups;
  }, {});

  for (const [language, filePaths] of Object.entries(filesByLanguage)) {
    let tocContent = `---
id: ${translateLanguageName(language)}-dev-guide-structure
title: ${translateLanguageName(language).toUpperCase()} SDK developer's guide structure
description: Explore the Temporal ${translateLanguageName(language)} SDK's developer's guide structure.
sidebar_label: ${translateLanguageName(language)} SDK guide
tags:
    - dev guide
    - ${translateLanguageName(language)}
---

This guide is meant to provide a comprehensive overview of the structures, primitives, and features used in [Temporal Application](/temporal#temporal-application) development.
\n\n`;
    await sortBySidebarPosition(filePaths);

    for (const filePath of filePaths) {
      const content = await fs.readJSON(filePath);
      const h2Sections = content.sections.filter((section) => section.type === "h2");
      // Doesn't include the "Introduction" and "Landing" topics
      const excludedTopics = ["Introduction", "Landing"];

      // Get the topic name from the JSON filename and format it
      const topicName =
        path.basename(filePath, ".json").charAt(0).toUpperCase() + path.basename(filePath, ".json").slice(1);
      if (!excludedTopics.includes(topicName)) {
        tocContent += `## ${topicName}\n\n`;
        if (content.description) {
          tocContent += `${content.description}\n\n`;
        }
      }

      // Assuming that each JSON has a "description" field at the root level.
      for (const section of h2Sections) {
        const markdownFilename = section.id.split("/").pop() + ".md";
        const translatedLanguage = translateLanguageName(content.file_dir.split("/")[1]);

        const markdownPath = path.join(config.root_dir, "/docs-src", translatedLanguage, markdownFilename);
        console.log(`markdownPath: ${markdownPath}`);

        if (await fs.pathExists(markdownPath)) {
          const metadata = await getMetadataFromMarkdown(markdownPath);

          // Updated URL generation
          const url = `/${translatedLanguage}/${markdownFilename.replace(".md", "")}`;
          tocContent += `- [${metadata.title}](${url}) - ${metadata.description}\n`;
        } else {
          console.log(`File not found: ${markdownPath}`);
        }
      }
      tocContent += "\n"; // Add a newline for spacing between topics
    }
    const translatedLanguage = translateLanguageName(language);
    const outputPath = path.join(
      config.root_dir,
      "docs-src",
      translatedLanguage,
      `${translatedLanguage}-dev-guide-structure.md`
    );
    await fs.writeFile(outputPath, tocContent);
  }
}

export async function devGuideToc(config) {
  try {
    let joinPath = path.join(config.root_dir, config.guide_configs_path, "app-dev");

    let files = await getFilesInDirectory(joinPath, ".json");
    // Exclude 'sdks.json'
    files = files.filter((file) => !file.endsWith("sdks.json"));
    await generateTableOfContents(config, files);
  } catch (err) {
    console.error("An error occurred:", err);
  }
}
