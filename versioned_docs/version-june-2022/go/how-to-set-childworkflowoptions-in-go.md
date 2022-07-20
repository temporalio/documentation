---
id: how-to-set-childworkflowoptions-in-go
title: How to set ChildWorkflowOptions in Go
sidebar_label: ChildWorkflowOptions
description: Used to set all Child Workflow Execution specific options
tags:
  - go
  - developer-guide
---

Used to set all child Workflow specific options

| Field                    | Description                                                                       | Type                   |
| ------------------------ | --------------------------------------------------------------------------------- | ---------------------- |
| Namespace                | Set the namespace of the Child Workflow Execution                                 | string                 |
| WorkflowID               | Set the Id of the Child Workflow to be scheduled                                  | string                 |
| TaskQueue                | Set Task Queue that the child Workflow needs to be scheduled on                   | string                 |
| WorkflowExecutionTimeout | Set the end to end timeout for the child Workflow execution including retries     | time.Duration          |
| WorkflowRunTimeout       | Set the timeout for a single run of the child Workflow execution                  | time.Duration          |
| WorkflowTaskTimeout      | Set the maximum execution time of a single Workflow Task                          | time.Duration          |
| WaitForCancellation      | Set to wait for canceled child Workflow to be ended                               | bool                   |
| WorkflowIDReusePolicy    | Set if server allow reuse of Workflow Id                                          | WorkflowIdReusePolicy  |
| RetryPolicy              | Set how to retry child Workflow if error happens                                  | RetryPolicy            |
| CronSchedule             | Set the cron schedule for child Workflow                                          | string                 |
| Memo                     | Set non-indexed info that will be shown in list child Workflow                    | map[string]interface{} |
| SearchAttributes         | Set indexed info that can be used in query of List/Scan/Count child Workflow APIs | map[string]interface{} |
| ParentClosePolicy        | Set policy to decide what to do for the child when the parent closes              | ParentClosePolicy      |

### Parent Close Policy

import ParentClosePolicy from './how-to-set-a-parent-close-policy-in-go.md'

<ParentClosePolicy/>
