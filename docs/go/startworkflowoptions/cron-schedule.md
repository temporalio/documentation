**How to set a Cron Schedule in Go**

- [What is a Temporal Cron Job?](/docs/concepts/what-is-a-temporal-cron-job)

- Type: `string`
- Default: None

```go
workflowOptions := client.StartWorkflowOptions{
  CronSchedule: "15 8 * * *",
  // ...
}
workflowRun, err := c.ExecuteWorkflow(context.Background(), workflowOptions, YourWorkflowDefinition)
if err != nil {
  // ...
}
```

[Sample](https://github.com/temporalio/samples-go/tree/master/cron)
