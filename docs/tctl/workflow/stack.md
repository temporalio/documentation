---
id: stack
title: tctl workflow stack
sidebar_label: stack
description: How to query Workflow Executions with --stack-trace using tctl.
tags:
  - reference
  - tctl
---

The `tctl workflow stack` command queries [Workflow Execution](/concepts/what-is-a-workflow-execution) with `--stack-trace` as the query type.

`tctl workflow stack <modifiers>`

The following modifiers control the behavior of the command.

### `--input`

Pass input for the query.
Input must be in JSON format.
For multiple JSON objects, concatenate them and use spaces as separators.

Alias: `-i`

**Example**

```bash
tctl workflow stack --input <value>
```

### `--input-file`

Pass input for the query from a JSON file.
For multiple JSON objects, concatenate them and use spaces or newline characters as separators.
Input from the command line overwrites input from the file.

Alias: `--if`

**Example**

```bash
tctl workflow stack --input-file <value>
```

### `--query-reject-condition`

Reject queries based on Workflow state.
Valid values are `not-open` and `not-completed-cleanly`.

Alias: `--qrc`

**Example**

```bash
tctl workflow stack --query-reject-condition <value>
```

### `--run-id`

Specify a [Run Id](/concepts/what-is-a-run-id).

Alias: `--rid`

**Example**

```bash
tctl workflow stack --run-id <value>
```

### `--workflow-id`

Specify a [Workflow Id](/concepts/what-is-a-workflow-id).

Alias: `--wid`

**Example**

```bash
tctl workflow stack --workflow-id <value>
```
