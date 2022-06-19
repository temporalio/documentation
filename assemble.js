#!/usr/bin/env node
const { Connection, WorkflowClient } = require('@temporalio/client');
const path = require('path');

async function run() {
  const connection = new Connection({});

  const client = new WorkflowClient(connection.service, {});

  const rootDir = path.resolve();

  const params = {
    rootDir: rootDir,
    assemblyDir: "assembly",
  }

  const result = await client.execute("fullAssembly", {
    taskQueue: 'docs_assembly',
    workflowId: 'docs_full_assembly',
    args: [params],
  });
  
  console.log(result);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});