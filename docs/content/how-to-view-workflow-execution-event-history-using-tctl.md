---
id: how-to-view-workflow-execution-event-history-using-tctl
title: How to view the Event History of a Workflow Execution using tctl
description: Use the `tctl workflow showid` command to view the Event History of a Workflow Execution.
tags:
  - tctl
  - event-history
---

Use the following command to view the Event History of a Workflow Execution:

```bash
tctl workflow showid <Run Id>
```

Example:

```bash
tctl workflow showid 08c0259f-c1d5-41d9-b51f-8c70c203ccca
```

Example output:

```text
  1  WorkflowExecutionStarted    {WorkflowType:{Name:HelloWorld}, ParentInitiatedEventId:0,
                                  TaskQueue:{Name:HelloWorldTaskQueue, Kind:Normal},
                                  Input:[Temporal], WorkflowExecutionTimeout:1h0m0s,
                                  WorkflowRunTimeout:1h0m0s, WorkflowTaskTimeout:10s,
                                  Initiator:Unspecified, LastCompletionResult:[],
                                  OriginalExecutionRunId:f0c04163-833f-490b-99a9-ee48b6199213,
                                  Identity:tctl@z0mb1e,
                                  FirstExecutionRunId:f0c04163-833f-490b-99a9-ee48b6199213,
                                  Attempt:1, WorkflowExecutionExpirationTime:2020-10-13
                                  21:41:06.349 +0000 UTC, FirstWorkflowTaskBackoff:0s}
  2  WorkflowTaskScheduled       {TaskQueue:{Name:HelloWorldTaskQueue,
                                  Kind:Normal},
                                  StartToCloseTimeout:10s, Attempt:1}
  3  WorkflowTaskStarted         {ScheduledEventId:2, Identity:15079@z0mb1e,
                                  RequestId:731f7b41-5ae4-42e4-9695-ecd857d571f1}
  4  WorkflowTaskCompleted       {ScheduledEventId:2,
                                  StartedEventId:3,
                                  Identity:15079@z0mb1e}
  5  WorkflowExecutionCompleted  {Result:[],
                                  WorkflowTaskCompletedEventId:4}
```
