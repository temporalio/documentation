You can set a Workflow Id in the Client of a Workflow.

```typescript
const handle = await client.start(example, {
  workflowId: 'yourWorkflowId',
  taskQueue: 'yourTaskQueue',
  args: ['your', 'arg', 'uments'],
});
```

This will start a new Client with the given Workflow Id, Task Queue name, and an argument.
