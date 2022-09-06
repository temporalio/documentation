---
id: start
title: tctl workflow start
sidebar_label: start
description: How to start a new Workflow Execution using tctl.
tags:
  - reference
  - tctl
---

The `tctl workflow start` command starts a new [Workflow Execution](/concepts/what-is-a-workflow-execution).
This command returns the Workflow Id and Run Id immediately after starting the Workflow.

`tctl workflow start <modifiers>`

The following modifiers control the behavior of the command.
Always include required modifiers when executing this command.

### `--cron`

Specify a [Cron Schedule](/concepts/what-is-a-temporal-cron-job/#cron-schedules) in seconds.

This is an optional feature, with a default value of 10s.

**Example**

```bash
tctl workflow start --cron <value>
```

### `--execution-timeout`

Specifies the Workflow Execution timeout, number of retries allowed, and whether to Continue-As-New.

Alias: `--et`

**Example**

```bash
tctl workflow start --execution-timeout <value>
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
For multiple JSON objects, pass each in a separate `--input` option.
Use `null` for null values.

Alias: `-i`

**Example**

```bash
tctl workflow start --input <value>
```

### `--input-file`

Pass input for the Workflow from a JSON file.
For multiple JSON objects, concatenate them and use spaces or newline characters as separators.
Input from the command line overwrites input from the file.

Alias: `--if`

**Example**

```bash
tctl workflow start --input-file <value>
```

### `--limit`

Sets a limit on the maximum number of items to print.
The default value is 0.

**Examples**

```bash
tctl workflow start --limit <value>
```

### `--max-field-length`

Maximum length for each attribute field.
The default value is 0.

Alias: `--maxl`

**Example**

```bash
tctl workflow start --max-field-length <value>
```

### `--memo-key`

Pass a key for a memo.
For multiple keys, concatenate them and use spaces as separators.

**Example**

```bash
tctl workflow start --memo-key <value>
```

### `--memo`

Pass a memo value.
A memo is information in JSON format that can be shown when the Workflow is listed.
For multiple memos, concatenate them and use spaces as separators.
The order must match the order of keys in `--memo-key`.

**Example**

```bash
tctl workflow start --memo <value>
```

### `--memo-file`

Pass information for a memo from a JSON file.
For multiple JSON objects, concatenate them and use spaces or newline characters as separators.
The order must match the order of keys in `--memo-key`.

**Example**

```bash
tctl workflow start --memo-file <value>
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

### `--run-timeout`

Single Workflow Run timeout, in seconds.

Alias: `--rt`

**Example**

```bash
tctl workflow start --run-timeout <value>
```

### `--search-attribute-key`

Specify a [Search Attribute](/concepts/what-is-a-search-attribute) key.
For multiple keys, concatenate them and use pipes (`|`) as separators.

To list valid Search Attributes, use the `tctl cluster get-search-attributes` command.

**Example**

```bash
tctl workflow start --search-attribute-key <value>
```

### `--search-attribute-value`

Specify a [Search Attribute](/concepts/what-is-a-search-attribute) value.
For multiple values, concatenate them and use pipes (`|`) as separators.
If a value is an array, use JSON format, such as `["a","b"]`, `[1,2]`, `["true","false"]`, or `["2022-06-07T17:16:34-08:00","2022-06-07T18:16:34-08:00"]`.

To list valid Search Attributes and value types, use the `tctl cluster get-search-attributes` command.

**Example**

```bash
tctl workflow start --search-attribute-value <value>
```

### `--task-timeout`

Specify the [Start-To-Close Timeout](/concepts/what-is-a-start-to-close-timeout) of the [Workflow Execution](/concepts/what-is-a-workflow-execution) in seconds.
The default value is 0.

Alias: `--tt`

**Example**

```bash
tctl workflow start --task-timeout <value>
```

### `--task-queue`

Specify a [Task Queue](/concepts/what-is-a-task-queue).

Alias: `--tq`

**Example**

```bash
tctl workflow start --task-queue <value>
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

Alias: `--t`

**Example**

```bash
tctl workflow start --type <value>
```

### `--workflow-id`

Specify a [Workflow Id](/concepts/what-is-a-workflow-id).

Aliases: `--wid`

**Example**

```bash
tctl workflow start --workflow-id <value>
```

### `--workflow-task-timeout`

Specify the [Start-To-Close Timeout](/concepts/what-is-a-start-to-close-timeout) of the [Workflow Task](/concepts/what-is-a-workflow-task) in seconds.
The default value is 10.

Alias: `--wtt`

**Example**

```bash
tctl workflow start --workflow-task-timeout <value>
```

### `--workflow-id-reuse-policy`

Specify a [Workflow Id Reuse Policy](/concepts/what-is-a-workflow-id-reuse-policy).
Configure if the same [Workflow Id](/concepts/what-is-a-workflow-id) is allowed for use in new [Workflow Execution](/concepts/what-is-a-workflow-execution).

Values: `AllowDuplicate`, `AllowDuplicateFailedOnly`, `RejectDuplicate`

**Examples**

```bash
tctl workflow start --workflow-id-reuse-policy AllowDuplicate
tctl workflow start --workflow-id-reuse-policy AllowDuplicateFailedOnly
tctl workflow start --workflow-id-reuse-policy RejectDuplicate
```
