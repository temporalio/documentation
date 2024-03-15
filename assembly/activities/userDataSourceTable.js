import fs from "fs";
import path from "path";

async function fetchAndGenerateTable() {
  const response = await fetch(
    "https://raw.githubusercontent.com/temporalio/saas-policy/main/config/policy/v2/action_groups/data.json?token=GHSAT0AAAAAABS7EKG6GHKKYUGPZVN4IPAKZPUZZ4A"
  );
  const data = await response.json();

  const permissionMap = {};

  for (const [type, rolePerms] of Object.entries(data.config)) {
    for (const [role, perms] of Object.entries(rolePerms)) {
      for (const [perm, allowed] of Object.entries(perms)) {
        if (allowed) {
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
  }

  const outputLines = [];

  function printTable(header, permissions) {
    outputLines.push(`### ${header}\n`);
    outputLines.push("| Permission | Admin | Developer | Read | Write | Account |");
    outputLines.push("|------------|-------|------------|------|-------|---------|");

    const sortedPermissions = Object.values(permissions).sort((a, b) => a.name.localeCompare(b.name));

    for (const { name, roles } of sortedPermissions) {
      const row = `| ${name} | ${roles.includes("namespace:admin") ? "✔" : " "} | ${
        roles.includes("write:developer") ? "✔" : " "
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

Action groups define the permissions and access control for different roles within Temporal Cloud and Temporal Server. They determine which APIs and resources each role (admin, developer, read, write, etc.) can access and interact with.
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
userDataSourceTable;
