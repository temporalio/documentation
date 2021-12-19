:::note

A single Worker Entity can listen to only one Task Queue.

All Worker Entities listening to the same Task Queue name must be registered to handle the exact same Workflow Types and Activity Types.

If a Worker Entity polls a Task for a Workflow Type or Activity Type it does not know about, it will fail that Task.
However, the failure of the Task will not cause the associated Workflow Execution to fail.

:::
