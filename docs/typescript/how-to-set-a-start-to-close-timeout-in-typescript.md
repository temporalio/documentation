When you call `proxyActivities` in a Workflow Function, you can set a range of ActivityOptions.

Either `scheduleToCloseTimeout` or `scheduleToStartTimeout` must be set.

Type: time.Duration
Default: ∞ (infinity - no limit)

In this example, you can set the `startToCloseTimeout` to 30 seconds.

```typescript
// Sample of typical options you can set
const { greet } = proxyActivities<typeof activities>({
  startToCloseTimeout: '30s', // recommended
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
