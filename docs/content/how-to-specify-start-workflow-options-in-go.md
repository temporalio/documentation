---
id: how-to-specify-start-workflow-options-in-go
title: How to specify `StartWorkflowOptions` in Go
description: todo
tags:
  - developer-guide
---

Create an instance of
* Options to configure parameters for starting a workflow execution

| Option | Required | Description | Type |
| --- | --- | --- |
| `ID` | Set the business identifier of the workflow execution | string |
| TaskQueue | Set workflow tasks of the workflow are scheduled on the queue with this name | string |
| WorkflowExecutionTimeout | Set the timeout for duration of workflow execution | time.Duration |
| WorkflowRunTimeout | Set the timeout for duration of a single workflow run | time.Duration |
| WorkflowTaskTimeout | Set the timeout for processing workflow task from the time the worker | time.Duration |
| WorkflowIDReusePolicy | Set if server allow reuse of workflow ID | WorkflowIdReusePolicy |
| WorkflowExecutionErrorWhenAlreadyStarted | Set if Client.ExecuteWorkflow will return an error if the workflow id has already been used | bool |
| RetryPolicy | Set workflow retry policy | RetryPolicy |
| CronSchedule | Set workflow cron schedule | string |
| Memo | Set non-indexed info that will be shown in list workflow | map[string]interface{} |
| SearchAttributes | Set indexed info that can be used in query of List/Scan/Count workflow APIs | map[string]interface{} |

### `ID`


### `TaskQueue`

### `WorkflowExecutionTimeout`
