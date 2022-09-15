#!/usr/bin/env node
import {Worker, NativeConnection} from "@temporalio/worker";
import * as activities from "./activities/index.js";
import fs from "fs-extra";
import path from "path";

async function run() {
  const cert = await fs.readFile("./secure/docs-assembly.pem");
  const key = await fs.readFile("./secure/docs-assembly.key");

  const connection = await NativeConnection.connect({
    address: "docs-assembly.a2dd6.tmprl.cloud:7233",
    tls: {
      clientCertPair: {
        crt: cert,
        key: key,
      },
    },
  });

  const worker = await Worker.create({
    connection,
    namespace: "docs-assembly.a2dd6",
    workflowsPath: path.resolve("./workflows/fullAssembly.js"),
    activities,
    taskQueue: "docs_assembly",
  });
  await worker.run();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
