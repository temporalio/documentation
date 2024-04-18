import { Connection, Client } from "@temporalio/client";
import { nanoid } from "nanoid";

import { backgroundCheckNonDeterministic } from "./workflow_dacx";
import { BACKGROUND_CHECK_TASK_QUEUE } from "./shared";

async function run() {
  // Connect to the default Server location (localhost:7233)
  const connection = await Connection.connect();
  // In production, pass options to configure TLS and other settings:
  // {
  //   address: 'foo.bar.tmprl.cloud',
  //   tls: {}
  // }

  const client = new Client({
    connection,
    // namespace: 'foo.bar', // connects to 'default' namespace if not specified
  });

  const backgroundCheckHandle = await client.workflow.start(backgroundCheckNonDeterministic, {
    // type inference works! args: [name: string]
    args: ["555-55-5555"],
    taskQueue: BACKGROUND_CHECK_TASK_QUEUE,
    // in practice, use a meaningful business id, eg customerId or transactionId
    workflowId: "background-check-non-deterministic" + nanoid(),
  });

  console.log(`Started backgroundCheckNonDeterministic ${backgroundCheckHandle.workflowId}`);

  // optional: wait for client result
  console.log(await backgroundCheckHandle.result());

  const backgroundCheckNonDeterministicHandle = await client.workflow.start(backgroundCheckNonDeterministic, {
    // type inference works! args: [name: string]
    args: ["555-55-5555"],
    taskQueue: BACKGROUND_CHECK_TASK_QUEUE,
    // in practice, use a meaningful business id, eg customerId or transactionId
    workflowId: "background-check-" + nanoid(),
  });

  console.log(`Started workflow ${backgroundCheckNonDeterministicHandle.workflowId}`);

  // optional: wait for client result
  console.log(await backgroundCheckNonDeterministicHandle.result());
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
