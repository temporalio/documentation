#!/usr/bin/env node
const {Connection, WorkflowClient} = require("@temporalio/client");
const fs = require("fs-extra");
const path = require("path");

async function run() {
  const args = process.argv.slice(2);
  switch (args[0]) {
    case "--cloud":
      await useCloud();
      break;
    default:
      await useLocal();
  }

  async function useCloud() {
    const cert = await fs.readFile("./assembly/secure/docs-assembly.pem");
    const key = await fs.readFile("./assembly/secure/docs-assembly.key");
    const connection = await Connection.connect({
      address: "docs-assembly.a2dd6.tmprl.cloud:7233",
      tls: {
        clientCertPair: {
          crt: cert,
          key: key,
        },
      },
    });
    const client = new WorkflowClient({
      connection,
      namespace: "docs-assembly.a2dd6",
    });
    const rootDir = path.resolve();
    const params = {
      rootDir: rootDir,
      assemblyDir: "assembly",
    };
    const data = await fs.readJSON("./assembly/secure/uniqueId.json");
    const result = await client.execute("fullAssembly", {
      taskQueue: `docs-assembly-${data.unique_id}`,
      workflowId: `docs-full-assembly-${data.unique_id}`,
      args: [params],
    });
    console.log(result);
  }

  async function useLocal() {
    const connection = await Connection.connect({});
    const client = new WorkflowClient({
      connection,
    });
    const rootDir = path.resolve();
    const params = {
      rootDir: rootDir,
      assemblyDir: "assembly",
    };
    const result = await client.execute("fullAssembly", {
      taskQueue: `docs-assembly`,
      workflowId: `docs-full-assembly`,
      args: [params],
    });
    console.log(result);
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
