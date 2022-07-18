---
id: query
title: tctl workflow query
sidebar_label: query
description: How to send a Query to a Workflow Execution using tctl.
tags:
  - reference
  - tctl
---

The `tctl workflow query` command sends a Query to a [Workflow Executions](/concepts/what-is-a-workflow-execution).

`tctl workflow query [<modifiers>]`

The following modifiers control the behavior of the command.

### `--workflow_id`

Specify a [Workflow Id](/concepts/what-is-a-workflow-id).

Aliases: `--wid`, `-w`

**Example**

```bash
tctl workflow query --workflow_id <id>
```

### `--run_id`

Specify a [Run Id](/concepts/what-is-a-run-id).

Aliases: `--rid`, `-r`

**Example**

```bash
tctl workflow query --run_id <id>
```

### `--query_type`

Specify the type of Query to run.

Alias: `--qt`

**Example**

```bash
tctl workflow query --query_type <value>
```

### `--input`

Pass input for the Query.
Input must be in JSON format.
For multiple JSON objects, concatenate them and use spaces as separators.

Alias: `-i`

**Example**

```bash
tctl workflow query --input <json>
```

### `--input_file`

Pass input for the Query from a JSON file.
For multiple JSON objects, concatenate them and use spaces or newline characters as separators.
Input from the command line overwrites input from the file.

Alias: `--if`

**Example**

```bash
tctl workflow query --input_file <filename>
```

### `--query_reject_condition`

Reject Queries based on Workflow state.
Valid values are `not_open` and `not_completed_cleanly`.

Alias: `--qrc`

**Example**

```bash
tctl workflow query --query_reject_condition <value>
```
