---
id: execute
title: tctl workflow execute
sidebar_label: execute
description: How to start a new Workflow Execution and get Workflow progress using tctl.
tags:
  - reference
  - tctl
---

The `tctl workflow execute` command starts a new [Workflow Execution](/concepts/what-is-a-workflow-execution) and shows its progress until completion.

The command is entered in the following format:

`tctl workflow execute [modifiers]`

Single quotes (`''`) are used to wrap input as JSON.

The following modifiers control the behavior of the command.

### `--task-queue`

Specify a [Task Queue](/concepts/what-is-a-task-queue).

Alias: `--tq`

**Example**

```bash
tctl workflow execute --task-queue <value>
```

### `--workflow-id`

Specify a [Workflow Id](/concepts/what-is-a-workflow-id).

Alias: `--wid`

**Example**

```bash
tctl workflow execute --workflow-id <value>
```

### `--workflow-type`

Specify the name of a [Workflow Type](/concepts/what-is-a-workflow-type).

Alias: `--wt`

**Example**

```bash
tctl workflow execute --workflow-type <value>
```

### `--execution-timeout`

Specify the [Start-To-Close Timeout](/concepts/what-is-a-start-to-close-timeout) of the [Workflow Execution](/concepts/what-is-a-workflow-execution) in seconds.
The default value is 0.

Alias: `--et`

**Example**

```bash
tctl workflow execute --execution-timeout <value>
```

### `--workflow-task-timeout`

Specify the [Start-To-Close Timeout](/concepts/what-is-a-start-to-close-timeout) of the [Workflow Task](/concepts/what-is-a-workflow-task) in seconds.
The default value is 10.

Alias: `--wtt`

**Example**

```bash
tctl workflow execute --workflow-task-timeout <value>
```

### `--cron`

Specify a [Cron Schedule](/concepts/what-is-a-temporal-cron-job/#cron-schedules).

**Example**

```bash
tctl workflow execute --cron <value>
```

### `--workflowidreusepolicy`

Specify a [Workflow Id Reuse Policy](/concepts/what-is-a-workflow-id-reuse-policy).
Configure if the same [Workflow Id](/concepts/what-is-a-workflow-id) is allowed for use in new [Workflow Execution](/concepts/what-is-a-workflow-execution).

Values: `AllowDuplicate`, `AllowDuplicateFailedOnly`, `RejectDuplicate`

**Examples**

```bash
tctl workflow execute --workflowidreusepolicy AllowDuplicate
tctl workflow execute --workflowidreusepolicy AllowDuplicateFailedOnly
tctl workflow execute --workflowidreusepolicy RejectDuplicate
```

### `--input`

Pass input for the Workflow.
Input must be in JSON format.
For multiple JSON objects, pass each in a separate `--input` option. Use `null` for null values.

Alias: `-i`

**Example**

```bash
tctl workflow execute --input <value>
```

### `--input-file`

Pass input for the Workflow from a JSON file.
For multiple JSON objects, concatenate them and use spaces or newline characters as separators.
Input from the command line overwrites input from the file.

Alias: `--if`

**Example**

```bash
tctl workflow execute --input-file <value>
```

### `--memo-key`

Pass a key for a memo.
For multiple keys, concatenate them and use spaces as separators.

**Example**

```bash
tctl workflow execute --memo-key <value>
```

### `--memo`

Pass a memo.
A memo is information in JSON format that can be shown when the Workflow is listed.
For multiple memos, concatenate them and use spaces as separators.
The order must match the order of keys in `--memo-key`.

**Example**

```bash
tctl workflow execute --memo <value>
```

### `--memo-file`

Pass information for a memo from a JSON file.
For multiple JSON objects, concatenate them and use spaces or newline characters as separators.
The order must match the order of keys in `--memo-key`.

**Example**

```bash
tctl workflow execute --memo-file <value>
```

### `--search-attr-key`

Specify a [Search Attribute](/concepts/what-is-a-search-attribute) key.
For multiple keys, concatenate them and use pipes (`|`) as separators.

To list valid keys, use the `tctl cluster get-search-attr` command.

**Example**

```bash
tctl workflow execute --search-attr-key <key>
```

### `--search-attr-value`

Specify a [Search Attribute](/concepts/what-is-a-search-attribute) value.
For multiple values, concatenate them and use pipes (`|`) as separators.
If a value is an array, use JSON format, such as `["a","b"]`, `[1,2]`, `["true","false"]`, or `["2022-06-07T17:16:34-08:00","2022-06-07T18:16:34-08:00"]`.

To list valid keys and value types, use the `tctl cluster get-search-attr` command.

**Example**

```bash
tctl workflow execute --search-attr-value <value>
```

### `--show-detail`

Get event details.

Alias: `--sd`

**Example**

```bash
tctl workflow execute --show-detail
```

### `--max-field-length`

Specify the maximum length for each attribute field.
The default value is 0.

Alias: `--maxl`

**Example**

```bash
tctl workflow execute --max-field-length <length>
```
