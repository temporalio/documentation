#!/usr/bin/env node
import {Worker} from "@temporalio/worker";
import * as activities from "./activities/index.js";
import path from "path";

async function run() {
  const worker = await Worker.create({
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
