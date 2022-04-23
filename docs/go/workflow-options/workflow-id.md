**How to set a custom Workflow Id in Go**

- Type: `string`
- Default: System generated UUID

```go
workflowOptions := client.StartWorkflowOptions{
  ID: "Your-Custom-Workflow-Id",
  // ...
}
workflowRun, err := c.ExecuteWorkflow(context.Background(), workflowOptions, YourWorkflowDefinition)
if err != nil {
  // ...
}
```
