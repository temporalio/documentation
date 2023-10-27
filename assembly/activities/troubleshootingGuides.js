import fs from "fs-extra";
import path, { dirname } from "path";
import { fileURLToPath } from 'url';
import yaml from "js-yaml";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


function getFrontmatter(lines) {
    let start = -1;
    let end = -1;
    for (let index = 0; index < lines.length; index++) {
        const line = lines[index].trim();
        if (line === '---') {
            if (start === -1) {
                start = index;
            } else {
                end = index;
                break;
            }
        }
    }

    if (start !== -1 && end !== -1) {
        return lines.slice(start + 1, end).join('\n');
    }

    return null;
}

async function generateTroubleShootingDocs(config) {
    console.log("Generating home directory for troubleshooting docs...");

    config = {
        root_dir: __dirname,
        docs_path: '../../docs-src/troubleshooting'
    };

    const directoryPath = path.join(config.root_dir, config.docs_path);
    const files = await fs.promises.readdir(directoryPath);
    const fileStats = await Promise.all(files.map(file => fs.promises.stat(path.join(directoryPath, file))));
    const filteredFiles = files.filter((file, index) =>
        fileStats[index].isFile() && file !== 'intro.md'
    );
    const links = [];

    const readFilePromises = filteredFiles.map(file => {
        const filePath = path.join(directoryPath, file);
        return fs.promises.readFile(filePath, 'utf-8');
    });

    const fileContents = await Promise.all(readFilePromises);

    fileContents.forEach((fileContent, index) => {
        const lines = fileContent.split('\n');
        const frontmatter = getFrontmatter(lines);
        
        if (frontmatter) {
            const data = yaml.safeLoad(frontmatter);
            if (data.sidebar_label && data.description) {
                const sidebarLabel = data.sidebar_label;
                const description = data.description;
                const filename = path.basename(filteredFiles[index], '.md');
                links.push(`- [${sidebarLabel}](/troubleshooting/${filename}) - ${description}`);
            }
        }
    });

    const headerContent = `---
id: intro
title: Error Handling and Troubleshooting
sidebar_label: Troubleshooting
sidebar_position: 10
description: This guide contains error handling and troubleshooting solutions for Temporal edge cases.
toc_max_heading_level: 4
keywords:
- error
- troubleshooting
tags:
- error
- troubleshooting
---

This guide provides troubleshooting solutions for potential Temporal errors and edge cases.

Learn more about the following topics:

`;

    const outputPath = path.join(config.root_dir, config.docs_path, 'intro.md');

    fs.writeFileSync(outputPath, headerContent + links.join('\n'));

    console.log("Home directory for troubleshooting docs has been generated.");
}


export { generateTroubleShootingDocs };