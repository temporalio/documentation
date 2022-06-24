---
id: run
title: tctl workflow run
sidebar_label: run
description: How to start a new Workflow Execution and get Workflow progress using tctl.
tags:
  - reference
  - tctl
---

The `tctl workflow run` command starts a new [Workflow Execution](/concepts/what-is-a-workflow-execution) and can show Workflow progress.

`tctl workflow run [<modifiers>]`

The following modifiers control the behavior of the command.

### `--taskqueue`

Specify a [Task Queue](/concepts/what-is-a-task-queue).

Alias: `--tq`

**Example**

```bash
tctl workflow run --taskqueue <name>
```

### `--workflow_id`

Specify a [Workflow Id](/concepts/what-is-a-workflow-id).

Aliases: `--wid`, `-w`

**Example**

```bash
tctl workflow run --workflow_id <id>
```

### `--workflow_type`

Specify the name of a [Workflow Type](/concepts/what-is-a-workflow-type).

Alias: `--wt`

**Example**

```bash
tctl workflow run --workflow_type <name>
```

### `--execution_timeout`

Specify the [Start-To-Close Timeout](/concepts/what-is-a-start-to-close-timeout) of the [Workflow Execution](/concepts/what-is-a-workflow-execution) in seconds.
The default value is 0.

Alias: `--et`

**Example**

```bash
tctl workflow run --execution_timeout <seconds>
```

### `--workflow_task_timeout`

Specify the [Start-To-Close Timeout](/concepts/what-is-a-start-to-close-timeout) of the [Workflow Task](/concepts/what-is-a-workflow-task) in seconds.
The default value is 10.

Alias: `--wtt`

**Example**

```bash
tctl workflow run --workflow_task_timeout <seconds>
```

### `--cron`

Specify a [Cron Schedule](/concepts/what-is-a-temporal-cron-job/#cron-schedules).

**Example**

```bash
tctl workflow run --cron <string>
```

### `--workflowidreusepolicy`

Specify a [Workflow Id Reuse Policy](/concepts/what-is-a-workflow-id-reuse-policy).
Configure if the same [Workflow Id](/concepts/what-is-a-workflow-id) is allowed for use in new [Workflow Execution](/concepts/what-is-a-workflow-execution).

Values: `AllowDuplicate`, `AllowDuplicateFailedOnly`, `RejectDuplicate`

**Examples**

```bash
tctl workflow run --workflowidreusepolicy AllowDuplicate
tctl workflow run --workflowidreusepolicy AllowDuplicateFailedOnly
tctl workflow run --workflowidreusepolicy RejectDuplicate
```

### `--input`

Pass input for the Workflow.
Input must be in JSON format.
For multiple JSON objects, pass each in a separate `--input` option. Use `null` for null values.

Alias: `-i`

**Example**

```bash
tctl workflow run --input <json>
```

### `--input_file`

Pass input for the Workflow from a JSON file.
For multiple JSON objects, concatenate them and use spaces or newline characters as separators.
Input from the command line overwrites input from the file.

Alias: `--if`

**Example**

```bash
tctl workflow run --input_file <filename>
```

### `--memo_key`

Pass a key for a memo.
For multiple keys, concatenate them and use spaces as separators.

**Example**

```bash
tctl workflow run --memo_key <key>
```

### `--memo`

Pass a memo.
A memo is information in JSON format that can be shown when the Workflow is listed.
For multiple memos, concatenate them and use spaces as separators.
The order must match the order of keys in `--memo_key`.

**Example**

```bash
tctl workflow run --memo <json>
```

### `--memo_file`

Pass information for a memo from a JSON file.
For multiple JSON objects, concatenate them and use spaces or newline characters as separators.
The order must match the order of keys in `--memo_key`.

**Example**

```bash
tctl workflow run --memo_file <filename>
```

### `--search_attr_key`

Specify a [Search Attribute](/concepts/what-is-a-search-attribute) key.
For multiple keys, concatenate them and use pipes (`|`) as separators.

To list valid keys, use the `tctl cluster get-search-attr` command.

**Example**

```bash
tctl workflow run --search_attr_key <key>
```

### `--search_attr_value`

Specify a [Search Attribute](/concepts/what-is-a-search-attribute) value.
For multiple values, concatenate them and use pipes (`|`) as separators.
If a value is an array, use JSON format, such as `["a","b"]`, `[1,2]`, `["true","false"]`, or `["2022-06-07T17:16:34-08:00","2022-06-07T18:16:34-08:00"]`.

To list valid keys and value types, use the `tctl cluster get-search-attr` command.

**Example**

```bash
tctl workflow run --search_attr_value <value>
```

### `--show_detail`

Get event details.

Alias: `--sd`

**Example**

```bash
tctl workflow run --show_detail
```

### `--max_field_length`

Specify the maximum length for each attribute field.
The default value is 0.

Alias: `--maxl`

**Example**

```bash
tctl workflow run --max_field_length <length>
```
