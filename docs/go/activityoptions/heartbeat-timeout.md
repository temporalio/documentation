Set the `HeartbeatTimeout` field to enforce the maximum time ([Heartbeat Timeout](/docs/concepts/what-is-a-heartbeat-timeout)) between [Activity Heartbeats](/docs/concepts/what-is-an-activity-heartbeat).

- Type: `time.Duration`
- Default: `nil`

```go
activityoptions := workflow.ActivityOptions{
  HeartbeatTimeout: 10 * time.Second,
}
ctx = workflow.WithActivityOptions(ctx, activityoptions)
var yourActivityResult YourActivityResult
err = workflow.ExecuteActivity(ctx, YourActivityDefinition, yourActivityParam).Get(ctx, &yourActivityResult)
if err != nil {
  // ...
}
```
