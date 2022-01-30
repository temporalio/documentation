---
id: run
title: tctl workflow run
description: How to start a new Workflow Execution and get Workflow progress using tctl.
tags:
  - reference
  - tctl
---

The `tctl workflow run` command starts a new [Workflow Execution](/docs/content/what-is-a-workflow-execution) and can show Workflow progress.

`tctl workflow run [<modifiers>]`

The following modifiers control the behavior of the command.

### `--taskqueue`

How to specify a [Task Queue](/docs/content/what-is-a-task-queue).

Alias: `--tq`

**Example**

```
tctl workflow run --taskqueue <name>
```

### `--workflow_id`

How to specify a [Workflow Id](/docs/content/what-is-a-workflow-id).

Aliases: `--wid`, `-w`

**Example**

```
tctl workflow run --workflow_id <id>
```

### `--workflow_type`

How to specify the name of a [Workflow Type](/docs/content/what-is-a-workflow-type).

Alias: `--wt`

**Example**

```
tctl workflow run --workflow_type <name>
```

### `--execution_timeout`

How to specify the [Start-To-Close Timeout](/docs/content/what-is-a-start-to-close-timeout) of the [Workflow Execution](/docs/content/what-is-a-workflow-execution) in seconds.
The default value is 0.

Alias: `--et`

**Example**

```
tctl workflow run --execution_timeout <seconds>
```

### `--workflow_task_timeout`

How to specify the [Start-To-Close Timeout](/docs/content/what-is-a-start-to-close-timeout) of the [Workflow Task](/docs/content/what-is-a-workflow-task) in seconds.
The default value is 10.

Alias: `--wtt`

**Example**

```
tctl workflow run --workflow_task_timeout <seconds>
```

### `--cron`

How to specify a [Cron Schedule](/docs/content/what-is-a-temporal-cron-job/#cron-schedules).

**Example**

```
tctl workflow run --cron <string>
```

### `--workflowidreusepolicy`

How to specify a [Workflow Id Reuse Policy](/docs/content/what-is-a-workflow-id-reuse-policy).
Configure if the same [Workflow Id](/docs/content/what-is-a-workflow-id) is allowed for use in new [Workflow Execution](/docs/content/what-is-a-workflow-execution).

Values: `AllowDuplicate`, `AllowDuplicateFailedOnly`, `RejectDuplicate`

**Examples**

```
tctl workflow run --workflowidreusepolicy AllowDuplicate
tctl workflow run --workflowidreusepolicy AllowDuplicateFailedOnly
tctl workflow run --workflowidreusepolicy RejectDuplicate
```

### `--input`

How to pass input for the Workflow.
Input must be in JSON format.
For multiple JSON objects, pass each in a separate `--input` option. Use `null` for null values.

Alias: `-i`

**Example**

```
tctl workflow run --input <json>
```

### `--input_file`

How to pass input for the Workflow from a JSON file.
For multiple JSON objects, concatenate them and use spaces or newline characters as separators.
Input from the command line overwrites input from the file.

Alias: `--if`

**Example**

```
tctl workflow run --input_file <filename>
```

### `--memo_key`

How to pass a key for a memo.
For multiple keys, concatenate them and use spaces as separators.

**Example**

```
tctl workflow run --memo_key <key>
```

### `--memo`

How to pass a memo.
A memo is information in JSON format that can be shown when the Workflow is listed.
For multiple memos, concatenate them and use spaces as separators.
The order must match the order of keys in `--memo_key`.

**Example**

```
tctl workflow run --memo <json>
```

### `--memo_file`

How to pass information for a memo from a JSON file.
For multiple JSON objects, concatenate them and use spaces or newline characters as separators.
The order must match the order of keys in `--memo_key`.

**Example**

```
tctl workflow run --memo_file <filename>
```

### `--search_attr_key`

How to specify a [Search Attribute](/docs/content/what-is-a-search-attribute) key.
For multiple keys, concatenate them and use pipes (`|`) as separators.

To list valid keys, use the `tctl cluster get-search-attr` command.

**Example**

```
tctl workflow run --search_attr_key <key>
```

### `--search_attr_value`

How to specify a [Search Attribute](/docs/content/what-is-a-search-attribute) value.
For multiple values, concatenate them and use pipes (`|`) as separators.
If a value is an array, use JSON format, such as `["a","b"]`, `[1,2]`, `["true","false"]`, or `["2022-06-07T17:16:34-08:00","2022-06-07T18:16:34-08:00"]`.

To list valid keys and value types, use the `tctl cluster get-search-attr` command.

**Example**

```
tctl workflow run --search_attr_value <value>
```

### `--show_detail`

How to get event details.

Alias: `--sd`

**Example**

```
tctl workflow run --show_detail
```

### `--max_field_length`

How to specify the maximum length for each attribute field.
The default value is 0.

Alias: `--maxl`

**Example**

```
tctl workflow run --max_field_length <length>
```

## Related

- [`tctl workflow`](../workflow)
- [tctl reference](/docs/reference/tctl)
