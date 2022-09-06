---
id: query
title: tctl workflow query
sidebar_label: query
description: How to send a Query to a Workflow Execution using tctl.
tags:
  - reference
  - tctl
---

The `tctl workflow query` command sends a [Query](/concepts/what-is-a-query) to a [Workflow Execution](/concepts/what-is-a-workflow-execution).

Queries can be used to retrieve all or part of the Workflow state with given parameters.

```bash
$ tctl workflow query --workflow_id "HelloQuery" --query_type "getCount"
Query result as JSON:
3
```

Queries can also be used on completed Workflows.
Let's complete a Workflow by updating its greeting, and then query the now-finished Workflow.

```bash
$ tctl workflow signal --workflow_id "HelloQuery" --name "updateGreeting" --input \"Bye\"
Signal workflow succeeded.
$ tctl workflow query --workflow_id "HelloQuery" --query_type "getCount"
Query result as JSON:
4
```

## Modifiers

Queries are written as follows:

`tctl workflow query --workflow_id [modifiers]`

The following modifiers control the behavior of the command.
Always include required modifiers when executing this command.

### `--workflow_id`

Specify a [Workflow Id](/concepts/what-is-a-workflow-id). **This modifier is required.**

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
