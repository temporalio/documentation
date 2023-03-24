---
id: listarchived
title: tctl workflow listarchived
sidebar_label: listarchived
description: How to list archived Workflow Executions using tctl.
tags:
  - tctl
---

The `tctl workflow listarchived` command lists archived [Workflow Executions](/workflows#workflow-execution).

By default, this command lists a maximum of 100 Workflow Executions.

- To set the size of a page, use the `--pagesize` option.
- To list all pages, use the `--all` option.

See also [`tctl workflow list`](/tctl-v1/workflow/list), [`tctl workflow listall`](/tctl-v1/workflow/listall), and [`tctl workflow scan`](/tctl-v1/workflow/scan).

`tctl workflow listarchived <modifiers>`

The following modifiers control the behavior of the command.

### --print_raw_time

Print the raw timestamp.

**Example**

```bash
tctl workflow listarchived --print_raw_time
```

### --print_datetime

Print the timestamp.

**Example**

```bash
tctl workflow listarchived --print_datetime
```

### --print_memo

Print a memo.

**Example**

```bash
tctl workflow listarchived --print_memo
```

### --print_search_attr

Print the [Search Attributes](/concepts/what-is-a-search-attribute).

**Example**

```bash
tctl workflow listarchived --print_search_attr
```

### --print_full

Print the full message without table formatting.

**Example**

```bash
tctl workflow listarchived --print_full
```

### --print_json

Print the raw JSON objects.

**Example**

```bash
tctl workflow listarchived --print_json
```

### --query

Specify an SQL-like query of [Search Attributes](/concepts/what-is-a-search-attribute).

Consult the documentation of the visibility archiver that is used by your [Namespace](/concepts/what-is-a-namespace) for detailed instructions.

Alias: `-q`

**Example**

```bash
tctl workflow listarchived --query <value>
```

### --pagesize

Specify the maximum number of [Workflow Executions](/workflows#workflow-execution) to list on a page.
(By default, the `tctl workflow listarchived` command lists 100 Workflow Executions per page.)

**Example**

```bash
tctl workflow listarchived --pagesize <value>
```

### --all

List all pages.

**Example**

```bash
tctl workflow listarchived --all
```
