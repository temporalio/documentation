The [Worker Process](/docs/concepts/what-is-a-worker-process) is where Workflow Functions and Activity Functions are executed.
Each [Worker Entity](/docs/concepts/what-is-a-worker-entity) in the Worker Process must register the exact Workflow Types and Activity Types it may execute.
Each Worker Entity must also associate itself with exactly one [Task Queue](/docs/concepts/what-is-a-task-queue).
Each Worker Entity polling the same Task Queue must be registered with the same Workflow Types and Activity Types.
