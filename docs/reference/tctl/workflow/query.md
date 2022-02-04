---
id: query
title: tctl workflow query
sidebar_label: query
description: How to query Workflow Executions using tctl.
tags:
  - reference
  - tctl
---

The `tctl workflow query` command queries [Workflow Executions](/docs/content/what-is-a-workflow-execution).

`tctl workflow query [<modifiers>]`

The following modifiers control the behavior of the command.

### `--workflow_id`

How to specify a [Workflow Id](/docs/content/what-is-a-workflow-id).

Aliases: `--wid`, `-w`

**Example**

```
tctl workflow query --workflow_id <id>
```

### `--run_id`

How to specify a [Run Id](/docs/content/what-is-a-run-id).

Aliases: `--rid`, `-r`

**Example**

```
tctl workflow query --run_id <id>
```

### `--query_type`

How to specify the type of query to run.

Alias: `--qt`

**Example**

```
tctl workflow query --query_type <value>
```

### `--input`

How to pass input for the query.
Input must be in JSON format.
For multiple JSON objects, concatenate them and use spaces as separators.

Alias: `-i`

**Example**

```
tctl workflow query --input <json>
```

### `--input_file`

How to pass input for the query from a JSON file.
For multiple JSON objects, concatenate them and use spaces or newline characters as separators.
Input from the command line overwrites input from the file.

Alias: `--if`

**Example**

```
tctl workflow query --input_file <filename>
```

### `--query_reject_condition`

How to reject queries based on Workflow state.
Valid values are `not_open` and `not_completed_cleanly`.

Alias: `--qrc`

**Example**

```
tctl workflow query --query_reject_condition <value>
```
