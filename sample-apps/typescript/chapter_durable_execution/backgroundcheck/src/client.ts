import { Connection, Client } from '@temporalio/client';
import { backgroundCheck } from './workflows';
import { nanoid } from 'nanoid';

async function run() {
  // Connect to the default Server location
  const connection = await Connection.connect({ address: 'localhost:7233' });
  // In production, pass options to configure TLS and other settings:
  // {
  //   address: 'foo.bar.tmprl.cloud',
  //   tls: {}
  // }

  const client = new Client({
    connection,
    // namespace: 'foo.bar', // connects to 'default' namespace if not specified
  });

  const handle = await client.workflow.start(backgroundCheck, {
    taskQueue: 'background-check',
    args: ['111-222-3333'],
    workflowId: 'workflow-' + nanoid(),
  });
  console.log(`Started workflow ${handle.workflowId}`);

  console.log(await handle.result()); // pass
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
