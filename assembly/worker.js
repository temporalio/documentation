#!/usr/bin/env node
import { Worker, NativeConnection } from "@temporalio/worker";
import * as activities from "./activities/index.js";
import fs from "fs-extra";
import path from "path";

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
    const cert = await fs.readFile("./secure/docs-assembly.pem");
    const key = await fs.readFile("./secure/docs-assembly.key");
    const connection = await NativeConnection.connect({
      address: "docs-assembly.a2dd6.tmprl.cloud",
      tls: {
        clientCertPair: {
          crt: cert,
          key: key,
        },
      },
    });

    const data = await fs.readJSON("./secure/cloud-connection.json");
    const worker = await Worker.create({
      connection,
      namespace: "docs-assembly.a2dd6",
      workflowsPath: path.resolve("./workflows/fullAssembly.js"),
      activities,
      taskQueue: `docs-assembly-${data.unique_id}`,
    });
    await worker.run();
  }

  async function useLocal() {
    const worker = await Worker.create({
      workflowsPath: path.resolve("./workflows/fullAssembly.js"),
      activities,
      taskQueue: `docs-assembly`,
    });
    await worker.run();
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
