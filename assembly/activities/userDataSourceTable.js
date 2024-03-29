import fs from "fs";
import path from "path";
import fetch from "node-fetch";

const configData = JSON.parse(fs.readFileSync("./secure/cloud-connection.json", "utf-8"));
const roleDisplayNames = {
  "account:admin": "Global Admin",
  "account:developer": "Developer",
  "account:read": "Read-only",
  "namespace:admin": "Namespace Admin",
  "namespace:write": "Write",
  "namespace:read": "Read",
};
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
        const shortName = name.replace(/^(saas-temporal|saas-api):/, "");
        if (!permissionMap[shortName]) {
          permissionMap[shortName] = {
            name: shortName,
            prefix,
            roles: [],
          };
        }
        permissionMap[shortName].roles.push(`${type}:${role}`);
      }
    }
  }
  const outputLines = [];

  function printTable(header, description, permissions, roles) {
    outputLines.push(`#### ${header}\n`);
    outputLines.push(description + "\n");
    outputLines.push("| Permission |" + roles.map((role) => ` ${roleDisplayNames[role]} |`).join(""));
    outputLines.push("|" + "-----------|".repeat(roles.length + 1));

    const sortedPermissions = Object.values(permissions)
      .filter((perm) => roles.some((role) => perm.roles.includes(role)))
      .sort((a, b) => a.name.localeCompare(b.name));

    for (const { name, roles: permRoles } of sortedPermissions) {
      const row = `| ${name} |${roles.map((role) => (permRoles.includes(role) ? " ✔ |" : " |")).join("")}`;
      outputLines.push(row);
    }

    outputLines.push("");
  }

  printTable(
    "Account-level Role details",
    "This table provides API-level details for the permissions granted to a user through account-level Roles.  These permissions are configured per user.",
    permissionMap,
    ["account:admin", "account:developer", "account:read"]
  );

  printTable(
    "Namespace-level permissions details",
    "This table provides API-level details for the permissions granted to a user through Namespace-level permissions.  These permissions are configured per Namespace per user.",
    permissionMap,
    ["namespace:admin", "namespace:write", "namespace:read"]
  );

  return outputLines.join("\n");
}

export async function userDataSourceTable(config) {
  console.log(`generating the table...`);
  const tableContent = await fetchAndGenerateTable();
  const sourceNodesFilePath = path.join(config.root_dir, config.docs_src, "cloud", "action-groups.md");
  const headerContent = `---
id: action-groups
title: Account-level Roles and Namespace-level permissions
sidebar_label: Account-level Roles and Namespace-level permissions
description: Account-level Roles and Namespace-level permissions for Temporal Cloud and Temporal Server.
---

Temporal account-level Roles and Namespace-level permissions provide access to specific Temporal Workflow and Temporal Cloud operational APIs. 
The following table provides the API details associated with each account-level Role and Namespace-level permission.

:::note

Account Global Admin has Namespace Admin permissions on Namespaces.

:::
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
