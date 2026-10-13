#!/usr/bin/env node

const https = require("https");
const fs = require("fs");
const path = require("path");

const GITHUB_CONTENTS_URL =
  "https://api.github.com/repos/temporalio/saas-proto/contents";
const PERMISSIONS_URL = `${GITHUB_CONTENTS_URL}/protogen/custom_role_permissions.json`;
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

const CLOUD_OPS_API_LINKS = {
  GetAccount: "https://saas-api.tmprl.cloud/docs/httpapi.html#tag/account/GET/cloud/account",
  UpdateAccount: "https://saas-api.tmprl.cloud/docs/httpapi.html#tag/account/POST/cloud/account",
  GetUsage: "https://saas-api.tmprl.cloud/docs/httpapi.html#tag/account/GET/cloud/usage",
  GetAuditLogs: "https://saas-api.tmprl.cloud/docs/httpapi.html#tag/account/GET/cloud/audit-logs",
  ValidateAccountAuditLogSink: "https://saas-api.tmprl.cloud/docs/httpapi.html#tag/account/POST/cloud/audit-log-sink-validate",
  CreateAccountAuditLogSink: "https://saas-api.tmprl.cloud/docs/httpapi.html#tag/account/POST/cloud/audit-log-sinks",
  GetAccountAuditLogSink: "https://saas-api.tmprl.cloud/docs/httpapi.html#tag/account/GET/cloud/audit-log-sinks/%7Bname%7D",
  GetAccountAuditLogSinks: "https://saas-api.tmprl.cloud/docs/httpapi.html#tag/account/GET/cloud/audit-log-sinks",
  UpdateAccountAuditLogSink: "https://saas-api.tmprl.cloud/docs/httpapi.html#tag/account/POST/cloud/audit-log-sinks/%7Bspec.name%7D",
  DeleteAccountAuditLogSink: "https://saas-api.tmprl.cloud/docs/httpapi.html#tag/account/DELETE/cloud/audit-log-sinks/%7Bname%7D",
  GetAsyncOperation: "https://saas-api.tmprl.cloud/docs/httpapi.html#tag/operations/GET/cloud/operations/%7BasyncOperationId%7D",
  CreateUser: "https://saas-api.tmprl.cloud/docs/httpapi.html#tag/users/POST/cloud/users",
  GetUser: "https://saas-api.tmprl.cloud/docs/httpapi.html#tag/users/GET/cloud/users/%7BuserId%7D",
  GetUsers: "https://saas-api.tmprl.cloud/docs/httpapi.html#tag/users/GET/cloud/users",
  UpdateUser: "https://saas-api.tmprl.cloud/docs/httpapi.html#tag/users/POST/cloud/users/%7BuserId%7D",
  DeleteUser: "https://saas-api.tmprl.cloud/docs/httpapi.html#tag/users/DELETE/cloud/users/%7BuserId%7D",
  ResendUserInvite: "https://saas-api.tmprl.cloud/docs/httpapi.html#tag/users/POST/cloud/users",
  SetUserNamespaceAccess: "https://saas-api.tmprl.cloud/docs/httpapi.html#tag/users/POST/cloud/namespaces/%7Bnamespace%7D/users/%7BuserId%7D/access",
  GetUserNamespaceAssignments: "https://saas-api.tmprl.cloud/docs/httpapi.html#tag/users/GET/cloud/namespaces/%7Bnamespace%7D/user-assignments",
  CreateNamespace: "https://saas-api.tmprl.cloud/docs/httpapi.html#tag/namespaces/POST/cloud/namespaces",
  GetNamespaces: "https://saas-api.tmprl.cloud/docs/httpapi.html#tag/namespaces/GET/cloud/namespaces",
  GetNamespaceIDs: "https://saas-api.tmprl.cloud/docs/httpapi.html#tag/namespaces/GET/cloud/namespaces",
  GetNamespace: "https://saas-api.tmprl.cloud/docs/httpapi.html#tag/namespaces/GET/cloud/namespaces/%7Bnamespace%7D",
  UpdateNamespace: "https://saas-api.tmprl.cloud/docs/httpapi.html#tag/namespaces/POST/cloud/namespaces/%7Bnamespace%7D",
  DeleteNamespace: "https://saas-api.tmprl.cloud/docs/httpapi.html#tag/namespaces/DELETE/cloud/namespaces/%7Bnamespace%7D",
  RenameCustomSearchAttribute: "https://saas-api.tmprl.cloud/docs/httpapi.html#tag/namespaces/POST/cloud/namespaces/%7Bnamespace%7D/rename-custom-search-attribute",
  UpdateNamespaceTags: "https://saas-api.tmprl.cloud/docs/httpapi.html#tag/namespaces/POST/cloud/namespaces/%7Bnamespace%7D/update-tags",
  GetNamespaceCapacityInfo: "https://saas-api.tmprl.cloud/docs/httpapi.html#tag/namespaces/GET/cloud/namespaces/%7Bnamespace%7D/capacity-info",
  FailoverNamespaceRegion: "https://saas-api.tmprl.cloud/docs/httpapi.html#tag/high-availability/POST/cloud/namespaces/%7Bnamespace%7D/failover-region",
  AddNamespaceRegion: "https://saas-api.tmprl.cloud/docs/httpapi.html#tag/high-availability/POST/cloud/namespaces/%7Bnamespace%7D/add-region",
  DeleteNamespaceRegion: "https://saas-api.tmprl.cloud/docs/httpapi.html#tag/high-availability/DELETE/cloud/namespaces/%7Bnamespace%7D/regions/%7Bregion%7D",
  CreateNamespaceExportSink: "https://saas-api.tmprl.cloud/docs/httpapi.html#tag/export/POST/cloud/namespaces/%7Bnamespace%7D/export-sinks",
  GetNamespaceExportSink: "https://saas-api.tmprl.cloud/docs/httpapi.html#tag/export/GET/cloud/namespaces/%7Bnamespace%7D/export-sinks/%7Bname%7D",
  GetNamespaceExportSinks: "https://saas-api.tmprl.cloud/docs/httpapi.html#tag/export/GET/cloud/namespaces/%7Bnamespace%7D/export-sinks",
  UpdateNamespaceExportSink: "https://saas-api.tmprl.cloud/docs/httpapi.html#tag/export/POST/cloud/namespaces/%7Bnamespace%7D/export-sinks/%7Bspec.name%7D",
  DeleteNamespaceExportSink: "https://saas-api.tmprl.cloud/docs/httpapi.html#tag/export/DELETE/cloud/namespaces/%7Bnamespace%7D/export-sinks/%7Bname%7D",
  ValidateNamespaceExportSink: "https://saas-api.tmprl.cloud/docs/httpapi.html#tag/export/POST/cloud/namespaces/%7Bnamespace%7D/export-sink-validate",
  SetServiceAccountNamespaceAccess: "https://saas-api.tmprl.cloud/docs/httpapi.html#tag/service-accounts/POST/cloud/namespaces/%7Bnamespace%7D/service-accounts/%7BserviceAccountId%7D/access",
  SetUserGroupNamespaceAccess: "https://saas-api.tmprl.cloud/docs/httpapi.html#tag/groups/POST/cloud/namespaces/%7Bnamespace%7D/user-groups/%7BgroupId%7D/access",
  GetRegions: "https://saas-api.tmprl.cloud/docs/httpapi.html#tag/regions/GET/cloud/regions",
  GetRegion: "https://saas-api.tmprl.cloud/docs/httpapi.html#tag/regions/GET/cloud/regions/%7Bregion%7D",
  GetNexusEndpoints: "https://saas-api.tmprl.cloud/docs/httpapi.html#tag/nexus/GET/cloud/nexus/endpoints",
  GetNexusEndpoint: "https://saas-api.tmprl.cloud/docs/httpapi.html#tag/nexus/GET/cloud/nexus/endpoints/%7BendpointId%7D",
  CreateNexusEndpoint: "https://saas-api.tmprl.cloud/docs/httpapi.html#tag/nexus/POST/cloud/nexus/endpoints",
  UpdateNexusEndpoint: "https://saas-api.tmprl.cloud/docs/httpapi.html#tag/nexus/POST/cloud/nexus/endpoints/%7BendpointId%7D",
  DeleteNexusEndpoint: "https://saas-api.tmprl.cloud/docs/httpapi.html#tag/nexus/DELETE/cloud/nexus/endpoints/%7BendpointId%7D",
  GetUserGroups: "https://saas-api.tmprl.cloud/docs/httpapi.html#tag/groups/GET/cloud/user-groups",
  GetUserGroup: "https://saas-api.tmprl.cloud/docs/httpapi.html#tag/groups/GET/cloud/user-groups/%7BgroupId%7D",
  CreateUserGroup: "https://saas-api.tmprl.cloud/docs/httpapi.html#tag/groups/POST/cloud/user-groups",
  UpdateUserGroup: "https://saas-api.tmprl.cloud/docs/httpapi.html#tag/groups/POST/cloud/user-groups/%7BgroupId%7D",
  DeleteUserGroup: "https://saas-api.tmprl.cloud/docs/httpapi.html#tag/groups/DELETE/cloud/user-groups/%7BgroupId%7D",
  AddUserGroupMember: "https://saas-api.tmprl.cloud/docs/httpapi.html#tag/groups/POST/cloud/user-groups/%7BgroupId%7D/members",
  RemoveUserGroupMember: "https://saas-api.tmprl.cloud/docs/httpapi.html#tag/groups/POST/cloud/user-groups/%7BgroupId%7D/remove-member",
  GetUserGroupMembers: "https://saas-api.tmprl.cloud/docs/httpapi.html#tag/groups/GET/cloud/user-groups/%7BgroupId%7D/members",
  GetConnectivityRules: "https://saas-api.tmprl.cloud/docs/httpapi.html#tag/connectivity-rules/GET/cloud/connectivity-rules",
  GetConnectivityRule: "https://saas-api.tmprl.cloud/docs/httpapi.html#tag/connectivity-rules/GET/cloud/connectivity-rules/%7BconnectivityRuleId%7D",
  CreateConnectivityRule: "https://saas-api.tmprl.cloud/docs/httpapi.html#tag/connectivity-rules/POST/cloud/connectivity-rules",
  DeleteConnectivityRule: "https://saas-api.tmprl.cloud/docs/httpapi.html#tag/connectivity-rules/DELETE/cloud/connectivity-rules/%7BconnectivityRuleId%7D",
  CreateBillingReport: "https://saas-api.tmprl.cloud/docs/httpapi.html#tag/account/POST/cloud/billing-reports",
  GetBillingReport: "https://saas-api.tmprl.cloud/docs/httpapi.html#tag/account/GET/cloud/billing-reports/%7BbillingReportId%7D",
};

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

// Returns the custom role permission strings used only by RPCs marked as not
// public (see NON_PUBLIC_MARKERS) in service.proto. A permission shared with a
// public RPC stays documented.
function findNonPublicPermissions(protoSource) {
  const nonPublic = new Set();
  const publicPerms = new Set();
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

    if (/^rpc\s+\w+\s*\(/.test(trimmed)) {
      inRpc = true;
      rpcIsNonPublic = comments.some((c) =>
        NON_PUBLIC_MARKERS.some((m) => c.includes(m))
      );
    }
    comments = [];

    const match = trimmed.match(/custom_role_permission:\s*"([^"]+)"/);
    if (inRpc && match) {
      (rpcIsNonPublic ? nonPublic : publicPerms).add(match[1]);
    }
  }
  for (const permission of publicPerms) nonPublic.delete(permission);
  return nonPublic;
}

function buildTable(permissions, nonPublicPermissions) {
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
      const apiLink = CLOUD_OPS_API_LINKS[perm.method];
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

  // Optional local files: <custom_role_permissions.json> <service.proto>
  const args = process.argv.slice(2).filter((a) => !a.startsWith("--"));
  if (args.length === 2) {
    permissionsRaw = fs.readFileSync(args[0], "utf-8");
    protoSource = fs.readFileSync(args[1], "utf-8");
  } else if (args.length === 0) {
    console.error("Fetching permissions from GitHub...");
    [permissionsRaw, protoSource] = await Promise.all([
      fetchFile(PERMISSIONS_URL),
      fetchFile(SERVICE_PROTO_URL),
    ]);
  } else {
    throw new Error(
      "Pass both <custom_role_permissions.json> and <service.proto>, or neither."
    );
  }

  const permissionsData = JSON.parse(permissionsRaw);
  const nonPublic = findNonPublicPermissions(protoSource);
  const table = buildTable(permissionsData.permissions, nonPublic);

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
