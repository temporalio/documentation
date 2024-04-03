#!/usr/bin/env node
const { Connection, Client } = require("@temporalio/client");
const fs = require("fs-extra");
const path = require("path");

async function run() {
  const args = process.argv.slice(2);
  let cloud = false;
  let coverage = false;
  let debug = false;
  let cli = false;
  let samples = false;

  for (const arg of args) {
    if (arg == "--cloud") {
      cloud = true;
    }
    if (arg == "--coverage") {
      coverage = true;
    }
    if (arg == "--debug") {
      debug = true;
    }
    if (arg == "--cli") {
      cli = true;
    }
    if (arg == "--samples") {
      samples = true;
    }
  }

  const rootDir = path.resolve();
  const params = {
    rootDir: rootDir,
    assemblyDir: "assembly",
    runCoverageUpdate: coverage,
    debug: debug,
    cli: cli,
    samples: samples,
  };

  let result = "";
  if (cloud) {
    result = await useCloud(params);
  } else {
    result = await useLocal(params);
  }
  console.log(result);
  return;
}

async function useCloud(params) {
  const cert = await fs.readFile("./assembly/secure/docs-assembly.pem");
  const key = await fs.readFile("./assembly/secure/docs-assembly.key");
  const data = await fs.readJSON("./assembly/secure/cloud-connection.json");
  console.log(data);
  const connection = await Connection.connect({
    address: data.address,
    tls: {
      clientCertPair: {
        crt: cert,
        key: key,
      },
    },
  });
  const client = new Client({
    connection,
    namespace: data.namespace,
  });

  const result = await client.workflow.execute("fullAssembly", {
    taskQueue: `docs-assembly-${data.unique_id}`,
    workflowId: `docs-full-assembly-${data.unique_id}`,
    args: [params],
  });
  return result;
}

async function useLocal(params) {
  const connection = await Connection.connect({});
  const client = new Client({
    connection,
  });
  const result = await client.workflow.execute("fullAssembly", {
    taskQueue: `docs-assembly`,
    workflowId: `docs-full-assembly`,
    args: [params],
  });
  return result;
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
