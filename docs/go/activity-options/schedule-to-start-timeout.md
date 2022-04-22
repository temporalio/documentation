**How to set a [Schedule-To-Start Timeout](/docs/concepts/what-is-a-schedule-to-start-timeout) in Go**

- Type: `time.Duration`
- Default: ∞ (infinity - no limit)

```go
activityoptions := workflow.ActivityOptions{
  ScheduleToStartTimeout: 10 * time.Second,
}
ctx = workflow.WithActivityOptions(ctx, activityoptions)
var yourActivityResult YourActivityResult
err = workflow.ExecuteActivity(ctx, YourActivityDefinition, yourActivityParam).Get(ctx, &yourActivityResult)
if err != nil {
  // ...
}
```
