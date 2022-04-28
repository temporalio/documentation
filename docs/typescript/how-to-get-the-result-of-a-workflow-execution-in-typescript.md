Workflow functions may or may not return a result when they complete.

If you started a Workflow with `handle.start()`, you can choose to wait for the result anytime with handle.result().

```typescript
const handle = client.getHandle(workflowId);
const result = await handle.result();
```

Using a Workflow Handle isn't necessary with `client.execute()`.

Workflows that prematurely end will throw a `WorkflowFailedError` if you call `result()`.

If you call `result()` on a Workflow that prematurely ended for some reason, it throws a [`WorkflowFailedError` error](https://typescript.temporal.io/api/classes/client.workflowfailederror/) that reflects the reason. For that reason, it is recommmened to catch that error.

```typescript
const handle = client.getHandle(workflowId);
try {
  const result = await handle.result();
} catch (err) {
  if (err instanceof WorkflowFailedError) {
    throw new Error('Temporal workflow failed: ' + workflowId, {
      cause: err,
    });
  } else {
    throw new Error('error from Temporal workflow ' + workflowId, {
      cause: err,
    });
  }
}
```
