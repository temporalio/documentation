---
id: reset-batch
title: tctl workflow reset-batch
sidebar_label: reset-batch
description: How to reset a batch of Workflow Executions using tctl.
tags:
  - reference
  - tctl
---

The `tctl workflow reset-batch` command resets a batch of [Workflow Executions](/concepts/what-is-a-workflow-execution) by `resetType`.

See also [`tctl workflow reset`](/tctl/workflow/reset).

`tctl workflow reset-batch [<modifiers>]`

The following modifiers control the behavior of the command.

### `--input_file`

Provide an input file that specifies [Workflow Execution](/concepts/what-is-a-workflow-execution) to reset.

Each line contains one [Workflow Id](/concepts/what-is-a-workflow-id) as the base Run and, optionally, a [Run Id](/concepts/what-is-a-run-id).
If a Run Id is not specified, the current Run Id is used.

Alias: `--if`

**Example**

```bash
tctl workflow reset-batch --input_file <filename>
```

### `--query`

Specify an SQL-like query of [Search Attributes](/concepts/what-is-a-search-attribute) describing the [Workflow Executions](/concepts/what-is-a-workflow-execution) to reset.

Alias: `-q`

**Example**

```bash
tctl workflow reset-batch --query <value>
```

### `--exclude_file`

Provide an input file that specifies [Workflow Executions](/concepts/what-is-a-workflow-execution) to exclude from resetting.

Each line contains one [Workflow Id](/concepts/what-is-a-workflow-id).

**Example**

```bash
tctl workflow reset-batch --exclude_file <filename>
```

### `--input_separator`

Specify the separator for the input file.
The default is a tab (`\t`).

**Example**

```bash
tctl workflow reset-batch --input_separator <string>
```

### `--reason`

Specify a reason for resetting the [Workflow Executions](/concepts/what-is-a-workflow-execution).

<!-- Alias: `--re` -->

**Example**

```bash
tctl workflow reset-batch --reason <string>
```

### `--input_parallism`

Specify the number of goroutines to run in parallel.
Each goroutine processes one line for every second.
The default is 1.

**Example**

```bash
tctl workflow reset-batch --input_parallism <value>
```

### `--skip_current_open`

Indicate that a [Workflow Execution](/concepts/what-is-a-workflow-execution) should be skipped if the current Run is open for the same [Workflow Id](/concepts/what-is-a-workflow-id) as the base Run.

**Example**

```bash
tctl workflow reset-batch --skip_current_open
```

### `--skip_base_is_not_current`

Indicate that a [Workflow Execution](/concepts/what-is-a-workflow-execution) should be skipped if the base Run is not the current Run.

**Example**

```bash
tctl workflow reset-batch --skip_base_is_not_current
```

### `--only_non_deterministic`

Indicate that a [Workflow Execution](/concepts/what-is-a-workflow-execution) should be reset only if its last event is `WorkflowTaskFailed` with a nondeterministic error.

**Example**

```bash
tctl workflow reset-batch --only_non_deterministic
```

### `--dry_run`

Simulate use of the `tctl workflow reset-batch` command without resetting any [Workflow Executions](/concepts/what-is-a-workflow-execution).
Output is logged to `stdout`.

**Example**

```bash
tctl workflow reset-batch --dry_run
```

### `--reset_type`

Specify the event type to which you want to reset.

| Value                | Description                                                 |
| -------------------- | ----------------------------------------------------------- |
| `FirstWorkflowTask`  | Reset to the beginning of the Event History.                |
| `LastWorkflowTask`   | Reset to the end of the Event History.                      |
| `LastContinuedAsNew` | Reset to the end of the Event History for the previous Run. |
| `BadBinary`          | Reset to the point where a bad binary was used.             |

**Example**

```bash
tctl workflow reset-batch --reset_type <value>
```

### `--reset_bad_binary_checksum`

Specify the binary checksum when using `--reset_type BadBinary`.

**Example**

```bash
tctl workflow reset-batch --reset_bad_binary_checksum <value>
```
