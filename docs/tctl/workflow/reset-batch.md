---
id: reset-batch
title: tctl workflow reset-batch
sidebar_label: reset-batch
description: How to reset a batch of Workflow Executions using tctl.
tags:
  - reference
  - tctl
---

The `tctl workflow reset-batch` command resets a batch of [Workflow Executions](/concepts/what-is-a-workflow-execution) by [`resetType`](#resettype).

Resetting a Workflow allows the process to be resumed from a certain point without losing your parameters or Event History.

`tctl workflow reset-batch <modifiers>`

The following modifiers control the behavior of the command.

### `--dry-run`

Simulate a reset without resetting any [Workflow Executions](/concepts/what-is-a-workflow-execution).
Output is logged to `stdout`.

**Example**

```bash
tctl workflow reset-batch --dry-run
```

### `--exclude-file`

Provide an input file that specifies [Workflow Executions](/concepts/what-is-a-workflow-execution) to exclude from resetting.

Each line contains one [Workflow Id](/concepts/what-is-a-workflow-id).

**Example**

```bash
tctl workflow reset-batch --exclude-file <value>
```

### `--input-file`

Provide an input file that specifies [Workflow Execution](/concepts/what-is-a-workflow-execution) to reset.

Each line contains one [Workflow Id](/concepts/what-is-a-workflow-id) as the base Run and, optionally, a [Run Id](/concepts/what-is-a-run-id).
If a Run Id is not specified, the current Run Id is used.

Alias: `--if`

**Example**

```bash
tctl workflow reset-batch --input-file <value>
```

### `--input-parallism`

Specify the number of goroutines to run in parallel.
Each goroutine processes one line for every second.
The default is 1.

**Example**

```bash
tctl workflow reset-batch --input-parallism <value>
```

### `--non-deterministic-error`

Indicate that a [Workflow Execution](/concepts/what-is-a-workflow-execution) should be reset only if its last event is `WorkflowTaskFailed` with a nondeterministic error.

**Example**

```bash
tctl workflow reset-batch --only-non-deterministic
```

### `--query`

Specify an SQL-like visibility query of [Search Attributes](/concepts/what-is-a-search-attribute) describing the [Workflow Executions](/concepts/what-is-a-workflow-execution) to reset.

Alias: `-q`

**Example**

```bash
tctl workflow reset-batch --query <value>
```

### `--reason`

Specify a reason for resetting the [Workflow Executions](/concepts/what-is-a-workflow-execution).

**Example**

```bash
tctl workflow reset-batch --reason <value>
```

### `--reset-bad-binary-checksum`

Specify the binary checksum when using `--reset-type BadBinary`.

**Example**

```bash
tctl workflow reset-batch --reset-bad-binary-checksum <value>
```

### `--reset-type`

Specify the event type to which you want to reset.

| Value                | Description                                                 |
| -------------------- | ----------------------------------------------------------- |
| `FirstWorkflowTask`  | Reset to the beginning of the Event History.                |
| `LastWorkflowTask`   | Reset to the end of the Event History.                      |
| `LastContinuedAsNew` | Reset to the end of the Event History for the previous Run. |
| `BadBinary`          | Reset to the point where a bad binary was used.             |

**Example**

```bash
tctl workflow reset-batch --reset-type <value>
```

### `--skip-current-open`

Indicate that a [Workflow Execution](/concepts/what-is-a-workflow-execution) should be skipped if the current Run is open for the same [Workflow Id](/concepts/what-is-a-workflow-id) as the base Run.

**Example**

```bash
tctl workflow reset-batch --skip-current-open
```

### `--skip-base-is-not-current`

Indicate that a [Workflow Execution](/concepts/what-is-a-workflow-execution) should be skipped if the base Run is not the current Run.

**Example**

```bash
tctl workflow reset-batch --skip-base-is-not-current
```
