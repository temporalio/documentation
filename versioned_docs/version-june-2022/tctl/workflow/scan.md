---
id: scan
title: tctl workflow scan
sidebar_label: scan
description: How to quickly list Workflow Executions without sorting using tctl.
tags:
  - reference
  - tctl
---

The `tctl workflow scan` command lists [Workflow Executions](/concepts/what-is-a-workflow-execution).
It is faster than the `tctl workflow listall` command, but the results are not sorted.

By default, this command lists a maximum of 2000 Workflow Executions.
To set the size of a page, use the `--pagesize` option.

See also [`tctl workflow list`](/tctl/workflow/list), [`tctl workflow listall`](/tctl/workflow/listall), and [`tctl workflow listarchived`](/tctl/workflow/listarchived).

`tctl workflow scan [<modifiers>]`

The following modifiers control the behavior of the command.

### `--print_raw_time`

Print the raw timestamp.

Alias: `--prt`

**Example**

```bash
tctl workflow scan --print_raw_time
```

### `--print_datetime`

Print the timestamp.

Alias: `--pdt`

**Example**

```bash
tctl workflow scan --print_datetime
```

### `--print_memo`

Print a memo.

Alias: `--pme`

**Example**

```bash
tctl workflow scan --print_memo
```

### `--print_search_attr`

Print the [Search Attributes](/concepts/what-is-a-search-attribute).

Alias: `--psa`

**Example**

```bash
tctl workflow scan --print_search_attr
```

### `--print_full`

Print the full message without table formatting.

Alias: `--pf`

**Example**

```bash
tctl workflow scan --print_full
```

### `--print_json`

Print the raw JSON objects.

Alias: `pjson`

**Example**

```bash
tctl workflow scan --print_json
```

### `--pagesize`

Specify the maximum number of [Workflow Execution](/concepts/what-is-a-workflow-execution) to list on a page.
(By default, the `tctl workflow scan` command lists 2000 Workflow Executions per page.)

Alias: `--ps`

**Example**

```bash
tctl workflow scan --pagesize <value>
```

### `--query`

Specify an SQL-like query of [Search Attributes](/concepts/what-is-a-search-attribute).

Alias: `-q`

**Example**

```bash
tctl workflow scan --query <value>
```
