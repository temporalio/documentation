To create and connect to your Temporal Client, use a new `WorflowClient` the requisite gRPC `Connection`.

```typescript
import { Connection, WorkflowClient } from '@temporalio/client';
const connection = new Connection(); // to configure for production
const client = new WorkflowClient(connection.service);
```

This will create a new connection to the Temporal service.

If you ommit the connection and just call the `new WorkflowClient()`, it creates a default connection that will work locally.

:::note
You will need to configure your connection and Namespace when [deploying to produciton](typescript/security#encryption-in-transit-with-mtls).
:::
