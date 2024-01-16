import { Worker } from "@temporalio/worker";
import * as activities from "./activities";
import { BACKGROUND_CHECK_TASK_QUEUE } from "./shared";

async function run() {
  // Step 1: Register Workflows and Activities with the Worker and connect to
  // the Temporal server.
  const worker = await Worker.create({
    workflowsPath: require.resolve("./workflow_dacx.ts"),
    activities,
    taskQueue: BACKGROUND_CHECK_TASK_QUEUE,
  });
  // Worker connects to localhost by default and uses console.error for logging.
  // Customize the Worker by passing more options to create():
  // https://typescript.temporal.io/api/classes/worker.Worker
  // If you need to configure server connection parameters, see docs:
  // https://docs.temporal.io/typescript/security#encryption-in-transit-with-mtls

  // Step 2: Start accepting tasks on the BACKGROUND_CHECK_TASK_QUEUE queue
  await worker.run();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
