
**How to set a [Start-To-Close Timeout](/docs/concepts/what-is-a-start-to-close-timeout) in Go**

This or `ScheduleToClose` must be set.

- Type: `time.Duration`
- Default: Same as the `ScheduleToCloseTimeout`

```go
activityoptions := workflow.ActivityOptions{
  StartToCloseTimeout: 10 * time.Second,
}
ctx = workflow.WithActivityOptions(ctx, activityoptions)
var yourActivityResult YourActivityResult
err = workflow.ExecuteActivity(ctx, YourActivityDefinition, yourActivityParam).Get(ctx, &yourActivityResult)
if err != nil {
  // ...
}
```
