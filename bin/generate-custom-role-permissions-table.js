#!/usr/bin/env node

const https = require("https");
const fs = require("fs");
const path = require("path");

const GITHUB_CONTENTS_URL =
  "https://api.github.com/repos/temporalio/saas-proto/contents";
const PERMISSIONS_URL = `${GITHUB_CONTENTS_URL}/protogen/custom_role_permissions.json`;
const SPEC_URL = "https://saas-api.tmprl.cloud/spec.json";
const API_DOCS_URL = "https://saas-api.tmprl.cloud/docs/httpapi.html";
const SERVICE_PROTO_URL = `${GITHUB_CONTENTS_URL}/proto/temporal/api/cloud/cloudservice/v1/service.proto`;

// RPCs annotated with these comments in service.proto are not in the public
// temporalio/cloud-api repo, so their permissions must not be documented.
const NON_PUBLIC_MARKERS = ["temporal:dev", "temporal:ui"];

const CLOUD_OPS_SERVICE =
  "temporal.api.cloud.cloudservice.v1.CloudService";

const RESOURCE_TYPE_LABELS = {
  RESOURCE_TYPE_ACCOUNT: "Account",
  RESOURCE_TYPE_NAMESPACE: "Namespace",
  RESOURCE_TYPE_NEXUS_ENDPOINT: "Nexus Endpoint",
  RESOURCE_TYPE_CONNECTIVITY_RULE: "Connectivity Rule",
  RESOURCE_TYPE_PROJECT: "Project",
  RESOURCE_TYPE_CUSTOM_ROLE: "Custom Role",
};

function fetchPublic(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, { headers: { "User-Agent": "temporal-docs-generator" } }, (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          if (res.statusCode !== 200) {
            reject(new Error(`HTTP ${res.statusCode} fetching ${url}`));
            return;
          }
          resolve(data);
        });
        res.on("error", reject);
      })
      .on("error", reject);
  });
}

function fetchFile(url) {
  return new Promise((resolve, reject) => {
    const options = {
      headers: {
        "User-Agent": "temporal-docs-generator",
        Accept: "application/vnd.github.v3+json",
      },
    };

    if (process.env.GITHUB_TOKEN) {
      options.headers.Authorization = `token ${process.env.GITHUB_TOKEN}`;
    }

    https.get(url, options, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        if (res.statusCode !== 200) {
          reject(new Error(`HTTP ${res.statusCode}: ${data.substring(0, 200)}`));
          return;
        }
        try {
          const json = JSON.parse(data);
          resolve(Buffer.from(json.content, "base64").toString("utf-8"));
        } catch (e) {
          reject(e);
        }
      });
      res.on("error", reject);
    });
  });
}

// Parses service.proto and returns:
// - nonPublicPermissions: custom role permission strings used only by RPCs
//   marked as not public (see NON_PUBLIC_MARKERS). A permission shared with a
//   public RPC stays documented.
// - routes: each RPC's HTTP verb and path, keyed by RPC name.
function parseServiceProto(protoSource) {
  const nonPublic = new Set();
  const publicPerms = new Set();
  const routes = {};
  let rpcName = null;
  let comments = [];
  let inRpc = false;
  let rpcIsNonPublic = false;

  for (const line of protoSource.split("\n")) {
    const trimmed = line.trim();
    if (trimmed.startsWith("//")) {
      comments.push(trimmed);
      continue;
    }
    if (trimmed === "") continue;

    const rpc = trimmed.match(/^rpc\s+(\w+)\s*\(/);
    if (rpc) {
      rpcName = rpc[1];
      inRpc = true;
      rpcIsNonPublic = comments.some((c) =>
        NON_PUBLIC_MARKERS.some((m) => c.includes(m))
      );
    }
    comments = [];

    const route = trimmed.match(/^(get|post|put|patch|delete):\s*"([^"]+)"/);
    if (inRpc && route) {
      routes[rpcName] = { verb: route[1].toUpperCase(), path: route[2] };
    }

    const match = trimmed.match(/custom_role_permission:\s*"([^"]+)"/);
    if (inRpc && match) {
      (rpcIsNonPublic ? nonPublic : publicPerms).add(match[1]);
    }
  }
  for (const permission of publicPerms) nonPublic.delete(permission);
  return { nonPublicPermissions: nonPublic, routes };
}

// Indexes the anchors in the API reference by operationId and by "VERB /path".
// The route index covers operations the spec names differently from the RPC
// (for example, GetUsers is listUsers in the spec).
function buildApiLinks(spec) {
  const links = {};
  for (const [route, methods] of Object.entries(spec.paths)) {
    for (const [verb, op] of Object.entries(methods)) {
      if (!op.operationId || !op.tags || !op.tags[0]) continue;
      const tag = op.tags[0].toLowerCase().replace(/\s+/g, "-");
      const anchor = route
        .replace(/^\//, "")
        .replace(/\{/g, "%7B")
        .replace(/\}/g, "%7D");
      const link = `${API_DOCS_URL}#tag/${tag}/${verb.toUpperCase()}/${anchor}`;
      links[op.operationId] = link;
      links[`${verb.toUpperCase()} ${route}`] = link;
    }
  }
  return links;
}

function buildTable(permissions, nonPublicPermissions, apiLinks, routes) {
  const cloudOpsPerms = permissions.filter(
    (p) =>
      p.service === CLOUD_OPS_SERVICE &&
      !p.is_internal_permission &&
      !nonPublicPermissions.has(p.permission)
  );

  const byResource = {};
  for (const perm of cloudOpsPerms) {
    for (const rt of perm.resource_types) {
      const label = RESOURCE_TYPE_LABELS[rt] || rt;
      if (!byResource[label]) byResource[label] = [];
      byResource[label].push(perm);
    }
  }

  // Deduplicate within each resource group (same permission string)
  for (const label of Object.keys(byResource)) {
    const seen = new Set();
    byResource[label] = byResource[label].filter((p) => {
      const key = p.permission;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
    byResource[label].sort((a, b) => a.permission.localeCompare(b.permission));
  }

  const resourceOrder = [
    "Account",
    "Namespace",
    "Project",
    "Nexus Endpoint",
    "Connectivity Rule",
    "Custom Role",
  ];

  let md = "{/* Auto-generated by bin/generate-custom-role-permissions-table.js — do not edit manually */}\n\n";

  for (const resourceLabel of resourceOrder) {
    const perms = byResource[resourceLabel];
    if (!perms || perms.length === 0) continue;

    md += `### ${resourceLabel} permissions\n\n`;
    md += `| Permission | Cloud Ops API | Resource type |\n`;
    md += `| ---------- | ------------- | ------------- |\n`;

    for (const perm of perms) {
      const route = routes[perm.method];
      const apiLink =
        (route && apiLinks[`${route.verb} ${route.path}`]) ||
        apiLinks[perm.method];
      const apiCol = apiLink
        ? `[${perm.method}](${apiLink})`
        : perm.method;
      const resourceTypes = perm.resource_types
        .map((rt) => RESOURCE_TYPE_LABELS[rt] || rt)
        .join(", ");
      md += `| \`${perm.permission}\` | ${apiCol} | ${resourceTypes} |\n`;
    }
    md += "\n";
  }

  return md;
}

async function main() {
  let permissionsRaw;
  let protoSource;

  let specRaw;

  // Optional local files: <custom_role_permissions.json> <service.proto> [spec.json]
  const args = process.argv.slice(2).filter((a) => !a.startsWith("--"));
  if (args.length === 2 || args.length === 3) {
    permissionsRaw = fs.readFileSync(args[0], "utf-8");
    protoSource = fs.readFileSync(args[1], "utf-8");
    if (args[2]) specRaw = fs.readFileSync(args[2], "utf-8");
  } else if (args.length === 0) {
    console.error("Fetching permissions from GitHub...");
    [permissionsRaw, protoSource] = await Promise.all([
      fetchFile(PERMISSIONS_URL),
      fetchFile(SERVICE_PROTO_URL),
    ]);
  } else {
    throw new Error(
      "Pass <custom_role_permissions.json> <service.proto> [spec.json], or no arguments."
    );
  }
  if (!specRaw) specRaw = await fetchPublic(SPEC_URL);

  const permissionsData = JSON.parse(permissionsRaw);
  const { nonPublicPermissions, routes } = parseServiceProto(protoSource);
  const apiLinks = buildApiLinks(JSON.parse(specRaw));
  const table = buildTable(
    permissionsData.permissions,
    nonPublicPermissions,
    apiLinks,
    routes
  );

  if (process.argv.includes("--write")) {
    const outPath = path.join(
      __dirname,
      "..",
      "docs",
      "cloud",
      "manage-access",
      "_custom_role_permissions_table.mdx"
    );
    fs.writeFileSync(outPath, table);
    console.error(`Wrote ${outPath}`);
  } else {
    process.stdout.write(table);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
