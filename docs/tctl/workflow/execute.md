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

### `--cron`

Specify a [Cron Schedule](/concepts/what-is-a-temporal-cron-job/#cron-schedules).

**Example**

```bash
tctl workflow execute --cron <value>
```

### `--execution-timeout`

Specify the [Start-To-Close Timeout](/concepts/what-is-a-start-to-close-timeout) of the [Workflow Execution](/concepts/what-is-a-workflow-execution) in seconds.
The default value is 0.

Alias: `--et`

**Example**

```bash
tctl workflow execute --execution-timeout <value>
```

### `--fields`

Customize the fields to print.
Set to 'long' to automatically print more of the main fields.

**Example**

```bash
tctl workflow start --fields <value>
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

### `--limit`

Sets the number of items to print.

**Example**

```bash
tctl workflow show --limit <value>
```

### `--max-field-length`

Specify the maximum length for each attribute field.
The default value is 0.

Alias: `--maxl`

**Example**

```bash
tctl workflow execute --max-field-length <value>
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

### `--no-pager`

Disables the interactive pager.

Alias: `-P`

**Example**

```bash
tctl workflow start --no-pager <value>
```

### `--output`

Specifies the format for printed output.

Alias: `-o`

Values: table, json, card

**Example**

```tctl
tctl workflow start --output <value>
```

### `--pager`

Specifies the pager to use.

Values: less, more, favoritePager..[$PAGER]

**Example**

```bash
tctl workflow start --pager <value>
```

### `--search-attribute-key`

Specify a [Search Attribute](/concepts/what-is-a-search-attribute) key.
For multiple keys, concatenate them and use pipes (`|`) as separators.

To list valid keys, use the `tctl cluster get-search-attribute` command.

**Example**

```bash
tctl workflow execute --search-attribute-key <value>
```

### `--search-attribute-value`

Specify a [Search Attribute](/concepts/what-is-a-search-attribute) value.
For multiple values, concatenate them and use pipes (`|`) as separators.
If a value is an array, use JSON format, such as `["a","b"]`, `[1,2]`, `["true","false"]`, or `["2022-06-07T17:16:34-08:00","2022-06-07T18:16:34-08:00"]`.

To list valid keys and value types, use the `tctl cluster get-search-attribute` command.

**Example**

```bash
tctl workflow execute --search-attribute-value <value>
```

### `--task-queue`

Specify a [Task Queue](/concepts/what-is-a-task-queue).

Alias: `--tq`

**Example**

```bash
tctl workflow execute --task-queue <value>
```

### `--task-timeout`

Specify the [Start-To-Close Timeout](/concepts/what-is-a-start-to-close-timeout) of the [Workflow Task](/concepts/what-is-a-workflow-task) in seconds.
The default value is 10.

Alias: `--tt`

**Example**

```bash
tctl workflow execute --task-timeout <value>
```

### `--time-format`

Specifies the format for time values.

Values: relative, iso, raw

**Example**

```bash
tctl workflow start --time-format <value>
```

### `--type`

Specify the name of a [Workflow Type](/concepts/what-is-a-workflow-type).

Alias: `-t`

**Example**

```bash
tctl workflow execute --type <value>
```

### `--workflow-id`

Specify a [Workflow Id](/concepts/what-is-a-workflow-id).

Alias: `--wid`

**Example**

```bash
tctl workflow execute --workflow-id <value>
```

### `--workflow-id-reuse-policy`

Specify a [Workflow Id Reuse Policy](/concepts/what-is-a-workflow-id-reuse-policy).
Configure if the same [Workflow Id](/concepts/what-is-a-workflow-id) is allowed for use in new [Workflow Execution](/concepts/what-is-a-workflow-execution).

Values: `AllowDuplicate`, `AllowDuplicateFailedOnly`, `RejectDuplicate`

**Examples**

```bash
tctl workflow execute --workflow-id-reuse-policy AllowDuplicate
tctl workflow execute --workflow-id-reuse-policy AllowDuplicateFailedOnly
tctl workflow execute --workflow-id-reuse-policy RejectDuplicate
```

### `--show-detail`

Get event details.

Alias: `--sd`

**Example**

```bash
tctl workflow execute --show-detail
```
