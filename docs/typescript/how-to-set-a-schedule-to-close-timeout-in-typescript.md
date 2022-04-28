When you call `proxyActivities` in a Workflow Function, you can set a range of ActivityOptions.

Either `scheduleToCloseTimeout` or `scheduleToStartTimeout` must be set.

Type: time.Duration
Default: ∞ (infinity - no limit)

In this example, you can set the `scheduleToCloseTimeout` to 5 m.

```typescript
// Sample of typical options you can set
const { greet } = proxyActivities<typeof activities>({
  scheduleToCloseTimeout: '5m',
  retry: {
    // default retry policy if not specified
    initialInterval: '1s',
    backoffCoefficient: 2,
    maximumAttempts: Infinity,
    maximumInterval: 100 * initialInterval,
    nonRetryableErrorTypes: [],
  },
});
```
