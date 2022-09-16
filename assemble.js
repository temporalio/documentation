#!/usr/bin/env node
// comment fs package to use local defaults
const fs = require("fs-extra");
const {v4: uuidv4} = require("uuid");

const {Connection, WorkflowClient} = require("@temporalio/client");
const path = require("path");
const {randomInt} = require("crypto");

async function run() {
  // comment cert and key to use local defaults
  const cert = await fs.readFile("./assembly/secure/docs-assembly.pem");
  const key = await fs.readFile("./assembly/secure/docs-assembly.key");

  const connection = await Connection.connect({
    // comment the contents of this object to use local defaults
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
    // comment namespace to use local defaults
    namespace: "docs-assembly.a2dd6",
  });

  const rootDir = path.resolve();

  const params = {
    rootDir: rootDir,
    assemblyDir: "assembly",
  };

  const data = await fs.readJSON("./assembly/secure/uniqueId.json");
  console.log(data);
  const result = await client.execute("fullAssembly", {
    taskQueue: `docs-assembly-${data.unique_id}`,
    workflowId: `docs-full-assembly-${data.unique_id}`,
    args: [params],
  });

  console.log(result);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
