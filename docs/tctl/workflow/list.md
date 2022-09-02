---
id: list
title: tctl workflow list
sidebar_label: list
description: How to list open or closed Workflow Executions using tctl.
tags:
  - reference
  - tctl
---

The `tctl workflow list` command lists open or closed [Workflow Executions](/concepts/what-is-a-workflow-execution).

By default, this command lists a maximum of 10 closed Workflow Executions.

- To set the number of items printed, use the `--limit` option.
- To specify fields to print, use the `--fields` option.
- To enable or disable a pager, use `--pager <value>` or `--no-pager`.

`tctl workflow list <modifiers>`

The following modifiers control the behavior of the command.

### `--archived`

**This is an experimental feature.**

List archived Workflow Executions.

Alias: `-a`

**Example**

```bash
tctl workflow list --archived
```

### `--fields`

Customize the fields to print.
Set to 'long' to automatically print more of the main fields.

**Example**

```bash
tctl workflow start --fields <value>
```

### `--limit`

Sets the number of items to print.

**Example**

```bash
tctl workflow show --limit <value>
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

### `--query`

**How to list and filter Workflow Executions with a [List Filter](/concepts/what-is-a-list-filter) using tctl.**

The `--query` flag is supported only when [Advanced Visibility](/concepts/what-is-advanced-visibility) is configured with the Cluster.

Using the `--query` option causes tctl to ignore all other filter options, including `open`, `earliest-time`, `latest-time`, `workflow-id`, and `workflow-type`.

Alias: `-q`

**Example**

```bashbash
tctl workflow list --query "WorflowId=<your-workflow-id>"
```

More examples:

```bashbash
tctl workflow list \
  --query "WorkflowType='main.SampleParentWorkflow' AND ExecutionStatus='Running'"
```

```bashbash
tctl workflow list \
  --query '(CustomKeywordField = "keyword1" and CustomIntField >= 5) or CustomKeywordField = "keyword2"' \
  --print-search-attr
```

```bashbash
tctl workflow list \
  --query 'CustomKeywordField in ("keyword2", "keyword1") and CustomIntField >= 5 and CloseTime between "2018-06-07T16:16:36-08:00" and "2019-06-07T16:46:34-08:00" order by CustomDatetimeField desc' \
  --print-search-attr
```

```bashbash
tctl workflow list \
  --query 'WorkflowType = "main.Workflow" and (WorkflowId = "1645a588-4772-4dab-b276-5f9db108b3a8" or RunId = "be66519b-5f09-40cd-b2e8-20e4106244dc")'
```

```bashbash
tctl workflow list \
  --query 'WorkflowType = "main.Workflow" StartTime > "2019-06-07T16:46:34-08:00" and ExecutionStatus = "Running"'
```

### `--time-format`

Specifies the format for time values.

Values: relative, iso, raw

**Example**

```bash
tctl workflow start --time-format <value>
```
