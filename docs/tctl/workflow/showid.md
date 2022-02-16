---
id: showid
title: tctl workflow showid
sidebar_label: showid
description: How to show Workflow History for a specified Workflow Id and optional Run Id using tctl.
tags:
  - reference
  - tctl
---

The `tctl workflow showid` command shows the Workflow Execution Event History for the specified [Workflow Id](/docs/concepts/what-is-a-workflow-id) and optional [Run Id](/docs/concepts/what-is-a-run-id).

`tctl workflow showid <workflow_id> [<run_id>] [<modifiers>]`

This command is a shortcut for `tctl workflow show --workflow_id <workflowid> [--run_id <runid>]`.

Example:

```bash
tctl workflow showid <run_id>
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

The following modifiers control the behavior of the command.

### `--print_datetime`

How to print the timestamp.

Alias: `--pdt`

**Example**

```
tctl workflow showid <workflow_id> --print_datetime
```

### `--print_raw_time`

How to print the raw timestamp.

Alias: `--prt`

**Example**

```
tctl workflow showid <workflow_id> --print_raw_time
```

### `--output_filename`

How to serialize an event to a file.

Alias: `--of`

**Example**

```
tctl workflow showid <workflow_id> --output_filename <filename>
```

### `--print_full`

How to print full event details.

Alias: `--pf`

**Example**

```
tctl workflow showid <workflow_id> --print_full
```

### `--print_event_version`

How to print the event version.

Alias: `--pev`

**Example**

```
tctl workflow showid <workflow_id> --print_event_version
```

### `--event_id`

How to print the details of a specified event.
The default value is 0.

Alias: `--eid`

**Example**

```
tctl workflow showid <workflow_id> --event_id <id>
```

### `--max_field_length`

How to specify the maximum length for each attribute field.
The default value is 500.

Alias: `--maxl`

**Example**

```
tctl workflow showid <workflow_id> --max_field_length <length>
```

### `--reset_points_only`

How to show only events that are eligible for reset.

**Example**

```
tctl workflow showid <workflow_id> --reset_points_only
```
