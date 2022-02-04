---
id: stack
title: tctl workflow stack
sidebar_label: stack
description: How to query Workflow Executions with __stack_trace using tctl.
tags:
  - reference
  - tctl
---

The `tctl workflow stack` command queries [Workflow Execution](/docs/content/what-is-a-workflow-execution) with `__stack_trace` as the query type.

`tctl workflow stack [<modifiers>]`

The following modifiers control the behavior of the command.

### `--workflow_id`

How to specify a [Workflow Id](/docs/content/what-is-a-workflow-id).

Aliases: `--wid`, `-w`

**Example**

```
tctl workflow stack --workflow_id <id>
```

### `--run_id`

How to specify a [Run Id](/docs/content/what-is-a-run-id).

Aliases: `--rid`, `-r`

**Example**

```
tctl workflow stack --run_id <id>
```

### `--input`

How to pass input for the query.
Input must be in JSON format.
For multiple JSON objects, concatenate them and use spaces as separators.

Alias: `-i`

**Example**

```
tctl workflow stack --input <json>
```

### `--input_file`

How to pass input for the query from a JSON file.
For multiple JSON objects, concatenate them and use spaces or newline characters as separators.
Input from the command line overwrites input from the file.

Alias: `--if`

**Example**

```
tctl workflow stack --input_file <filename>
```

### `--query_reject_condition`

How to reject queries based on Workflow state.
Valid values are `not_open` and `not_completed_cleanly`.

Alias: `--qrc`

**Example**

```
tctl workflow stack --query_reject_condition <value>
```
