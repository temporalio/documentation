---
id: stack
title: tctl workflow stack
sidebar_label: stack
description: How to query Workflow Executions with __stack_trace using tctl.
tags:
  - tctl
---

The `tctl workflow stack` command queries [Workflow Execution](/concepts/what-is-a-workflow-execution) with `__stack_trace` as the query type.

This command can be used to locate errors and blocks in a [Workflow Definition](/concepts/what-is-a-workflow-definition).

`tctl workflow stack <modifiers>`

The following modifiers control the behavior of the command.

### `--workflow_id`

**This is a required modifier.**

Specify a [Workflow Id](/concepts/what-is-a-workflow-id).

Aliases: `--wid`, `-w`

**Example**

```bash
tctl workflow stack --workflow_id <id>
```

### `--run_id`

Specify a [Run Id](/concepts/what-is-a-run-id).

Aliases: `--rid`, `-r`

**Example**

```bash
tctl workflow stack --run_id <id>
```

### `--input`

Pass input for the query.
Input must be in JSON format.
For multiple JSON objects, concatenate them and use spaces as separators.

Alias: `-i`

**Example**

```bash
tctl workflow stack --input <json>
```

### `--input_file`

Pass input for the query from a JSON file.
For multiple JSON objects, concatenate them and use spaces or newline characters as separators.
Input from the command line overwrites input from the file.

Alias: `--if`

**Example**

```bash
tctl workflow stack --input_file <filename>
```

### `--query_reject_condition`

Reject queries based on Workflow state.
Valid values are `not_open` and `not_completed_cleanly`.

Alias: `--qrc`

**Example**

```bash
tctl workflow stack --query_reject_condition <value>
```
