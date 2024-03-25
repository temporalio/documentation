import fs from "fs";
import path from "path";
import fetch from "node-fetch";

const configData = JSON.parse(fs.readFileSync("./secure/cloud-connection.json", "utf-8"));

async function fetchAndGenerateTable() {
  // Check if the github_token value or key is empty
  if (!configData.github_token || configData.github_token.trim() === "") {
    console.log("GitHub token is missing or empty. Skipping execution.");
    return "";
  }

  const response = await fetch(
    "https://api.github.com/repos/temporalio/saas-policy/contents/config/policy/v2/action_groups/data.json",
    {
      headers: {
        Authorization: `Bearer ${configData.github_token}`,
        "X-GitHub-Api-Version": "2022-11-28",
      },
    }
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  const downloadUrl = data.download_url;

  const downloadResponse = await fetch(downloadUrl);
  if (!downloadResponse.ok) {
    throw new Error(`HTTP error! status: ${downloadResponse.status}`);
  }

  const jsonData = await downloadResponse.json();
  const permissionMap = {};

  for (const [type, rolePerms] of Object.entries(jsonData.config)) {
    for (const [role, perms] of Object.entries(rolePerms)) {
      for (const perm in perms) {
        const [prefix, name] = perm.split(":");
        if (!permissionMap[name]) {
          permissionMap[name] = {
            name,
            prefix,
            roles: [],
          };
        }
        permissionMap[name].roles.push(`${type}:${role}`);
      }
    }
  }

  console.log(permissionMap);

  const outputLines = [];

  function printTable(header, permissions) {
    outputLines.push(`### ${header}\n`);
    outputLines.push("| Permission | Admin | Developer | Read | Write | Account |");
    outputLines.push("|------------|-------|------------|------|-------|---------|");

    const sortedPermissions = Object.values(permissions).sort((a, b) => a.name.localeCompare(b.name));

    for (const { name, roles } of sortedPermissions) {
      const row = `| ${name} | ${roles.includes("namespace:admin") ? "✔" : " "} | ${
        roles.includes("account:developer") ? "✔" : " "
      } | ${roles.includes("namespace:read") ? "✔" : " "} | ${roles.includes("namespace:write") ? "✔" : " "} | ${
        roles.includes("account:read") ? "✔" : " "
      } |`;
      outputLines.push(row);
    }

    outputLines.push("");
  }

  const saasApiPermissions = Object.values(permissionMap).filter((p) => p.prefix === "saas-api");
  const saasTemporalPermissions = Object.values(permissionMap).filter((p) => p.prefix === "saas-temporal");

  printTable("Cloud Management APIs", saasApiPermissions);
  printTable("Temporal Server APIs", saasTemporalPermissions);

  return outputLines.join("\n");
}

export async function userDataSourceTable(config) {
  console.log(`generating the table...`);
  const tableContent = await fetchAndGenerateTable();
  const sourceNodesFilePath = path.join(config.root_dir, config.docs_src, "cloud", "action-groups.md");
  const headerContent = `---
id: action-groups
title: Action groups
sidebar_label: Action groups
description: Action groups permissions for Temporal Cloud and Temporal Server.
---

Action groups define the permissions and access control for different roles within Temporal Cloud and Temporal Server.
They determine which APIs and resources each role can access and interact with.
  `;

  try {
    // Try to create the directory if it doesn't exist
    fs.mkdirSync(path.dirname(sourceNodesFilePath), { recursive: true });
  } catch (err) {
    if (err.code !== "EEXIST") {
      console.error(`Error creating directory: ${err.message}`);
      return;
    }
  }

  // Write the file
  fs.writeFileSync(sourceNodesFilePath, headerContent + tableContent, "utf-8");
  // print the file path
  console.log(`Generated table at ${sourceNodesFilePath}`);
}
