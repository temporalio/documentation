---
id: how-to-set-childworkflowoptions-in-go
title: How to set ChildWorkflowOptions in Go
sidebar_label: ChildWorkflowOptions
description: Used to set all Child Workflow Execution specific options
tags:
  - go
  - developer-guide
---

Create an instance of [`workflow.ChildWorkflowOptions`](https://pkg.go.dev/go.temporal.io/sdk/workflow#ChildWorkflowOptions).
The Child Workflow Options are then applied to the the instance of `workflow.Context` by using the `WithChildOptions` API, which is then passed to the `ExecuteChildWorkflow()` call.

| Field                    | Description                                                                       | Type                   |
| ------------------------ | --------------------------------------------------------------------------------- | ---------------------- |
| Namespace                | Set the namespace of the child workflow                                           | string                 |
| WorkflowID               | Set the id of the child workflow to be scheduled                                  | string                 |
| TaskQueue                | Set task queue that the child workflow needs to be scheduled on                   | string                 |
| WorkflowExecutionTimeout | Set the end to end timeout for the child workflow execution including retries     | time.Duration          |
| WorkflowRunTimeout       | Set the timeout for a single run of the child workflow execution                  | time.Duration          |
| WorkflowTaskTimeout      | Set the maximum execution time of a single Workflow Task                          | time.Duration          |
| WaitForCancellation      | Set to wait for canceled child workflow to be ended                               | bool                   |
| WorkflowIDReusePolicy    | Set if server allow reuse of workflow ID                                          | WorkflowIdReusePolicy  |
| RetryPolicy              | Set how to retry child workflow if error happens                                  | RetryPolicy            |
| CronSchedule             | Set the cron schedule for child workflow                                          | string                 |
| Memo                     | Set non-indexed info that will be shown in list child workflow                    | map[string]interface{} |
| SearchAttributes         | Set indexed info that can be used in query of List/Scan/Count child workflow APIs | map[string]interface{} |
| ParentClosePolicy        | Set policy to decide what to do for the child when the parent closes              | ParentClosePolicy      |

### `CronSchedule`

import CronSchedule from './startworkflowoptions/cron-schedule.md'

<CronSchedule/>

### `ParentClosePolicy`

import ParentClosePolicy from './childworkflowoptions/parent-close-policy.md'

<ParentClosePolicy/>
